import base from './base.js'
const axios = window.axios
const article = {
  //创建文章
  create_article(params) {
    return axios.post(`/api/article`, params)
  },
  //获取文章列表
  get_article_list() {
    return axios.get(`/api/article/all`)
  },
  //获取文章
  get_article(params) {
    return axios.get(`/api/article`, {
      params: params
    })
  },
}

export default article

