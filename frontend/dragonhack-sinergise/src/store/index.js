import Vue from 'vue'
import Vuex from 'vuex'
import PlacesModule from './modules/places-module'
import DateModule from './modules/date-module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        PlacesModule,
        DateModule
    }
})