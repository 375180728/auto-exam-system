import base from './base.js'
const axios = window.axios
const user = {
  //注册
  register (params) {
    return axios.post(`/api/user/register`, params)
  },
  //获取用户信息
  get_user_info () {
    return axios.get(`/api/user`)
  },
  //更新用户信息
  update_user_info(params) {
    return axios.put(`/api/user`, params)
  } 
}

export default user