const jwt = require('jsonwebtoken');

const SECRET_KEY = "098f6bcd4621d373cade4e832627b4f6";

export default {
  /**
   * 屏幕-全图监控-运用信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getUsageData (v, callback) {

    let start = new Date();

    this.createServerURL(v, 'statistics/usage/usageStatistics/query').then((requestURI) => {

      console.log("request URI", requestURI)

      if(!callback) return;

      v.$jsonp(requestURI, callback.params).then(response => {

          console.log(`get mdp usage complete in ${ new Date() - start }ms`);
          console.log(response)

          if (callback.onSuccess) {
            callback.onSuccess(response);
          }
        }).catch(error => {

        if (callback.onError) {
          callback.onError(error);
        }
        console.log(error)

      })

    }, reason => {

      console.log(reason);
    })

  },
  /**
   * 屏幕-全图监控-检修信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getMaincycData (v, callback) {

    this.createServerURL(v, 'statistics/usage/maincycStatistics/query').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, callback.params).then(response => {

        console.log(`get mdp maincyc complete in ${ new Date() - start }ms`);
        console.log(response)

        if (callback.onSuccess) {
          callback.onSuccess(response);
        }
      }).catch(error => {

        if (callback.onError) {
          callback.onError(error);
        }
        console.log(error)

      })
    }, reason => {

      console.log(reason);
    })

  },
  /**
   * 屏幕-资源中心-车组配置
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {String} callback.params.train  - 请求参数-车组号
   * @param {String} callback.params.funcLocPath - 功能路径
   * @param {String} callback.params.pFuncLocPath - 父级功能节点
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getTrainStructure (v, callback) {

    this.createServerURL(v, 'sap/bom/trainstracture/tree').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, callback.params).then(response => {

        console.log(`get mdp train structure complete in ${ new Date() - start }ms`);

        if (callback.onSuccess) {
          callback.onSuccess(response);
        }
      }).catch(error => {

        if (callback.onError) {
          callback.onError(error);
        }
        console.log(error)

      })
    }, reason => {

      console.log(reason);
    })

  },
  /**
   * 屏幕-资源中心-基础信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {String} callback.params.trainNo  - 请求参数-车组号
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getTrainBaseInfo (v, callback) {

    this.createServerURL(v, '/resume/trainCarFile/baseTrainInfo').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, callback.params).then(response => {

        console.log(`get mdp train base info complete in ${ new Date() - start }ms`);

        if (callback.onSuccess) {
          callback.onSuccess(response);
        }
      }).catch(error => {

        if (callback.onError) {
          callback.onError(error);
        }
        console.log(error)

      })
    }, reason => {

      console.log(reason);
    })

  },
  /**
   * queryBy方法统一入口
   * @param {Vue} v - vue实例
   * @param {String} functionName 接口函数名称
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {String} callback.params.menuId - 菜单ID
   * @param {String} callback.params.codeName - 表名
   * @param {String} callback.params.viewCode - 视图名
   * @param {String} callback.params.rows" - 单页行数
   * @param {String} callback.params.page - 当前页数
   * @param {String} callback.params.queryResultFilterSql - 过滤条件
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  queryBy (v, functionName, callback) {

    let queryFunction = v.$store.state.queryFunctions[functionName]

    if(!queryFunction) {
      let error = new Error(`can not find function with name ${functionName}`)
      if (callback.onError) {
        callback.onError(error);

      }
      throw error;
    }

    this.createServerURL(v, 'report/queryBy').then((requestURI) => {

      let start = new Date();

      let params = Object.assign(queryFunction, callback.params)

      v.$jsonp(requestURI, params).then(response => {

        console.log(`get mdp query by complete in ${ new Date() - start }ms`);

        if (callback.onSuccess) {
          callback.onSuccess(response);
        }
      }).catch(error => {

        if (callback.onError) {
          callback.onError(error);
        }
        console.log(error)

      })
    }, reason => {

      console.log(reason);
    })


  },
  /**
   * 获取空调数据
   * @param {Vue} v - vue实例
   * @param v
   */
  getAirConditioner(v) {

    let startDate = '2018-09-01 00:00:00', endDate = '2019-03-15 23:59:59'

    let querySql = `EVALUATE_DATE BETWEEN '${startDate}' AND '${endDate}'`

    this.queryBy(v, "T_MA_AC_HEALTH", {params: {queryResultFilterSql: querySql},
      onSuccess: (resp) => {

        console.log(resp)
        v.$store.commit('updateAirConditioner', resp)

      }, onError: (error) => {
        console.log(error)
      }
    })
  },
  /**
   * 获取MDP服务器路径
   * @param {Vue} v - vue实例
   * @param {String} requestPath - 请求地址
   * @return {Promise}
   */
  createServerURL (v, requestPath) {
    let remoteServer = v.$store.state.server.remoteMdpServerProperties
    let token = v.$store.state.token

    let fullRequsetURI = (!remoteServer.useRelativeUrl ? `http://${remoteServer.serverIp}${remoteServer.serverPort ? ':' + remoteServer.serverPort : '' }` : '')
      + `/${remoteServer.ctx}/${requestPath}`

    return this.generateJwt(fullRequsetURI, token);

  },
  /**
   * 生成jwtToken验证信息
   * @param {String} requestURI - 请求地址
   * @param {Object} tokenData - 权限令牌
   * @return {Promise}
   */
  generateJwt (requestURI, tokenData) {
    let tokens = {
      "username": tokenData.username,
      "password": tokenData.password_mdp
    }

    return new Promise((resolve, reject) => {
      jwt.sign(tokens, SECRET_KEY, {expiresIn:1800}, (err, token)=> {
        if(err) { reject(new Error(err))}

        //  console.log(token)

        resolve(`${requestURI}?jwtToken=${token}`);
      })
    })

  }
}
