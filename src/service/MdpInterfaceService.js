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

    this.createServerURL(v, 'statistics/usage/usageStatistics/query/jsonp').then((requestURI) => {

      console.log("request URI", requestURI)

      if(!callback) return;

      v.$jsonp(requestURI, callback.params).then(response => {

          console.log(`get mdp usage complete in ${ new Date() - start }ms`);

          //存储为全局车组基础信息
          //v.$store.commit('updateGpsMap', response);
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

    this.createServerURL(v, 'statistics/usage/maincycStatistics/query/jsonp').then((requestURI) => {

      let start = new Date();

      v.$jsonp(requestURI, callback).then(response => {

        console.log(`get mdp maincyc complete in ${ new Date() - start }ms`);

        //存储为全局车组基础信息
        v.$store.commit('updateTrains', response);

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

        console.log(token)

        resolve(`${requestURI}?jwtToken=${token}`);
      })
    })

  }
}
