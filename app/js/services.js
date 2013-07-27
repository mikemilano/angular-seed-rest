'use strict';

angular.module('myApp.services', ['ngResource'])
  .factory('AngularIssues', function($resource){
    return $resource('https://api.github.com/repos/angular/angular.js/issues', {})
  })
  .value('version', '0.1');
