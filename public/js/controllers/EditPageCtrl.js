App.controller(
    'EditPageCtrl',
    [
        '$scope',
        '$routeParams',
        'Meal',
        'Ingredient',
        '$location',
        function ($scope, $routeParams, Meal, Ingredient, $location) {
            var meal_id = $routeParams.id;
            var is_new = meal_id === 'new';
            $scope.meal = !is_new ? Meal.get({id: meal_id}) : new Meal({nights:0});
            $scope.ingredients = !is_new ? Meal.ingredients({id: meal_id}) : [];
            $scope.new_ingredient = {name: '', size: '', unit: ''};
            $scope.ingredient_names = Ingredient.names();
            $scope.ingredient_units = Ingredient.units();
            $scope.ingredients_to_delete = [];
            $scope.ingredients_to_insert = [];

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
                    arr.push({label: item});
                }
            }

            function addIngredientToTypeaheads(ingredient) {
                add_to_list($scope.ingredient_names, ingredient.name);
                add_to_list($scope.ingredient_units, ingredient.unit);
            }

            function persistIngredients() {
                angular.forEach($scope.ingredients_to_delete, function (ingredient) {
                    Ingredient.remove({id: ingredient.id});
                });

                angular.forEach($scope.ingredients_to_insert, function (ingredient) {
                    ingredient.$save();
                });
            }

            function clearNewIngredient() {
                $scope.new_ingredient.name = '';
                $scope.new_ingredient.size = '';
                $scope.new_ingredient.unit = '';
            }

            $scope.validIngredient = function () {
                return $scope.new_ingredient.name.length > 0
                    && $scope.new_ingredient.size.length > 0
                    && $scope.new_ingredient.unit.length > 0;
            };

            $scope.addIngredient = function () {
                var new_ingredient = $scope.new_ingredient;

                var ingredient = new Ingredient({
                    name: new_ingredient.name,
                    size: new_ingredient.size,
                    unit: new_ingredient.unit,
                    meal_id: $scope.meal.id
                });

                $scope.ingredients_to_insert.push(ingredient);
                $scope.ingredients.push(ingredient);

                addIngredientToTypeaheads(ingredient);

                clearNewIngredient();
            };

            $scope.deleteIngredient = function (index) {
                var ingredient = $scope.ingredients[index];
                if (ingredient.id) {
                    $scope.ingredients_to_delete.push(ingredient);
                }
                $scope.ingredients.splice(index, 1);
            };

            $scope.saveMeal = function () {
                if (!is_new) {
                    persistIngredients();
                }

                var request = $scope.meal.id ? $scope.meal.$update() : $scope.meal.$save();

                request.then(function (meal) {
                    if (is_new) {
                        angular.forEach($scope.ingredients_to_insert, function (ingredient) {
                            ingredient.meal_id = meal.id;
                        });
                        persistIngredients();
                    }
                    $location.path('/');
                });
            };
        }
    ]
);