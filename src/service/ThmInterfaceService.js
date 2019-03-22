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
      this.parseFaultCount(v, response)

      setTimeout(() => {
        this.getOnlineStatusDataTimer(v, url, interval, callback)
      }, interval)

      if (callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback.onError) {
        callback.onError(error)
      }
      console.error(error)

    })

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
   * 屏幕-事件中心-实时故障信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getFaultData (v, callback) {

    let serverAddress = this.createServerURL(v, 'faultWarn/listFaultWarnByParams')

    //console.log("故障API",serverAddress);

    let requestInterval = v.$store.state.requestInterval

    this.getFaultDataTimer(v, serverAddress, requestInterval || 60000, callback)

  },
  /**
   * 屏幕-事件中心-实时故障信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Number} interval 时间间隔
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  getFaultDataTimer(v, url, interval, callback) {
    let start = new Date()

    let params = {
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
    }

    v.$jsonp(url, params).then(response => {

      console.log(`get thm fault complete in ${ new Date() - start }ms`)
      console.log(response)
      //请求回来的数据commit到vuex
      v.$store.commit('updateCurrentFault', response)

      setTimeout(() => {
        this.getFaultDataTimer(v, url, interval, callback)
      }, interval)

      if (callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback.onError) {
        callback.onError(error)
      }
      console.error(error)
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
  getWarnData (v, callback) {
    let serverAddress = this.createServerURL(v, 'faultrec/selectFaultWarnOnDay')

    //console.log("预警API",serverAddress);

    let requestInterval = v.$store.state.requestInterval

    this.getWarnDataTimer(v, serverAddress, requestInterval || 60000, callback)

  },
  /**
   * 屏幕-事件中心-实时故障信息定时器
   * @param {Vue} v - vue实例
   * @param {String} url 请求地址
   * @param {Number} interval 时间间隔
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  getWarnDataTimer(v, url, interval, callback) {
    let start = new Date()

    let params = {
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
    }

    v.$jsonp(url, params).then(response => {

      console.log(`get thm warn complete in ${ new Date() - start }ms`)
      console.log(response)

      v.$store.commit('updateCurrentWarn', response)

      setTimeout(() => {
        this.getWarnDataTimer(v, url, interval, callback)
      }, interval)

      if (callback.onSuccess) {
        callback.onSuccess(response)
      }

    }).catch(error => {

      if (callback.onError) {
        callback.onError(error)
      }
      console.error(error)
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
