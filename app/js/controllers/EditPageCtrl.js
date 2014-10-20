App.controller(
    'EditPageCtrl',
    [
        '$scope',
        '$routeParams',
        'Meal',
        'MealService',
        'Ingredient',
        'IngredientService',
        '$location',
        '$q',
        '$timeout',
        function ($scope, $routeParams, Meal, MealService, Ingredient, IngredientService, $location, $q, $timeout) {
            var meal_id = parseInt($routeParams.id, 10),
                is_new = isNaN(meal_id);

            $scope.meal = new Meal({nights: 0});
            $scope.ingredients = [];

            if (!is_new) {
                MealService.find(meal_id).then(function (meal) {
                    $scope.meal = meal;
                    return meal;
                }).then(function (meal) {
                    return IngredientService.ingredientsForMeal(meal);
                }).then(function (ingredients) {
                    $scope.ingredients = ingredients;
                });
            }

            $scope.ingredients = [];
            $scope.new_ingredient = {name: '', size: '', unit: ''};
            $scope.ingredient_names = [];
            $scope.ingredient_units = [];
            $scope.ingredients_to_delete = [];
            $scope.ingredients_to_insert = [];

            IngredientService.units().then(function (units) {
                $scope.ingredient_units = units;
            });

            IngredientService.names().then(function (names) {
                $scope.ingredient_names = names;
            });

            function in_list(arr, item) {
                return arr.indexOf(item) >= 0;
            }

            function add_to_list(arr, item) {
                if (!in_list(arr, item)) {
                    arr.push(item);
                }
            }

            function addIngredientToTypeaheads(ingredient) {
                add_to_list($scope.ingredient_names, ingredient.name);
                add_to_list($scope.ingredient_units, ingredient.unit);
            }

            function persistIngredients() {
                var start = $q.defer(),
                    action = start.promise,
                    deferred = $q.defer();

                start.resolve();

                angular.forEach($scope.ingredients_to_delete, function (ingredient) {
                    action.then((function (ingredient) {
                        return IngredientService.remove(ingredient);
                    }(ingredient)));
                });

                angular.forEach($scope.ingredients_to_insert, function (ingredient) {
                    action.then((function (ingredient) {
                        return IngredientService.add(ingredient);
                    }(ingredient)));
                });

                action.then(function () {
                    deferred.resolve();
                });

                return deferred.promise;
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

            $scope.addIngredient = function (event) {
                event.stopPropagation();
                event.preventDefault();

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

                angular.element('#ingredient_size').focus();
            };

            $scope.deleteIngredient = function (index) {
                var ingredient = $scope.ingredients[index];
                $scope.ingredients.splice(index, 1);
                if (ingredient.id) {
                    $scope.ingredients_to_delete.push(ingredient);
                } else {
                    var sched_insert = $scope.ingredients_to_insert.indexOf(ingredient);
                    if (sched_insert >= 0) {
                        $scope.ingredients_to_insert.splice(sched_insert, 1);
                    }
                }
            };

            $scope.saveMeal = function () {
                if ($scope.validIngredient()) {
                    $scope.addIngredient();
                }

                var promise = null;

                if (!is_new) {
                    promise = persistIngredients().then(function () {
                        return MealService.update($scope.meal)
                    });
                } else {
                    promise = MealService.add($scope.meal).then(function (meal) {
                        angular.forEach($scope.ingredients_to_insert, function (ingredient) {
                            ingredient.meal_id = meal.id;
                        });

                        return persistIngredients();
                    });
                }

                promise.then(function () {
                    $timeout(function () {
                        $scope.cancel();
                    });
                });

                return promise;
            };

            $scope.cancel = function () {
                $location.path('/');
            };
        }
    ]
);