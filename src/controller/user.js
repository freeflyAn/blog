const { exec } = require('../db/mysql')
const checkLogin = (username, password) => {
  const sql = `select * from users where username='${username}' and password='${password}'`;
  return exec(sql).then(rows => {
    return !!rows.length
  })
}

module.exports = {
  checkLogin
}