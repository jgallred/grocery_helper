<?php

class IngredientController extends \RestController {

    protected $create_rules = array(
        'meal_id' => 'required|integer|min:0',
        'size' => 'required|numeric|min:0',
        'unit' => 'required|min:1|max:100',
        'name' => 'required|min:3|max:100',
    );

    protected $update_rules = array(
        'meal_id' => 'integer|min:0',
        'size' => 'numeric|min:0',
        'unit' => 'min:1|max:100',
        'name' => 'min:3|max:100',
    );

    public function __construct(Ingredient $ingredient)
    {
        $this->model = $ingredient;
    }

    protected function saveNewResource()
    {
        $ingredient = new Ingredient();

        $ingredient->name = Input::get('name');
        $ingredient->meal_id = Input::get('meal_id');
        $ingredient->unit = Input::get('unit');
        $ingredient->size = Input::get('size');

        $ingredient->save();

        return $ingredient;
    }

    protected function updateResource(Eloquent &$model)
    {
        if (Input::has('name')) {
            $model->name = Input::get('name');
        }

        if (Input::has('meal_id')) {
            $model->meal_id = Input::get('meal_id');
        }

        if (Input::has('unit')) {
            $model->unit = Input::get('unit');
        }

        if (Input::has('size')) {
            $model->size = Input::get('size');
        }

        $model->save();
    }

    public function getUnits()
    {
        $ingredients = $this->model->all();
        return Response::json(array_values(array_unique($ingredients->lists('unit'))));
    }

    public function getNames()
    {
        $ingredients = $this->model->all();
        return Response::json(array_values(array_unique($ingredients->lists('name'))));
    }

}