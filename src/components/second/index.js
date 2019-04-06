import angular from 'angular'
import './index.scss'

export default angular.module('secondMod', [])
  .controller('secondCtr', ['$scope', function ($scope) {
    $scope.text = 'secondCtr text'
  }])
