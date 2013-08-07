'use strict';

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'AngularIssues', function($scope, AngularIssues) {
    // Instantiate an object to store your scope data in (Best Practices)
    $scope.myData = {
      currentIssue: null,
      issueList: [],
      issueListState: 'open',
      issueListSort: 'created',
      issueListDirection: 'desc',
      issueListPage: 1
    };

    // Available default actions:
    //  'get':    {method:'GET'},
    //  'save':   {method:'POST'},
    //  'query':  {method:'GET', isArray:true},
    //  'remove': {method:'DELETE'},
    //  'delete': {method:'DELETE'}
    /*
    AngularIssues.query(function(data) {
      // Assign the response INSIDE the callback
      // because this is asynchonous.
      $scope.myData.issues = data;
      console.log('line 16');
    });

    console.log('line 19');
    */

    /*
     // Accomplish the same thing with $http
     $http.get('https://api.github.com/repos/angular/angular.js/issues')
     .success(function(data) {
     console.log(data);
     $scope.myCtrl1Data.issues = data;
     })
     .error(function(data) {
     console.log(data);
     });
     */

    $scope.setIssueList = function() {
      AngularIssues.query({
        state: $scope.myData.issueListState,
        //labels: $scope.myData.labels,
        sort: $scope.myData.issueListSort,
        direction: $scope.myData.issueListDirection
      }, function(data) {
        $scope.myData.issueList = data;
      });
    };

    $scope.setSort = function(sort) {
      var oldSort = angular.copy($scope.myData.issueListSort);
      $scope.myData.issueListSort = sort;
      if (oldSort == sort) {
        $scope.setDirection($scope.myData.issueListDirection == 'desc' ? 'asc' : 'desc');
      } else {
        $scope.setDirection('desc');
      }
    };

    $scope.setDirection = function(direction) {
      $scope.myData.issueListDirection = direction;
      $scope.setIssueList();
    };

    $scope.sortClass = function(column){
      return column == $scope.myData.issueListSort && 'sort-' + $scope.myData.issueListDirection;
    };

    $scope.setCurrentIssue = function(number) {
      AngularIssues.getIssue({number: number}, function(data){
        console.log(data);
        $scope.myData.currentIssue = data;
      });
    };

    $scope.showAll = function() {
      $scope.myData.currentIssue = null;
    };

    $scope.setIssueList();
  }])

  .controller('MyCtrl3', [function() {

  }]);