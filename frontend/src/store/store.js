import Vue from 'vue'
import Vuex from 'vuex'
// import * as module from '@/store/modules/module'
import * as modal from '@/store/modules/modal'
import * as user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modal,
    user
  }
})
