<?php

class MealController extends \RestController {

    protected $create_rules = array(
        'name' => 'required|min:5|max:100',
        'nights' => 'required|integer|min:0'
    );

    protected $update_rules = array(
        'name' => 'min:5|max:100',
        'nights' => 'integer|min:0'
    );


    public function __construct(Meal $meal)
    {
    	$this->model = $meal;
    }

    protected function saveNewResource()
    {
        $meal = new Meal();

        $meal->name = Input::get('name');
        $meal->nights = Input::get('nights');

        $meal->save();

        return $meal;
    }

    protected function updateResource(Eloquent &$model)
    {

        if (Input::has('name')) {
            $model->name = Input::get('name');
        }

        if (Input::has('nights')) {
            $model->nights = Input::get('nights');
        }

        $model->save();
    }

    public function getMealIngredients($meal_id)
    {
        $meal = $this->model->findOrFail($meal_id);
        return Response::json($meal->ingredients);
    }

}