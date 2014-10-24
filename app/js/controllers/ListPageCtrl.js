App.controller('ListPageCtrl', ['$scope', 'MealService', '$location', function ($scope, MealService, $location) {

    MealService.all().then(function (meals) {
        $scope.meals = meals;
    });

    $scope.deleteRecipe = function (index) {
        var meal = $scope.meals[index];
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete " + meal.name + "?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }, function () {
            if (meal.id) {
                MealService.remove(meal);
            }
            $scope.meals.splice(index, 1);
        });
    };

    $scope.editRecipe = function (meal_id) {
        $location.path('/edit/' + meal_id);
    };
}]);