App.factory('Ingredient', ['$resource', function ($resource) {
    return $resource(
        '/api/ingredients/:id',
        {id: '@id'},
        {
            update: {method: 'PUT', params: {id: '@id'}},
            units: {method: 'GET', url: 'api/ingredients/units', isArray: true, transformResponse: function (data) {
                var raw = angular.fromJson(data);
                var result = [];
                angular.forEach(raw, function (data) {
                    result.push({label: data});
                });
                return result;
            }},
            names: {method: 'GET', url: 'api/ingredients/names', isArray: true, transformResponse: function (data) {
                var raw = angular.fromJson(data);
                var result = [];
                angular.forEach(raw, function (data) {
                    result.push({label: data});
                });
                return result;
            }}
        }
    );
}]);