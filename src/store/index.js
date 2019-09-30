import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../storage'

import calendar from './calendar'

Vue.use(Vuex)

storage.init(1, "6ixtizen");

export default new Vuex.Store({
    modules: {
        calendar,
    }
})
