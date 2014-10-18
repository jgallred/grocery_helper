App.service('MealService', ['$q', '$timeout', function ($q, $timeout) {
    var meals = [
        {id: 2, name: 'Meal 1', nights: 2},
        {id: 3, name: 'Meal 2', nights: 3},
        {id: 4, name: 'Meal 3', nights: 1}
    ];

    return {
        all: function () {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(angular.copy(meals));
            });

            return deferred.promise;
        },

        find: function (id) {
            var deferred = $q.defer();

            $timeout(function () {
                var found = null;

                angular.forEach(meals, function (meal) {
                    if (meal.id === id) {
                        found = meal;
                        return false;
                    }
                });

                if (found) {
                    deferred.resolve(found);
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        },

        add: function (meal) {
            var deferred = $q.defer();

            $timeout(function () {
                meal.id = Math.floor(Math.random() * (9999999 - 1)) + 1;

                meals.push(meal);

                deferred.resolve(meal);
            });

            return deferred.promise;
        },

        update: function (meal) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(meal);
            });

            return deferred.promise;
        },

        remove: function (meal) {
            var deferred = $q.defer();

            $timeout(function () {
                var index = null;

                angular.forEach(meals, function (element, idx) {
                    if (element.id === meal.id) {
                        index = idx;
                        return false;
                    }
                });

                if (angular.isNumber(index)) {
                    meals.splice(index, 1);
                }

                deferred.resolve(meal);
            });

            return deferred.promise;
        }

    }
}]);