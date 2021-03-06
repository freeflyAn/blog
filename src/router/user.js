const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUSerRouter = (req, res) => {
  const method = req.method;


  // 登录
  if ( method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    return login(username, password).then(result => {
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
  if (method === 'GET' && req.path === '/api/user/login-test') {
    return Promise.resolve(
      req.cookie.username ? new SuccessModel() : new ErrorModel('登陆失败')
    )
  }
}

module.exports = handleUSerRouter