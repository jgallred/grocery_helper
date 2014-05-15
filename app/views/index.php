<!doctype html>
<!--suppress HtmlUnknownTarget, HtmlUnknownAnchorTarget -->
<html lang="en" ng-app="app">
<head>
    <meta charset="UTF-8">
    <title>Grocery Planner</title>
    <link rel="stylesheet" href="vendor/bower_components/bootstrap/dist/css/bootstrap.css">
</head>
<body>
<div>
    <div class="navbar navbar-default navbar-static-top" ng-controller="HeaderCtrl">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Grocery Planner</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li ng-class="{active: isActive('/')}"><a href="#">Home</a></li>
                    <li ng-class="{active: isActive('/edit/new')}"><a href="#/edit/new">Add a Meal</a></li>
                    <li ng-class="{active: isActive('/build')}"><a href="#/build">Build a Grocery List</a></li>
                </ul>
            </div>
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
<script type="text/javascript" src="/js/app.js"></script>
<script type="text/javascript" src="/js/services/Meal.js"></script>
<script type="text/javascript" src="/js/services/Ingredient.js"></script>
<script type="text/javascript" src="/js/controllers/HeaderCtrl.js"></script>
<script type="text/javascript" src="/js/controllers/ListPageCtrl.js"></script>
<script type="text/javascript" src="/js/controllers/EditPageCtrl.js"></script>
<script type="text/javascript" src="/js/controllers/BuildPageCtrl.js"></script>
<script type="text/javascript" src="/js/controllers/GroceryPageCtrl.js"></script>
<script type="text/javascript" src="/js/routes.js"></script>
</body>
</html>
