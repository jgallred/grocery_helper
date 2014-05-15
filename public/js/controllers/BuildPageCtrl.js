App.controller(
    'BuildPageCtrl',
    [
        '$scope',
        '$location',
        'Meal',
        function ($scope, $location, Meal) {
            $scope.meals = Meal.query(function () {
                angular.forEach($scope.meals, function (meal) {
                    meal.selected = false;
                });
            });

            $scope.building = true;

            function filterSelectedMeals() {
                var meals = [];
                angular.forEach($scope.meals, function (meal) {
                    if (meal.selected) {
                        meals.push(meal);
                    }
                });
                return meals;
            }

            $scope.getTotalSelectedNights = function () {
                var total = 0;
                angular.forEach(filterSelectedMeals(), function (meal) {
                    total += meal.nights;
                });
                return total;
            };

            $scope.generateGroceryList = function () {
                var meal_ids = [];
                angular.forEach(filterSelectedMeals(), function (meal) {
                    meal_ids.push(meal.id);
                });
                $location.path('/grocery');
                $location.search('ids', meal_ids);
            };
        }
    ]
);