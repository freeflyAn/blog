const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')
const handleUSerRouter = (req, res) => {
  const method = req.method;


  // 登录
  if ( method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    return login(username, password).then(result => {
      if (result) {
        req.session.username = username
        req.session.realname = result.realname
        set(req.sessionId, req.session)
        return new SuccessModel(req.session)
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
  if (method === 'GET' && req.path === '/api/user/login-test') {
    return Promise.resolve(
      req.session.username ? new SuccessModel(req.session) : new ErrorModel('登陆失败')
    )
  }
}

module.exports = handleUSerRouter