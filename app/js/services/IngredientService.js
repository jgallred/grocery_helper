App.service('IngredientService', ['$q', '$timeout', function ($q, $timeout) {
    var ingredients = [
        {id:6, meal_id:1, name:'beans', unit:'cans', size:1},
        {id:5, meal_id:2, name:'lettuce', unit:'head', size:1},
        {id:7, meal_id:3, name:'cheese', unit:'cups', size:1.5}
    ];

    return {
        //find: function (id) {
        //    var deferred = $q.defer();
        //
        //    $timeout(function () {
        //        var found = null;
        //
        //        angular.forEach(ingredients, function (meal) {
        //            if (meal.id === id) {
        //                found = meal;
        //                return false;
        //            }
        //        });
        //
        //        if (found) {
        //            deferred.resolve(found);
        //        } else {
        //            deferred.reject();
        //        }
        //    });
        //
        //    return deferred.promise;
        //},

        add: function (ingredient) {
            var deferred = $q.defer();

            $timeout(function () {
                ingredient.id = Math.floor(Math.random() * (9999999 - 1)) + 1;

                ingredients.push(ingredient);

                deferred.resolve(ingredient);
            });

            return deferred.promise;
        },

        ingredientsForMeal: function (meal) {
            var deferred = $q.defer();

            $timeout(function () {
                var results = [];

                angular.forEach(ingredients, function (ingredient) {
                    if (ingredient.meal_id === meal.id) {
                        results.push(ingredient);
                    }
                });

                deferred.resolve(results);
            });

            return deferred.promise;
        },

        //update: function (meal) {
        //    var deferred = $q.defer();
        //
        //    $timeout(function () {
        //        deferred.resolve(meal);
        //    });
        //
        //    return deferred.promise;
        //},

        remove: function (ingredient) {
            var deferred = $q.defer();

            $timeout(function () {
                var index = null;

                angular.forEach(ingredients, function (element, idx) {
                    if (element.id === ingredient.id) {
                        index = idx;
                        return false;
                    }
                });

                if (angular.isNumber(index)) {
                    ingredients.splice(index, 1);
                }

                deferred.resolve(ingredient);
            });

            return deferred.promise;
        },

        units: function () {
            var deferred = $q.defer();
            $timeout(function () {
                var units = [],
                    unique = {};

                angular.forEach(ingredients, function (ingredient) {
                    if (!unique[ingredient.unit]) {
                        unique[ingredient.unit] = true;
                        units.push(ingredient.unit);
                    }
                });

                deferred.resolve(units);
            });
            return deferred.promise;
        },

        names: function () {
            var deferred = $q.defer();
            $timeout(function () {
                var names = [],
                    unique = {};

                angular.forEach(ingredients, function (ingredient) {
                    if (!unique[ingredient.name]) {
                        unique[ingredient.name] = true;
                        names.push(ingredient.name);
                    }
                });

                deferred.resolve(names);
            });
            return deferred.promise;
        }
    };
}]);