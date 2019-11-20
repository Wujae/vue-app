export default {
  timers :{
    faultTimer: null,
    faultSimpleTimer: null,
    warnTimer: null,
    faultCardTimer: null
  },
  promisePool:{
    faultData: [],
    faultSimpleData: [],
    warnData: []
  },
  /**
   * @deprecated
   * 全图车组GPS位置信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getMapData (v, callback) {

    let serverAddress = this.createServerURL(v, 'monitor/mapInitialize')

    let start = new Date()

    v.$jsonp(serverAddress).then(response => {

        console.log(`get thm map gps complete in ${ new Date() - start }ms`)

        //存储为全局车组基础信息
        v.$store.commit('updateGpsMap', response)

        if (callback && callback.onSuccess) {
          callback.onSuccess(response)
        }
      }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.log(error)

    })

  },
  /**
   * 屏幕一-全图监控-GPS地图车组位置信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getOnlineStatusData (v, callback) {

    let serverAddress = this.createServerURL(v, 'monitor/runStatusMonitor')

    let requestInterval = v.$store.state.requestInterval
    let trainAllocationInterval = v.$store.state.trainAllocationInterval
    let gap = parseInt(trainAllocationInterval / requestInterval)
    callback = callback ? callback : {};
    callback.others = {gap: gap, counter: 0}

    this.getOnlineStatusDataTimer(v, serverAddress, requestInterval || 60000, callback)

  },
  /**
   * 屏幕一-全图监控-GPS地图车组位置信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Number} interval 时间间隔
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   * @param {Object} callback.others - 其他参数
   */
  getOnlineStatusDataTimer(v, url, interval, callback){

    let start = new Date()

    v.$jsonp(url,
      {
        islate: '',
        jcode: '',
        sn: '',
        stationCode: '',
        status: '',
        train_type: ''
      }).then(response => {

      console.log(`get thm online status complete in ${ new Date() - start }ms`)
      //console.log(response)

      //存储为全局车组基础信息
      v.$store.commit('updateTrains', response)
      if(callback.others){
        let gap = callback.others.gap
        let counter = callback.others.counter
        if(counter % gap === 0 ){
          this.trainAllocationDataParser(v, response);
        }
      }
      this.parseFaultCount(v, response)

      setTimeout(() => {

        callback.others.counter++;

        this.getOnlineStatusDataTimer(v, url, interval, callback)
      }, interval)

      if (callback && callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.error(error)

    })

  },
  /**
   * 屏幕一-全图监控-车组配属
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getTrainAllocationData(v, callback) {

    let serverAddress = this.createServerURL(v, 'monitor/runStatusMonitor')

    let requestInterval = v.$store.state.trainAllocationInterval

    this.getTrainAllocationDataTimer(v, serverAddress, requestInterval || (30 * 60 * 1000), callback)

  },
  /**
   * 屏幕一-全图监控-车组配属定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Number} interval 时间间隔
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getTrainAllocationDataTimer(v, url, interval, callback){

    let start = new Date()

    v.$jsonp(url,
      {
        islate: '',
        jcode: '',
        sn: '',
        stationCode: '',
        status: '',
        train_type: ''
      }).then(response => {

      console.log(`get thm online status for train allocation complete in ${ new Date() - start }ms`)
      //console.log(response)

      //存储为车组配属信息
      v.$store.commit('updateTrainsAllocation', response)

      setTimeout(() => {
        this.getTrainAllocationDataTimer(v, url, interval, callback)
      }, interval)

      if (callback && callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.error(error)

    })

  },
  /**
   * 车组配属处理
   * @param {Vue} v - vue实例
   * @param {Object} data 服务端数据
   */
  trainAllocationDataParser(v, data){

    v.$store.commit('updateTrainsAllocation', data)

  },
  /**
   * 处理故障记录数量
   * @param {Vue} v - vue实例
   * @param {Array} rawData 原始数据
   */
  parseFaultCount(v, rawData){

    let levelCount = [
      {
        key: 'A',
        count: 0
      },
      {
        key: 'B',
        count: 0

      },
      {
        key: 'C',
        count: 0

      }
    ]
    let result = rawData.reduce((p, c, i) => {

      let a_count = c.al_a, b_count = c.al_b, c_count = c.al_c

      if(a_count && isFinite(parseInt(a_count))){
        p[0].count += parseInt(a_count)
      }

      if(b_count && isFinite(parseInt(b_count))){
        p[1].count += parseInt(b_count)
      }

      if(c_count && isFinite(parseInt(c_count))){
        p[2].count += parseInt(c_count)
      }

      return p;

    }, levelCount);

    v.$store.commit('updateCurrentFaultCount', result)


  },
    /**
     * 停止进行中的数据请求
     */
    stopFaultDataPendingTask(){
      let cancelPromise = new Promise((resolve, reject) => {
        reject('取消其他全部未完成请求！');
      })

      Promise.race([...this.promisePool.faultData, cancelPromise]).catch(error => {

        console.info(error)
        this.promisePool.faultData.length = 0
      })
    },
    /**
     * 屏幕-事件中心-实时故障信息
     * @param {Vue} v - vue实例
     * @param {Object} callback 回调方法
     * @param {Object} callback.params - 请求参数
     * @param {Function} callback.onSuccess - onSuccess (response){}
     * @param {Function} callback.onError - onError (error){}
     */
    fetchFaultData (v, callback) {

      let serverAddress = this.createServerURL(v, 'faultWarn/listFaults')

      //console.log("thm 故障API",serverAddress);

      this.stopFaultDataPendingTask();

      let taskPromise = this.getFaultDataPromise(v, serverAddress, callback)

      this.promisePool.faultData.push(taskPromise);

      let start = new Date()

      this.promisePool.faultData.reverse()[0].then((response) => {

        console.log(`get thm fault complete in ${ new Date() - start }ms`)
        //console.log(response)

        //请求回来的数据commit
        v.$store.commit('updateCurrentFault', response)

        if (callback && callback.onSuccess) {
          callback.onSuccess(response)
        }

      }).catch(error => {

        if (callback && callback.onError) {
          callback.onError(error)
        }
        console.error(error)
      })



    },
    /**
     * 屏幕-事件中心-实时故障信息定时器
     * @param {Vue} v - vue实例
     * @param {String} url 请求地址
     * @param {Object} callback 回调方法
     * @param {Object} callback.params - 请求参数
     * @param {Function} callback.onSuccess - onSuccess (resp
     * @param {Function} callback.onError - onError (error){}
     * @return {Promise}
     */
    getFaultDataPromise(v, url, callback) {

      let params = {
        car_no: '',
        dealStatus: 0,
        errorType: '',
        fault_code: '',
        fault_desc: '',
        fault_level: '',
        isMultiMonitor: 0,
        jcode: '',
        mode: 0,
        occrStatus: 1,
        pageNo: 1,
        pageSize: 21,
        sn: '',
        stationCode: '',
        status: '',
        sys_code: '',
        trainCate: '',
        train_type: '',
        type: ''
      }

      if(callback && callback.params){
        Object.assign(params, callback.params)
      }

      return v.$jsonp(url, params)


  },
  /**
   * 停止进行中的数据请求
   */
  stopFaultDataSimplePendingTask(){
    let cancelPromise = new Promise((resolve, reject) => {
      reject('取消其他全部未完成请求！');
    })

    Promise.race([...this.promisePool.faultSimpleData, cancelPromise]).catch(error => {

      console.info(error)
      this.promisePool.faultSimpleData.length = 0
    })
  },
  /**
   * 屏幕-事件中心-车组报警信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  fetchFaultDataSimple (v, callback) {

    let serverAddress = this.createServerURL(v, 'faultWarn/listFaults')

    //console.log("thm 故障API",serverAddress);

    this.stopFaultDataPendingTask();

    let taskPromise = this.getFaultDataSimplePromise(v, serverAddress, callback)

    this.promisePool.faultSimpleData.push(taskPromise);

    let start = new Date()

    this.promisePool.faultSimpleData.reverse()[0].then(response => {

      console.log(`get thm fault simple complete in ${ new Date() - start }ms`)
      console.log(response)

      //请求回来的数据commit到vuex
      v.$store.commit('updateCurrentFaultSimple', response)

      if (callback && callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.error(error)
    })

  },
  /**
   * 屏幕-事件中心-车组报警信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  getFaultDataSimplePromise(v, url, callback) {

    let start = new Date()

    let params = {
      car_no: '',
      dealStatus: '',
      errorType: '',
      fault_code: '',
      fault_desc: '',
      fault_level: '',
      isMultiMonitor: 0,
      jcode: '',
      mode: 0,
      occrStatus: 1,
      pageNo: 1,
      pageSize: 5,
      sn: '',
      stationCode: '',
      status: '',
      sys_code: '',
      trainCate: '',
      train_type: '',
      type: ''
    }

    if(callback && callback.params){
      Object.assign(params, callback.params)
    }

    return v.$jsonp(url, params)
  },
  /**
   * 停止进行中的数据请求
   */
  stopWarnDataPendingTask(){
    let cancelPromise = new Promise((resolve, reject) => {
      reject('取消其他全部未完成请求！');
    })

    Promise.race([...this.promisePool.warnData, cancelPromise]).catch(error => {

      console.info(error)
      this.promisePool.warnData.length = 0
    })
  },
  /**
   * 屏幕-事件中心-平台预警
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  fetchWarnData (v, callback) {
    let serverAddress = this.createServerURL(v, 'faultrec/selectFaultWarnOnDay')

    //console.log("预警API",serverAddress);

    this.stopFaultDataPendingTask();

    let taskPromise = this.getWarnDataPromise(v, serverAddress, callback)

    this.promisePool.warnData.push(taskPromise);

    let start = new Date()

    this.promisePool.warnData.reverse()[0].then(response => {

      console.log(`get thm warn complete in ${ new Date() - start }ms`)
      console.log(response)

      v.$store.commit('updateCurrentWarn', response)

      if (callback && callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.error(error)
    })

  },
  /**
   * 屏幕-事件中心-实时故障信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   * @return {Promise}
   */
  getWarnDataPromise(v, url, callback) {
    let start = new Date()

    let params = {
      begin_date: (new Date()).Format("yyyy-MM-dd"),
      car_no: '',
      end_date: (new Date()).Format("yyyy-MM-dd"),
      fault_level: '',
      isMultiMonitor: '1',
      jcode: '',
      sn: '',
      station: '',
      sys_name: '',
      train_type: '',
      type: '',
      warnName: '',
    }

    return v.$jsonp(url, params)
  },
  /**
   * 屏幕-车组参数-车组运行参数
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {String} callback.params.sn - 车组号 如：3501
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getTrainParamsData (v, callback) {

    let serverAddress = this.createServerURL(v, 'monitor/paramsMonitor')

    let start = new Date()

    v.$jsonp(serverAddress,
      callback.params
    ).then(response => {

      console.log(`get thm train params complete in ${ new Date() - start }ms`)
      //console.log(response)

      if (callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback.onError) {
        callback.onError(error)
      }
      console.log(error)
    })
  },
  /**
   * 屏幕-事件中心-故障卡片信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getFaultCardData (v, callback) {

    let serverAddress = this.createServerURL(v, 'faultWarn/getLastFaultDetails')

    //console.log("thm 故障API",serverAddress);

    let requestInterval = v.$store.state.requestInterval

    //清除 timer
    clearTimeout(this.timers.faultCardTimer)

    this.getFaultCardDataTimer(v, serverAddress, requestInterval || 60000, callback)

  },
  /**
   * 屏幕-事件中心-故障卡片信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Number} interval 时间间隔
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  getFaultCardDataTimer(v, url, interval, callback) {

    let start = new Date()

    let params = {}

    if(callback && callback.params){
      Object.assign(params, callback.params)
    }

    v.$jsonp(url, params).then(response => {

      console.log(`get thm fault card complete in ${ new Date() - start }ms`)
      console.log(response)

      //this.parseFaultCount(v, response)

      //请求回来的数据commit到vuex
      v.$store.commit('updateCurrentFaultCard', response)

      this.timers.faultCardTimer = setTimeout(() => {
        this.getFaultCardDataTimer(v, url, interval, callback)
      }, interval)

      if (callback && callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback && callback.onError) {
        callback.onError(error)
      }
      console.error(error)
    })
  },
  /**
   * 获取请求完整路径
   * @param {Vue} v - vue实例
   * @param {String} requestPath - 请求地址
   */
  createServerURL (v, requestPath) {
    let remoteServer = v.$store.state.server.remoteThmServerProperties
    let token = v.$store.state.token

    return (!remoteServer.useRelativeUrl ? `http://${remoteServer.serverIp}${remoteServer.serverPort ? ':' + remoteServer.serverPort : '' }` : '')
      + `/${remoteServer.ctx}/${requestPath}?userId=${token.username}&password=${token.password_thm}`
  }
}
