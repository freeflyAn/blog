const { getList, 
  getDetail,
  newBlog,
  updateBlog,
  delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  const author = '王五';

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
    return newBlog(req.body, author).then(result => {
      return new SuccessModel(result)
    })
  }

  // 更新博客接口
  if ( method === 'POST' && req.path === '/api/blog/update') {
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