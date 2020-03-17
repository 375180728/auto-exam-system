import base from './base.js'
const axios = window.axios
const term = {
  //创建学期
  create_term(params) {
    return axios.post(`/api/term`, params)
  },
  //获取学期列表
  get_term_list() {
    return axios.get(`/api/term`)
  },
  //更新学期
  update_term(params) {
    return axios.put(`/api/term`, params)
  }
}
 
export default term