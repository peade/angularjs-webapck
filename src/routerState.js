import angular from 'angular'

export default angular.module('app.statesMod', [])
  .constant('states', {
    'index': {
      url: '/index',
      onLineScript: [
        'https://unpkg.com/better-scroll@1.15.1/dist/bscroll.min.js'
      ], // 加载在线script
      onLineMod: [], // 用于在线script的mode
      deps: async function () {
        let ctr
        await require.ensure([], function () {
          ctr = require('./components/index/index.js')
        }, 'index')
        return [ctr]
        // return require('./components/index/index.js')
      },
      views: {
        'body': {
          template: async function () {
            let a
            await require.ensure([], function () {
              a = require('./components/index/index.htm')
            }, 'index')
            return a
          },
          // templateUrl: './components/index/index.htm',
          controller: 'indexCtr'
        }
      }
    }
  })
