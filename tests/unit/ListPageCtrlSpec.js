/**
 * Created by Jason on 5/16/14.
 */
describe("ListPageController", function () {
    var scope,
        Meal,
        mock_window,
        ctrl,
        meals;

    beforeEach(module('app'));

    beforeEach(function () {
        scope = {};

        Meal = {
            query: function () {
                return [];
            },
            remove: function () {
            }
        };

        mock_window = {
            confirm: function () {
                return true;
            }
        };

        meals = [
            {id: 2, name: 'Meal 1', nights: 2},
            {id: 3, name: 'Meal 2', nights: 3},
            {id: 4, name: 'Meal 3', nights: 1}
        ];
    });

    function makeController($controller) {
        return $controller('ListPageCtrl', {$scope: scope, Meal: Meal, $window: mock_window});
    }

    it("to maintain a list of meals", inject(function ($controller) {
        ctrl = makeController($controller);
        expect(scope.meals.length).toBe(0);
    }));

    it("to query for all the meals", inject(function ($controller) {
        spyOn(Meal, 'query').andReturn(meals);

        ctrl = makeController($controller);

        expect(scope.meals.length).toBe(meals.length);
    }));

    describe('deleteRecipe', function () {

        it("asks the user if they want to delete", inject(function ($controller) {
            var index = 1;

            spyOn(Meal, 'query').andReturn(meals);

            spyOn(mock_window, 'confirm');

            ctrl = makeController($controller);

            scope.deleteRecipe(index);

            expect(mock_window.confirm).toHaveBeenCalled();
        }));

        it("deletes the meal through the API", inject(function ($controller) {
            var index = 1,
                meal = meals[index];

            spyOn(Meal, 'query').andReturn(meals);

            spyOn(Meal, 'remove');

            spyOn(mock_window, 'confirm').andReturn(true);

            ctrl = makeController($controller);

            scope.deleteRecipe(index);

            expect(Meal.remove).toHaveBeenCalledWith({id: meal.id});
        }));

        it("removes the meal from the list", inject(function ($controller) {
            var index = 1,
                expected_length = meals.length - 1;

            spyOn(Meal, 'query').andReturn(meals);

            spyOn(Meal, 'remove');

            spyOn(mock_window, 'confirm').andReturn(true);

            ctrl = makeController($controller);

            scope.deleteRecipe(index);

            expect(scope.meals.length).toBe(expected_length);
        }));

        it("does nothing if the user doesn't confirm", inject(function ($controller) {
            var index = 1;

            spyOn(Meal, 'query').andReturn(meals);

            spyOn(Meal, 'remove');

            spyOn(mock_window, 'confirm').andReturn(false);

            ctrl = makeController($controller);

            scope.deleteRecipe(index);

            expect(Meal.remove).not.toHaveBeenCalled();
        }));
    });
});