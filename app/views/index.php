<!doctype html>
<html lang="en" ng-app="app">
<head>
    <meta charset="UTF-8">
    <title>Grocery App</title>
    <link rel="stylesheet" href="vendor/bower_components/bootstrap/dist/css/bootstrap.css">
</head>
<body>
<div>
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#about">Add a Recipe</a></li>
                    <li><a href="#contact">Build a Grocery List</a></li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8" ng-view></div>
            <div class="col-md-2"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/vendor/bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="/vendor/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script type="text/javascript" src="/vendor/bower_components/angular/angular.js"></script>
<script type="text/javascript" src="/vendor/bower_components/angular-route/angular-route.js"></script>
<script type="text/javascript" src="/vendor/bower_components/angular-resource/angular-resource.js"></script>
<script type="text/javascript" src="/vendor/bower_components/angular-bootstrap/ui-bootstrap.js"></script>
<script type="text/ng-template" id="list.html">
    <div class="home">
        <h3>View your Recipies</h3>
        <input type="text" ng-model="search" class="search-query" placeholder="Search">
        <table class="table">
            <thead>
            <tr>
                <td></td>
                <td>Name</td>
                <td>Nights</td>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="recipe in recipies | orderBy:name | filter:search" class="recipe">
                <td class="actions">
                    <div class="btn-group">
                        <a class="btn btn-default btn-xs" ng-href="#edit/{{recipe.id}}">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="btn btn-default btn-xs" ng-click="deleteRecipe('{{recipe.id}}')">
                            <span class="glyphicon glyphicon-trash"></span>
                        </a>
                    </div>
                </td>
                <td class="name">{{recipe.name}}</td>
                <td class="nights">{{recipe.nights}}</td>
            </tr>
            </tbody>
            ~
        </table>
    </div>
</script>

<script type="text/javascript">
    var App = angular.module('app', ['ngRoute', 'ngResource']);

    App.factory('Meal', ['$resource', function ($resource) {
        return $resource('/api/meals/:meal_id', {meal_id: '@id'});
    }]);

    App.controller('ListPageCtrl', ['$scope', 'Meal', function ($scope, Meal) {
        $scope.recipies = Meal.query();
//            $scope.recipies = [
//                {id:3, name : "Taco Soup", nights : 3},
//                {id:1, name : "Chicken Corden Bleu", nights : 2},
//                {id:4, name : "Frech Dip Sandwiches", nights : 1}
//            ];
    }]);

    App.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ListPageCtrl',
                templateUrl: 'list.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
</script>
</body>
</html>
