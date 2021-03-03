const getList = (author, keyword) => {
  return [
    {
      id: 1,
      titile: 'titleA',
      createTIme: 1614749328708,
      author:'张三'
    },
    {
      id: 2,
      titile: 'titleB',
      createTIme: 1614749386854,
      author:'李四'
    }
  ]
}
const getDetail = (id) => {
  return {
    id: 1,
    titile: 'titleA',
    createTIme: 1614749328708,
    author:'张三'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return !!id
}

const delBlog = id => {
  return !!id
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}