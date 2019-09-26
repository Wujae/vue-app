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
    trainAllocationInterval: 1800000,
    queryFunctions: null,
    displayMaincys: null,
    token: null,
    trains: null,
    trainsAllocation: null,
    gpsMap: null,
    stationSelected: null,
    trainSelected: null,
    currentFaultCount: null,
    currentFault: null,
    currentFaultSimple: null,
    currentWarnCount: null,
    currentWarn: null,
    currentFaultCard: null,
    airConditionerCount: null,
    airConditioner: null,
    ruleAttentionCount: null,
    ruleAttention: null,
    trainParamsEntity:null,
    trainParamsUnit:null,
    trainParamsParts:null,
    levels: {
      faultLevel: null,
      faultLevelSimple: null,
      warnLevel: null,
    }
  },
  getters: {
    getTrains: state => {
      return state.trains;
    },
    getTrainsAllocation: state => {
      return state.trainsAllocation;
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
     * 等级
     * @param state
     * @return {string}
     */
    getFaultLevel: state => {
      return state.levels.faultLevel;
    },
    getFaultLevelSimple: state => {
      return state.levels.faultLevelSimple;
    },
    getWarnLevel: state => {
      return state.levels.warnLevel;
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
    getCurrentFaultSimple: state => {
      return state.currentFaultSimple;
    },
    getCurrentWarnCount: state => {
      return state.currentWarnCount;
    },
    getCurrentWarn: state => {
      return state.currentWarn;
    },
    getCurrentFaultCard: state => {
      return state.currentFaultCard;
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
      console.log('getRuleAttentionCount in vuex', state.ruleAttentionCount)

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
    updateTrainsAllocation (state, data) {
      state.trainsAllocation  = data
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
    /**
     * 更新等级
     * @param state
     * @param data
     */
    updateFaultLevel (state, data) {
      state.levels.faultLevel = data
    },
    updateFaultLevelSimple (state, data) {
      state.levels.faultLevelSimple = data
    },
    updateWarnLevel(state, data) {
      state.levels.warnLevel= data
    },
    updateCurrentFault (state, data) {
      state.currentFault = data
    },
    updateCurrentFaultSimple (state, data) {
      state.currentFaultSimple = data
    },
    updateCurrentWarnCount (state, data) {
      state.currentWarnCount = data
    },
    updateCurrentWarn (state, data) {
      state.currentWarn = data
    },
    updateCurrentFaultCard (state, data) {
      state.currentFaultCard = data
    },
    updateAirConditionerCount (state, data){
      state.airConditionerCount = data
    },
    updateAirConditioner (state, data){
      state.airConditioner = data
    },
    updateRuleAttentionCount (state, data){
      console.log('updateRuleAttentionCount', data)
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
