App.controller('ListPageCtrl', ['$scope', 'Meal', function ($scope, Meal) {
    $scope.meals = Meal.query();

    $scope.deleteRecipe = function (index) {
        var meal = $scope.meals[index];
        if (confirm("Are you sure you want to delete " + meal.name + "?")) {
            if (meal.id) {
                Meal.remove({id: meal.id});
            }
            $scope.meals.splice(index, 1);
        }
    };
}]);