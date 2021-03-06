const jwt = require('jsonwebtoken');

const SECRET_KEY = "098f6bcd4621d373cade4e832627b4f6";

export default {
  /**
   * 定时器实例对象
   */
  timers : {
    airConTimer: null,
    ruleAttTimer: null,
  },
  promisePool:{
    ruleAttData: [],
  },
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
   * 屏幕-资源中心-部件信息
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {String} callback.params.train  - 请求参数-车组号
   * @param {String} callback.params.funcLocPath - 功能路径
   * @param {Function} callback.onSuccess - onSuccess (response){}
   * @param {Function} callback.onError - onError (error){}
   */
  getBomByFuncLocPath (v, callback) {

    this.createServerURL(v, 'sap/bom/getBomByFuncLocPath').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, callback.params).then(response => {

        console.log(`get mdp train part info complete in ${ new Date() - start }ms`);

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

    this.createServerURL(v, 'resume/trainCarFile/baseTrainInfo').then((requestURI) => {

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
  getAIWarnFaultCount(v){
    let requestInterval = v.$store.state.requestInterval

    this.getAIWarnFaultCountTimer(v, requestInterval)

  },
  /**
   * 获取空调健康评估分级数量
   * @param {Vue} v - vue实例
   */
  getAIWarnFaultCountTimer(v, interval) {

    //30天内
    let startDate = (new Date()).addDate(-30).Format("yyyyMMdd"),
      endDate = (new Date()).Format("yyyyMMdd")

    let params = {
      startDate: startDate,
      endDate: endDate
    }

    this.createServerURL(v, 'air-conditioner/base-summary').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, params).then(response => {

        console.log(`get mdp AI-MODEL base summary complete in ${ new Date() - start }ms`);
        console.log(response)

        v.$store.commit('updateAIWarnFaultCount', response)

        setTimeout(() => {

          this.getAIWarnFaultCountTimer(v, interval)
        }, interval)

      }).catch(error => {

        console.error(error)
      })
    }, reason => {

      console.error(reason);
    })
  },
  /**
   * 获取空调数据
   * @param {Vue} v - vue实例
   * @param {Object} callback 回调方法
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  fetchAIWarnFault(v, callback) {

    //30天内
    let startDate = (new Date()).addDate(-30).Format("yyyy-MM-dd"),
      endDate = (new Date()).Format("yyyy-MM-dd")

    let querySql = `RS_DATE >= '${startDate}'`

    if(callback && callback.params){
      querySql += ` AND TYPE = '${callback.params.level}' `
    }

    this.queryBy(v, "V_AI_MODEL_WARN",
      {
        params: {
          rows: 5,
          page: callback.params.page,
          queryResultFilterSql: querySql
        },
        onSuccess: (resp) => {

          //console.log(resp)
          v.$store.commit('updateAIWarnFault', resp)

          if (callback && callback.onSuccess) {
            callback.onSuccess(resp)
          }

        }, onError: (error) => {
          console.log(error)

          if (callback && callback.onError) {
            callback.onError(error)
          }
        }
    })
  },
  /**
   * 获取规则关注数量
   * @param {Vue} v - vue实例
   */
  getRuleAttentionCount(v) {

    //查询30天内的规则关注
    let startDate = (new Date()).addDate(-30).Format("yyyyMMdd"), endDate = (new Date()).Format("yyyyMMdd");

    let params = {
      startDate: startDate,
      endDate: endDate,
      trainSn: null
    }

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
    v.$store.commit('updateRuleAttentionCount', levelCount)


  },
  /**
   * 停止进行中的数据请求
   */
  stopRuleAttentionPendingTask(){
    let cancelPromise = new Promise((resolve, reject) => {
      reject('取消其他全部未完成请求！');
    })

    Promise.race([...this.promisePool.ruleAttData, cancelPromise]).catch(error => {

      console.info(error)
      this.promisePool.ruleAttData.length = 0
    })
  },
  /**
   * 获取规则关注
   * @param {Vue} v - vue实例
   * @param {Object} callback
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   * @param {Boolean} doTimer
   */
  getRuleAttention(v, callback, doTimer) {

    let startDate = (new Date()).addDate(-30).Format("yyyyMMdd"), endDate = (new Date()).Format("yyyyMMdd");

    let params = {
      startDate: startDate,
      endDate: endDate,
      trainSn: '',
      rows: 5,
      page: callback.params.page
    }

    this.createServerURL(v, 'monitor/monitorcheck/queryMonitorCheck').then((requestURI) => {

      let start = new Date();

      this.stopRuleAttentionPendingTask()

      let taskPromise =  v.$jsonp(requestURI, params)

      this.promisePool.ruleAttData.push(taskPromise)

      this.promisePool.ruleAttData.reverse()[0].then(response => {

        console.log(`get mdp rule attention complete in ${ new Date() - start }ms`);
        console.log(response)

        this.getRuleAttentionTrend(v, response, callback)

      }).catch(error => {

        console.log(error)
      })
    }, reason => {

      console.log(reason);
    })
  },
  /**
   * 获取参数点趋势数据
   * @param {Vue} v - vue实例
   * @param {Object} ruleAttentionData - 关注数据
   * @param {Array} ruleAttentionData.rows - 参数点数据
   * @param {Object} callback.params - 请求参数
   * @param {Function} callback.onSuccess - onSuccess (resp
   * @param {Function} callback.onError - onError (error){}
   */
  getRuleAttentionTrend(v, ruleAttentionData, callback){

    if(ruleAttentionData && ruleAttentionData.rows.length > 0) {

      let result = ruleAttentionData.rows

      this.createServerURL(v, 'monitor/monitorcheck/getNewRedisData').then((requestURI) => {

        let start = new Date();

        requestURI += '?1=1'

        result.forEach((data) => {
          requestURI += `&partId=${data.partId}`
          requestURI += `&trainId=${data.trainId}`
          requestURI += `&vehicleNo=${data.vehicleNo}`

        })

        v.$jsonp(requestURI).then(response => {

          console.log(`get mdp rule attention trend complete in ${ new Date() - start }ms`);
          console.log(response)
          if(response.status === 'success'){
            response.data.datas.forEach( (trend, idx) => {
              result[idx].paramValue = trend.paramValue
            })
          }

          if (callback && callback.onSuccess) {
            callback.onSuccess(ruleAttentionData)
          }

          v.$store.commit('updateRuleAttention', result)



        }).catch(error => {

          throw error
        })
      }, reason => {

        v.$store.commit('updateRuleAttention', result)

        if (callback && callback.onSuccess) {
          callback.onSuccess(ruleAttentionData)
        }

        console.error(reason);

      })
    }

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
