import base from './base.js'
const axios = window.axios
const lesson = {
  //创建课程
  create_lesson(params) {
    return axios.post(`/api/lesson`, params)
  },
  //获取课程信息
  get_lesson_info(params) {
    return axios.get(`/api/lesson`, {
      params: params
    })
  },
  //更新课程信息
  update_lesson_setting(params) {
    return axios.put(`/api/lesson`, params)
  },
  //添加班级
  add_class(params) {
    return axios.post(`/api/lesson/class`, params)
  },
  //获取班级信息
  get_class_info(params) {
    return axios.get(`/api/lesson/class`, {
      params: params
    })
  },
  //加入班级
  join_class(params)  {
    return axios.post(`/api/lesson/class/join`, params)
  }
}
 
export default lesson