import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  loginDrawerValue: false,
  regDrawerValue: false,
  userInfo: null,
  // lessonId: '',
  articleInfo: {
    _id: '',
    content: '',
    create_date: '',
    description: '',
    nice_num: 0,
    title: '',
    tags: [],
  },
  paperId: '',
}

export default new Vuex.Store({
  state,
  mutations,
  actions
  // modules: {
  // }
})
