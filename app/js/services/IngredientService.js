App.service('IngredientService', ['$q', '$timeout', '$indexedDB', function ($q, $timeout, $indexedDB) {
    var ingredient_store = $indexedDB.objectStore('ingredients');

    return {
        add: function (ingredient) {
            return ingredient_store.insert({
                size: parseFloat(ingredient.size),
                unit: ingredient.unit,
                name: ingredient.name,
                meal_id: parseInt(ingredient.meal_id, 10)
            }).then(function (id) {
                ingredient.id = id;
                return ingredient;
            });
        },

        ingredientsForMeal: function (meal) {

            return (function (meal) {
                var results = [],
                    query = $indexedDB.queryBuilder().$index('meal_id_idx').$eq(meal.id).compile();

                return ingredient_store.each(function (cursor) {
                    if (cursor) {
                        results.push(cursor.value);
                        cursor.continue();
                    }
                }, query).then(function () {
                    return results;
                });
            }(meal));
        },

        remove: function (ingredient) {
            return ingredient_store["delete"](ingredient.id)
                .then(function () {
                    return ingredient;
                });
        },

        units: function () {
            var deferred = $q.defer();

            ingredient_store.getAll().then(function (ingredients) {
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

            ingredient_store.getAll().then(function (ingredients) {
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