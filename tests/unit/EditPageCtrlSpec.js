/**
 * Created by Jason on 5/16/14.
 */
describe("EditPageController", function () {
    var scope,
        routeParams,
        Meal,
        ingredients,
        Ingredient,
        ingredient_names,
        ingredient_units,
        location,
        ctrl;

    beforeEach(module('app'));

    beforeEach(function () {
        scope = {};

        routeParams = {};

        ingredients = [
            {id: 8, name: 'ground beef', units: 'pounds', size: 1},
            {id: 8, name: 'lettuce', units: 'head', size: 1},
            {id: 8, name: 'red kidney beans', units: 'can', size: 1}
        ];

        Meal = {
            get: function () {
            },
            ingredients: function () {
                return ingredients;
            }
        };

        ingredient_names = ['ground beef', 'lettuce', 'red kidney beans'];
        ingredient_units = ['pounds', 'head', 'cans'];

        Ingredient = function (obj) {
            angular.forEach(obj, function(value, key) {
                this[key] = value;
            }, this);
        };

        Ingredient.names = function () {
            return ingredient_names;
        };
        Ingredient.units = function () {
            return ingredient_units;
        };

        location = {};
    });

    function makeController($controller) {
        return $controller('EditPageCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            Meal: Meal,
            Ingredient: Ingredient,
            $location: location
        });
    }

    describe('edit mode', function () {
        var meal;

        beforeEach(inject(function ($controller) {
            meal = {id: 6, name: 'Taco Salad', nights: 2};

            routeParams = {
                id: 6
            };

            spyOn(Meal, 'get').andReturn(meal);

            ctrl = makeController($controller);
        }));

        it('should load the meal given by the id', function () {
            expect(scope.meal).toBeDefined();
            expect(scope.meal).toEqual(meal);
        });

        it('should load the meal\'s ingredients', function () {
            expect(scope.ingredients).toBeDefined();
            expect(scope.ingredients.length).toBe(ingredients.length);
        });

        describe('ingredient validation', function () {
            it('requires a name', function () {
                scope.new_ingredient = {name: '', size: '5', unit: 'pound'};
                expect(scope.validIngredient()).toBe(false);
            });

            it('requires a size', function () {
                scope.new_ingredient = {name: 'beef', size: '', unit: 'pound'};
                expect(scope.validIngredient()).toBe(false);
            });

            it('requires a unit', function () {
                scope.new_ingredient = {name: 'beef', size: '5', unit: ''};
                expect(scope.validIngredient()).toBe(false);
            });

            it('passes on a valid ingredient', function () {
                scope.new_ingredient = {name: 'beef', size: '5', unit: 'pound'};
                expect(scope.validIngredient()).toBe(true);
            });
        });

        describe('adding ingredients', function () {
            var name, unit, size;

            beforeEach(function () {
                name = 'baking soda';
                unit = 'teaspoon';
                size = 5;

                scope.new_ingredient = {name: name, size: size, unit: unit};

                scope.ingredients = [];
            });

            it('adds the meal id', function () {
                scope.addIngredient();

                expect(scope.ingredients[0].meal_id).toEqual(meal.id);
            });

            it('uses the current ingredient inputs', function () {
                scope.addIngredient();

                expect(scope.ingredients.length).toBe(1);

                expect(scope.ingredients[0].name).toEqual(name);
                expect(scope.ingredients[0].unit).toEqual(unit);
                expect(scope.ingredients[0].size).toEqual(size);
            });

            it('clears the ingredient inputs', function () {
                scope.addIngredient();

                expect(scope.new_ingredient.name).toEqual('');
                expect(scope.new_ingredient.size).toEqual('');
                expect(scope.new_ingredient.unit).toEqual('');
            });
        });
    });

    it('removes an ingredient when deleted', function () {
        scope.new_ingredient = {name: 'beef', size: '4', unit: 'pound'};

        scope.addIngredient();

        scope.deleteIngredient(0);

        expect(scope.ingredients.length).toBe(0);
    });

    xit("to maintain a list of meals", inject(function ($controller) {
        ctrl = makeController($controller);
        expect(scope.meals.length).toBe(0);
    }));

    xit("to query for all the meals", inject(function ($controller) {
        spyOn(Meal, 'query').andReturn(meals);

        ctrl = makeController($controller);

        expect(scope.meals.length).toBe(meals.length);
    }));

    xdescribe('deleteRecipe', function () {

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