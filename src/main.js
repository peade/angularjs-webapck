import angular from 'angular'
import '@uirouter/angularjs'
import 'oclazyload'
import './common/tools'
import './routerState'
import './routerLoad'

let app = angular.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'app.commonService',
  'app.statesMod',
  'app.routerMod'
])

app
  .constant('globalStorage', {value: 11111})
  .run(function () {
    console.log('start')
  })
