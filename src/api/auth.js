const axios = window.axios
const auth = {
  login (params) {
    return axios.post(`/api/auth/login`, params)
  },
}

export default auth