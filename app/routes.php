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

Route::get('/', function()
{
	return View::make('hello');
});

Route::resource('meal', 'MealController');

Route::get(
    'meal/{meal_id}/ingredients',
    ['uses' => 'MealController@getMealIngredients']
)->where('meal_id', '[0-9]+');

Route::get(
    'ingredient/units',
    ['uses' => 'IngredientController@getUnits']
);

Route::get(
    'ingredient/names',
    ['uses' => 'IngredientController@getNames']
);

Route::resource('ingredient', 'IngredientController');