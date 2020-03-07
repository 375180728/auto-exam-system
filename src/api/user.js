import base from './base.js'
const axios = window.axios
const user = {
  //注册
  register (params) {
    return axios.post(`/api/user/register`, params)
  },
}

export default user