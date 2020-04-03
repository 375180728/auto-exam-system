import base from './base.js'
const axios = window.axios
const exam = {
  //添加大题干
  create_stem(params) {
    return axios.post(`/api/exam/stem`, params)
  },
  //创建试题
  create_question(params) {
    return axios.post(`/api/exam/question`, params)
  },
  //删除题目  
  delete_question(params) {
    return axios.delete(`/api/exam/question`, {
      params: params
    })
  },
  //创建试卷
  create_exam(params) {
    return axios.post(`/api/exam`, params)
  },
  //获取试卷信息  
  get_exam_info(params) {
    return axios.get(`/api/exam`, {
      params: params
    })
  },
  //获取试卷列表
  get_exam_list() {
    return axios.get(`/api/exam/all`)
  },
  //更新学期
  update_exam(params) {
    return axios.put(`/api/exam`, params)
  }
}
 
export default exam