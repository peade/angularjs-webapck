import angular from 'angular'
import './index.scss'
import img from '../../images/check-circle.png'

export default angular.module('app.indexMod', [])
  .controller('indexCtr', ['$scope', 'simFun', function ($scope, simFun) {
    console.log(img)
    console.log(simFun)
    $scope.text = 'index router text'
  }])
