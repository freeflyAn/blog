const { getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id

  // 博客列表接口
  if ( method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 博客详情接口
  if ( method === 'GET' && req.path === '/api/blog/detail') {
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }

  // 新建博客接口
  if ( method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  // 更新博客接口
  if ( method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客路由失败')
    }
  }

  // 删除博客接口
  if ( method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客路由失败')
    }
    return {
      msg: '这是删除博客接口'
    }
  }

}

module.exports = handleBlogRouter