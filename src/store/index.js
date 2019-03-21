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
      phmDataMdpServer: null,
    },
    requestInterval: 60000,
    queryFunctions: null,
    displayMaincys: null,
    token: null,
    trains: null,
    gpsMap: null,
    stationSelected: null,
    trainSelected: null,
    currentFaultCount: null,
    currentFault: null,
    currentWarnCount: null,
    currentWarn: null,
    airConditionerCount: null,
    airConditioner: null,
    ruleAttentionCount: null,
    ruleAttention: null,
    trainParamsEntity:null,
    trainParamsUnit:null,
    trainParamsParts:null
  },
  getters: {
    getTrains: state => {
      return state.trains;
    },
    getGpsData: state => {
      return state.gpsMap;
    },
    getStationSelected : state => {
      return state.stationSelected;
    },
    getTrainSelected : state => {
      return state.trainSelected;
    },
    /**
     * 报警数量
     * @param state
     * @return {null|*}
     */
    getCurrentFaultCount: state => {
      return state.currentFaultCount;
    },
    getCurrentFault: state => {
      return state.currentFault;
    },
    getCurrentWarnCount: state => {
      return state.currentWarnCount;
    },
    getCurrentWarn: state => {
      return state.currentWarn;
    },
    /**
     * 空调数量
     * @param state
     * @return {null|*}
     */
    getAirConditionerCount : state => {
      return state.airConditionerCount;
    },
    getAirConditioner : state => {
      return state.airConditioner;
    },
    /**
     * 规则关注数量
     * @param state
     * @return {null|*}
     */
    getRuleAttentionCount : state => {
      return state.ruleAttentionCount;
    },
    getRuleAttention : state => {
      return state.ruleAttention;
    },
    getTrainParamsEntity :state => {
      return state.trainParamsEntity;
    },
    getTrainParamsUnit:state => {
      return state.trainParamsUnit
    },
    getTrainParamsParts:state =>{
      return state.trainParamsParts
    }
  },
  mutations: {
    updateTrains (state, data) {
      state.trains = data
    },
    updateGpsMapData (state, data) {
      state.gpsMap = data
    },
    updateStationSelected (state, data) {
      state.stationSelected = data
    },
    updateTrainSelected (state, data){
      console.log("trainSelected updated ")
      state.trainSelected = data
    },
    updateCurrentFaultCount (state, data) {
      state.currentFaultCount = data
    },
    updateCurrentFault (state, data) {
      state.currentFault = data
    },
    updateCurrentWarnCount (state, data) {
      state.currentWarnCount = data
    },
    updateCurrentWarn (state, data) {
      state.currentWarn = data
    },
    updateAirConditionerCount (state, data){
      state.airConditionerCount = data
    },
    updateAirConditioner (state, data){
      state.airConditioner = data
    },
    updateRuleAttentionCount (state, data){
      state.ruleAttentionCount = data
    },
    updateRuleAttention (state, data){
      state.ruleAttention = data
    },
    updateTrainParamsEntity (state,data){
      state.trainParamsEntity = data
    },
    updateTrainParamsUnit (state,data){
      state.trainParamsUnit = data
    },
    updateTrainParamsParts (state,data){
      state.trainParamsParts = data
    }
  }
})
