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
<script type="text/javascript" src="/vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
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
        </table>
    </div>
</script>
<script type="text/ng-template" id="edit.html">
    <div class="edit">
        <h3>Edit</h3>

        <form class="form-horizontal" role="form">
            <div class="form-group">
                <label for="recipe_name" class="col-sm-2 control-label">Name</label>

                <div class="col-sm-10">
                    <input type="text"
                           class="form-control"
                           id="recipe_name"
                           placeholder="Name"
                           maxlength="100"
                           ng-model="recipe.name">
                </div>
            </div>

            <div class="form-group">
                <label for="recipe_nights" class="col-sm-2 control-label">Nights</label>

                <div class="col-sm-10">
                    <select class="form-control" id="recipe_nights" ng-model="recipe.nights">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>

            <div class="col-sm-offset-2 col-sm-10">
                <div ng-repeat="ingredient in ingredients" class="row">
                    <div class="col-sm-1">{{ingredient.size}}</div>
                    <div class="col-sm-2">{{ingredient.unit}}</div>
                    <div class="col-sm-1">of</div>
                    <div class="col-sm-4">{{ingredient.name}}</div>
                    <div class="col-sm-1">
                        <button class="btn btn-default btn-xs" ng-click="deleteIngredient($index)">
                            <span class="glyphicon glyphicon-trash"></span>
                        </button>
                    </div>
                </div>
            </div>

            <!--<br/><br/>-->

            <div class="form-inline col-sm-offset-2 col-sm-10">
                <div class="form-group">
                    <input type="text"
                           class="form-control input-sm"
                           placeholder="Size"
                           ng-model="new_ingredient.size">
                    <input type="text"
                           class="form-control input-sm"
                           placeholder="Unit"
                           ng-model="new_ingredient.unit"
                           typeahead="unit.label for unit in ingredient_units | filter:$viewValue"/>
                    of
                    <input type="text"
                           class="form-control input-sm"
                           placeholder="Name"
                           ng-model="new_ingredient.name"
                           typeahead="name.label for name in ingredient_names | filter:$viewValue"/>
                    <button class="btn btn-default btn-xs" ng-click="addIngredient()">
                        <span class="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
            </div>

            <!--<br/><br/>-->

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <a class="btn btn-default" href="#">Cancel</a>
                </div>
            </div>
        </form>
    </div>
</script>

<script type="text/javascript">
    var App = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap']);

    App.factory('Meal', ['$resource', function ($resource) {
        return $resource(
            '/api/meals/:id',
            {id: '@id'},
            {
                ingredients: {method: 'GET', params: {id: '@id'}, url: '/api/meals/:id/ingredients', isArray: true}
            }
        );
    }]);

    App.factory('Ingredient', ['$resource', function ($resource) {
        return $resource(
            '/api/ingredients/:id',
            {id: '@id'},
            {
                units: {method: 'GET', url: 'api/ingredients/units', isArray: true, transformResponse: function (data) {
                    var raw = angular.fromJson(data);
                    var result = [];
                    angular.forEach(raw, function (data) {
                        result.push({label: data});
                    });
                    return result;
                }},
                names: {method: 'GET', url: 'api/ingredients/names', isArray: true, transformResponse: function (data) {
                    var raw = angular.fromJson(data);
                    var result = [];
                    angular.forEach(raw, function (data) {
                        result.push({label: data});
                    });
                    return result;
                }}
            }
        );
    }]);

    App.controller('ListPageCtrl', ['$scope', 'Meal', function ($scope, Meal) {
        $scope.recipies = Meal.query();
//            $scope.recipies = [
//                {id:3, name : "Taco Soup", nights : 3},
//                {id:1, name : "Chicken Corden Bleu", nights : 2},
//                {id:4, name : "Frech Dip Sandwiches", nights : 1}
//            ];
    }]);

    App.controller('EditPageCtrl', ['$scope', '$routeParams', 'Meal', 'Ingredient', function ($scope, $routeParams, Meal, Ingredient) {
        var meal_id = $routeParams.id;
        $scope.recipe = Meal.get({id: meal_id});
        $scope.ingredients = Meal.ingredients({id: meal_id});
        $scope.new_ingredient = {name: '', size: '', unit: ''};

        $scope.ingredient_names = Ingredient.names();
        $scope.ingredient_units = Ingredient.units();

        function in_list(arr, item) {
            for (var i = 0, length = arr.length; i < length; i++) {
                if (arr[i].label === item) {
                    return true;
                }
            }
            return false;
        }

        function add_to_list(arr, item) {
            if (!in_list(arr, item)) {
                arr.push({label:item});
            }
        }

        $scope.addIngredient = function () {
            var new_ingredient = $scope.new_ingredient;
            $scope.ingredients.push({name: new_ingredient.name, size: new_ingredient.size, unit: new_ingredient.unit, meal_id: meal_id});

            add_to_list($scope.ingredient_names, new_ingredient.name);
            add_to_list($scope.ingredient_units, new_ingredient.unit);

            $scope.new_ingredient.name = '';
            $scope.new_ingredient.size = '';
            $scope.new_ingredient.unit = '';
        };

        $scope.deleteIngredient = function (index) {
            var ingredient = $scope.ingredients[index];
            if (ingredient.id) {
                //TODO Will need to be dumped
            }
            $scope.ingredients.splice(index, 1);
        };
    }]);

    App.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ListPageCtrl',
                templateUrl: 'list.html'
            })
            .when('/edit/:id', {
                controller: 'EditPageCtrl',
                templateUrl: 'edit.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
</script>
</body>
</html>
