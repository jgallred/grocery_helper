App.controller(
    'GroceryPageCtrl',
    [
        '$scope',
        '$routeParams',
        'MealService',
        'IngredientService',
        function ($scope, $routeParams, MealService, IngredientService) {
            var raw_ids = angular.isArray($routeParams.ids) ? $routeParams.ids : [$routeParams.ids];

            $scope.meals = [];
            $scope.ingredients = [];

            angular.forEach(raw_ids, function (id) {
                MealService.find(parseInt(id, 10)).then(function (meal) {
                    $scope.meals.push(meal);

                    IngredientService.ingredientsForMeal(meal).then(function (ingredients) {
                        angular.forEach(ingredients, function (ingredient) {
                            $scope.ingredients.push(ingredient);
                        })
                    });
                });
            });
        }
    ]
);