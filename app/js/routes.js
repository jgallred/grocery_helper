App.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ListPageCtrl',
            templateUrl: 'js/templates/list.html'
        })
        .when('/edit/:id', {
            controller: 'EditPageCtrl',
            templateUrl: 'js/templates/edit.html'
        })
        .when('/build', {
            controller: 'BuildPageCtrl',
            templateUrl: 'js/templates/build.html'
        })
        .when('/grocery', {
            controller: 'GroceryPageCtrl',
            templateUrl: 'js/templates/grocery_list.html'
        })
        //.when('/settings', {
        //    controller: 'SettingsPageCtrl',
        //    templateUrl: 'js/templates/settings.html'
        //})
        .otherwise({
            redirectTo: '/'
        });
});