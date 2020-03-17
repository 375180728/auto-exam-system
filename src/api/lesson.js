import base from './base.js'
const axios = window.axios
const lesson = {
  //创建学期
  create_lesson(params) {
    return axios.post(`/api/lesson`, params)
  },
  //获取课程信息
  get_lesson_info(params) {
    return axios.get(`/api/lesson`, {
      params: params
    })
  },
  // //更新学期
  // update_term(params) {
  //   return axios.put(`/api/term`, params)
  // }
}
 
export default lesson