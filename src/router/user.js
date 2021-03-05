const { checkLogin } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUSerRouter = (req, res) => {
  const method = req.method;


  // 登录
  if ( method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    return checkLogin(username, password).then(result => {
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = handleUSerRouter