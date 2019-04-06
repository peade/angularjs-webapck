import angular from 'angular'

export default angular.module('app.routerMod', [])
  .config(['$stateProvider', '$urlRouterProvider', 'states',
    function ($stateProvider, $urlRouterProvider, states) {
      $urlRouterProvider.otherwise('/index')
      angular.forEach(states, function (stateOption, stateName) {
        stateOption.resolve = {
          deps: ['$ocLazyLoad', '$q', '$state', 'globalStorage', 'simFun', function ($ocLazyload, $q, $state, globalStorage, simFun) {
            let stateOpts = stateOption
            let deferred = $q.defer()
            console.log(globalStorage)

            async function lazyLoad () {
              if (stateOpts.deps) {
                // let mod = require(stateOpts.deps[0])
                let mod = await stateOpts.deps()
                for (let m of mod) {
                  $ocLazyload.load([{name: m.default.name}])
                }
                for (let scriptjs of stateOption.onLineScript) {
                  await simFun.loadOnlineScript(scriptjs)
                }
                deferred.resolve()
              }
            }

            setTimeout(function () {
              console.log('getUser')
              lazyLoad()
            }, 10)

            return deferred.promise
          }]
        }
        $stateProvider.state(stateName, stateOption)
      })
    }])
