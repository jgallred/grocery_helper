App.controller('ListPageCtrl', ['$scope', 'Meal', function ($scope, Meal) {
    $scope.meals = Meal.query();

    $scope.deleteRecipe = function (index) {
        var meal = $scope.meals[index];
        if (meal.id) {
            Meal.remove({id: meal.id});
        }
        $scope.meals.splice(index, 1);
    };
}]);