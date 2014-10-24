App.controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.goTo = function (page) {
        $location.path(page);
    };
}]);
