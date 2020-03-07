import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  loginDrawerValue: false,
  regDrawerValue: false,
  userInfo: null,
  articleInfo: {
    _id: '',
    content: '',
    create_date: '',
    description: '',
    nice_num: 0,
    title: '',
    tags: [],
  },
  token: '',
}

export default new Vuex.Store({
  state,
  mutations,
  actions
  // modules: {
  // }
})
