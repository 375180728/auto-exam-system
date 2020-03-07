const axios = window.axios
const auth = {
  login (params) {
    return axios.post(`/api/auth/login`, params)
  },
  //获取用户信息
  get_user_info (params) {
    return axios.get(`/api/auth`, {
      params: params
    })
  }
}

export default auth