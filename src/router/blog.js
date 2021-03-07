const { getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登陆')
    )
  }
}
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  const author = req.session.username;

  // 博客列表接口
  if ( method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 博客详情接口
  if ( method === 'GET' && req.path === '/api/blog/detail') {
    return getDetail(id).then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  // 新建博客接口
  if ( method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    return newBlog(req.body, author).then(result => {
      return new SuccessModel(result)
    })
  }

  // 更新博客接口
  if ( method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    return updateBlog(id, req.body, author).then(result => {
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客路由失败')
      }
    })
  }

  // 删除博客接口
  if ( method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    return delBlog(id, author).then(result => {
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客路由失败')
      }
    })
  }

}

module.exports = handleBlogRouter