App.controller(
    'GroceryPageCtrl',
    [
        '$scope',
        '$routeParams',
        'Meal',
        function ($scope, $routeParams, Meal) {
            var meal_ids = [],
                raw_ids = angular.isArray($routeParams.ids) ? $routeParams.ids : [$routeParams.ids];
            $scope.meals = [];
            $scope.ingredients = [];

            angular.forEach(raw_ids, function (id) {
                meal_ids.push(parseInt(id, 10));
                Meal.ingredients({id: id}, function (ingredients) {
                    angular.forEach(ingredients, function (ingredient) {
                        $scope.ingredients.push(ingredient);
                    });
                });
            });

            Meal.query(function (meals) {
                angular.forEach(meals, function (meal) {
                    if (meal_ids.indexOf(meal.id) >= 0) {
                        $scope.meals.push(meal);
                    }
                });
            });
        }
    ]
);