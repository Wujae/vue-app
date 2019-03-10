import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex );

/**
 * vuex store 初始化
 */
export default new Vuex.Store({

  state:{
    server: {
      thmServer: null,
      mdpServer: null,
      phmDataMdpServer: null
    },
    displayMaincys: null,
    token: null,
    trains: null,
    gpsMap: null
  },
  getters: {
    getTrains: state => {
      return state.trains;
    },
    getGpsData: state => {
      return state.trains;
    }
  },
  mutations: {
    updateTrains (state, data) {
      state.trains = data
    },
    updateGpsMapData (state, data) {
      state.gpsMap = data
    }
  }
})
