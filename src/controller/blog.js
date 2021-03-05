const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`;
  return exec(sql)
}
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}, author) => {
  const { title, content } = blogData;
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) 
  values ('${title}', '${content}', ${createTime}, '${author}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}, author) => {
  const { title, content } = blogData;
  const createTime = Date.now();
  const sql = `update blogs set title='${title}', content='${content}', createTime=${createTime} where id='${id}' and author='${author}'`
  return exec(sql).then(result => {
    return result.affectedRows>0 ? true : false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then(result => {
    return result.affectedRows>0 ? true : false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}