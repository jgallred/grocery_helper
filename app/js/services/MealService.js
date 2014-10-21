App.service('MealService', ['$q', '$timeout', '$indexedDB', function ($q, $timeout, $indexedDB) {
    var meals_store = $indexedDB.objectStore('meals');

    return {
        all: function () {
            return meals_store.getAll();
        },

        find: function (id) {
            return meals_store.find(id);
        },

        add: function (meal) {
            return meals_store.insert({
                name: meal.name,
                nights: parseInt(meal.nights, 10)
            }).then(function (id) {
                meal.id = id;
                return meal;
            });
        },

        update: function (meal) {
            return meals_store.upsert({
                id: parseInt(meal.id, 10),
                name: meal.name,
                nights: parseInt(meal.nights, 10)
            }).then(function () {
                return meal;
            });
        },

        remove: function (meal) {
            return meals_store["delete"](meal.id)
                .then(function () {
                    return meal;
                });
        }
    }
}]);