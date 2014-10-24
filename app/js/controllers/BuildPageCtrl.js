App.filter('totalNights', function () {
    return function (meals) {
        var sum = 0;

        if (!angular.isUndefined(meals)) {
            for (var i = 0; i < meals.length; i++) {
                sum += meals[i].nights;
            }
        }

        return sum;
    };
});

App.controller(
    'BuildPageCtrl',
    [
        '$scope',
        '$location',
        'MealService',
        function ($scope, $location, MealService) {
            MealService.all().then(function (meals) {
                angular.forEach(meals, function (meal) {
                    meal.selected = false;
                });
                $scope.meals = meals;
            });

            $scope.building = true;

            $scope.generateGroceryList = function (meals) {
                var meal_ids = [];
                angular.forEach(meals, function (meal) {
                    meal_ids.push(meal.id);
                });
                $location.path('/grocery');
                $location.search('ids', meal_ids);
            };
        }
    ]
);