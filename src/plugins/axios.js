"use strict";

import Vue from 'vue';
import axios from "axios";

import store from '@/store/index'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function checkStatus(response) {
  console.log(response)
  if(response.status === 200) {
    return response
  } else if(response.status === 401) {
    setImmediate(() => (window.location.href = '/'))
    throw new Error('无权限')
  } else if(response.status === 500) {
    throw new Error('系统错误')
  }
}

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    let token
    if(JSON.parse(window.localStorage.getItem('userInfo'))) {
      token = JSON.parse(window.localStorage.getItem('userInfo')).token
      config.headers.Authorization = token
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    checkStatus(error.response)
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
