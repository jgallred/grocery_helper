App.service('MealService', ['$q', '$timeout', '$indexedDB', function ($q, $timeout, $indexedDB) {
    var meals = [
        {id: 2, name: 'Meal 1', nights: 2},
        {id: 3, name: 'Meal 2', nights: 3},
        {id: 4, name: 'Meal 3', nights: 1}
    ];

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