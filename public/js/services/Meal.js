App.factory('Meal', ['$resource', function ($resource) {
    return $resource(
        '/api/meals/:id',
        {id: '@id'},
        {
            update: {method: 'PUT', params: {id: '@id'}},
            ingredients: {method: 'GET', params: {id: '@id'}, url: '/api/meals/:id/ingredients', isArray: true}
        }
    );
}]);