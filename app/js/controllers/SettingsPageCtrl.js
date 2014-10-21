App.controller('SettingsPageCtrl',
    [
        '$scope',
        'MealService',
        'IngredientService',
        function ($scope, MealService, IngredientService) {
            $scope.data = null;

            $scope.export = function () {
                var data = [];
                MealService.all().then(function (meals) {
                    angular.forEach(meals, function (meal) {
                        (function (meal) {
                            IngredientService.ingredientsForMeal(meal).then(function (ingredients) {
                                meal.ingredients = ingredients;
                                data.push(meal);
                                //var m = {name: meal.name, nights: meal.nights, ingredients: []};
                                //angular.forEach(ingredients, function (ingredient) {
                                //    m.ingredients.push({
                                //        size: ingredient.size,
                                //        unit: ingredient.unit,
                                //        name: ingredient.name
                                //    });
                                //});
                                //data.push(m);
                            });
                        }(meal))
                    });
                });

                $scope.export_data = {recipies: data};
            };

            $scope.import = function (raw_data) {
                var data = JSON.parse(raw_data);

                angular.forEach(data.recipies || [], function (recipie) {
                    MealService.add({nights: recipie.nights, name: recipie.name}).then(function (meal) {
                        (function (ingredients, meal) {
                            angular.forEach(ingredients, function (ingredient) {
                                IngredientService.add({
                                    name: ingredient.name,
                                    size: ingredient.size,
                                    unit: ingredient.unit,
                                    meal_id: meal.id
                                });
                            });
                        }(recipie.ingredients || [], meal))
                    });
                });
            };
        }
    ]
);