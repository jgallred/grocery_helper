<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(
    array('prefix' => 'api'),
    function () {
        Route::get(
            'meals/{meal_id}/ingredients',
            ['uses' => 'MealController@getMealIngredients']
        )->where('meal_id', '[0-9]+');

        Route::resource('meals', 'MealController');

        Route::get(
            'ingredients/units',
            ['uses' => 'IngredientController@getUnits']
        );

        Route::get(
            'ingredients/names',
            ['uses' => 'IngredientController@getNames']
        );

        Route::resource('ingredients', 'IngredientController');
    }
);

Route::get(
    '/',
    function () {
        return View::make('index');
    }
);

App::missing(
    function () {
        return View::make('index');
    }
);