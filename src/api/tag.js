import base from './base.js'
const axios = window.axios
const tag = {
  //创建标签信息
  create_tags(params) {
    return axios.post(`/api/tag`, params)
  },
  //获取所有标签信息
  get_tags() {
    return axios.get(`/api/tag/all`)
  }
}

export default tag