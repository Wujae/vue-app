export default {
  /**
   * 屏幕一 全图车组GPS位置信息
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
   * 屏幕一 车组在线状态
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getOnlineStatusData (v, callback) {

    let serverAddress = this.createServerURL(v, 'monitor/runStatusMonitor')

    let start = new Date()

    console.log("全图车组GPS位置信息API", serverAddress);

    v.$jsonp(serverAddress,
      {
        islate: '',
        jcode: '',
        sn: '',
        stationCode: '',
        status: '',
        train_type: ''
      }).then(response => {

      console.log(`get thm online status complete in ${ new Date() - start }ms`)

      console.log(response)
      //存储为全局车组基础信息
      v.$store.commit('updateTrains', response)

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
   * 屏幕二 当前故障
   * @param v
   */
  getFaultData (v) {

    let serverAddress = this.createServerURL(v, 'faultWarn/listFaultWarnByParams')

    let start = new Date()

    console.log("告警API",serverAddress);

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
        pageSize: 10,
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

    }).catch(error => {
      console.log(error)
    })

  },
  /**
   * 屏幕二 当前预警
   * @param v
   */
  getWarnData (v) {
    let serverAddress = this.createServerURL(v, 'faultrec/selectFaultWarnOnDay')

    console.log("预警API",serverAddress);

    let start = new Date()

    v.$jsonp(serverAddress,
      {
        begin_date: '2019-03-09',
        car_no: '',
        end_date: '2019-03-09',
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

    }).catch(error => {
      console.log(error)
    })
  },
  /**
   * 屏幕一 车组运行参数
   * @param v
   */
  getTrainParamsData (v) {

    let serverAddress = this.createServerURL(v, 'monitor/paramsMonitor')

    let start = new Date()

    v.$jsonp(serverAddress,
      {
        sn: 3501
      }).then(response => {

      console.log(`get thm train params complete in ${ new Date() - start }ms`)
      console.log(response)

    }).catch(error => {
      console.log(error)
    })
  },
  /**
   * 屏幕一 车组在线状态
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
