import angular from 'angular'

export default angular.module('app.commonService', [])
  .factory('newHttpService', ['$http', '$q', function ($http, $q) {
    return {
      get: function (param) {
        let q = $q.defer()
        $http.get(param.url, {params: param.params})
          .then(function (data) {
            if (data.data.result === 'SUCCESS') {
              q.resolve(data.data.content)
            } else {
              q.reject(data.data.resultMessage)
            }
          }, function (err) {
            q.reject(err.statusText + '错误')
          })
        return q.promise
      },
      post: function (param) {
        let q = $q.defer()
        $http.post(param.url, param.params)
          .then(function (data) {
            if (data.data.result === 'SUCCESS') {
              q.resolve(data.data.content)
            } else {
              q.reject(data.data.resultMessage)
            }
          }, function (err) {
            q.reject(err.statusText + '错误')
          })
        return q.promise
      }
    }
  }])
  .factory('simFun', ['$q', 'newHttpService', function ($q, newHttpService) {
    return {
      loadOnlineScript (src) {
        let q = $q.defer()
        let script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)
        script.onload = function () {
          console.log('load ' + src)
          q.resolve()
        }
        script.onerror = function () {
          q.reject()
        }
        if (script.complete) {
          q.resolve()
        }

        return q.promise
      },
      imgLazyLoad: function (img) {
        var def = $q.defer()
        img.onload = function () {
          def.resolve('img loaded')
        }
        img.onerror = function () {
          def.reject('img error')
        }
        if (img.complete) {
          def.resolve('img complete')
        }
        return def.promise
      },
      // getTopBanner: function () {
      //   var def = $q.defer()
      //   if (globalStorage.topCommBanner) {
      //     def.resolve(globalStorage.topCommBanner)
      //   } else {
      //     newHttpService.get({
      //       url: 'web/bannerResource/getBanners',
      //       params: {
      //         token: globalStorage.token,
      //         valid: true,
      //         showArea: 'topBanner'
      //       }
      //     })
      //       .then(function (value) {
      //         globalStorage.topCommBanner = value
      //         def.resolve(value)
      //       }, function (reason) {
      //         def.reject(reason)
      //       })
      //   }
      //   return def.promise
      // },
      base64ImgSize: function (baseData) {
        let strLen = baseData.length
        return (strLen - (strLen / 8) * 2) / 1024 / 1024 // MB
      }
    }
  }])
