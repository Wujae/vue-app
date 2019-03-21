export default {
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

    console.log("全图车组GPS位置信息API", serverAddress);

    this.getOnlineStatusDataTimer(serverAddress, v, requestInterval,callback)

  },
  getOnlineStatusDataTimer(url, v, interval, callback){

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

      //存储为全局车组基础信息
      v.$store.commit('updateTrains', response)
      console.log(response)


      setTimeout(() => {
        this.getOnlineStatusDataTimer(url, v, interval, callback)
      }, interval)

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
   * 屏幕-事件中心-实时故障信息
   * @param {Vue} v - vue实例
   */
  getFaultData (v) {

    let serverAddress = this.createServerURL(v, 'faultWarn/listFaultWarnByParams')

    let start = new Date()

    console.log("实时故障信息API",serverAddress);

    v.$jsonp(serverAddress,
      {
        beginDate: '20190309000000',
        car_no: '',
        dealStatus: '',
        endDate: '20190309235959',
        errorType: '',
        fault_code: '',
        fault_desc: '',
        fault_level: '',
        isMultiMonitor: 1,
        jcode: '',
        mode: 0,
        occrStatus: '',
        pageNo: 1,
        pageSize: 20,
        sn: '',
        stationCode: '',
        status: '',
        sys_code: '',
        trainCate: '',
        train_type: '',
        type: ''
      }).then(response => {

      console.log(`get thm fault complete in ${ new Date() - start }ms`)
      console.log(response)
      //请求回来的数据commit到vuex
      v.$store.commit('updateCurrentFault', response)

    }).catch(error => {
      console.log(error)
    })

  },
  /**
   * 屏幕-事件中心-平台预警
   * @param {Vue} v - vue实例
   */
  getWarnData (v) {
    let serverAddress = this.createServerURL(v, 'faultrec/selectFaultWarnOnDay')

    console.log("预警API",serverAddress);

    let start = new Date()

    v.$jsonp(serverAddress,
      {
        begin_date: '2019-03-09',
        car_no: '',
        end_date: '2019-03-21',
        fault_level: '',
        isMultiMonitor: '1',
        jcode: '',
        sn: '',
        station: '',
        sys_name: '',
        train_type: '',
        type: '',
        warnName: '',
      }).then(response => {

      console.log(`get thm warn complete in ${ new Date() - start }ms`)
      console.log(response)
      
      v.$store.commit('updateCurrentWarn', response)

    }).catch(error => {
      console.log(error)
    })
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
