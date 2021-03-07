const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const { resolve } = require('path')
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}
const getCookieExpires = () => {
  const date = new Date(Date.now() + 24*3600*1000);
  return date.toUTCString();
}
const SESSION_DATA = {}
const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  const url = req.url;
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(";").forEach(item => {
    if (!item) return;
    const arr = item.split('=')
    const key = arr[0],
          value = arr[1];
    req.cookie[key] = value
  })

  let needSetSession = false
  let user_id = req.cookie.user_id
  if (user_id) {
    if (!SESSION_DATA[user_id]) {
      SESSION_DATA[user_id] = {}
    }
    needSetSession = false
  } else {
    needSetSession = true
    user_id = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[user_id] = {}
  }
  req.session = SESSION_DATA[user_id]

  getPostData(req).then(postData => {
    req.body = postData;
    
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {
        if (needSetSession) res.setHeader('Set-Cookie',`user_id=${user_id};path=/;httpOnly;expires=${getCookieExpires()}`)
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetSession) res.setHeader('Set-Cookie',`user_id=${user_id};path=/;httpOnly;expires=${getCookieExpires()}`)
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 未命中路由
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write('404 not found')
    res.end()
  })
}

module.exports = serverHandle