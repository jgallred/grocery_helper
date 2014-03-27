<?php

class MealController extends \BaseController {

	/**
	 * @var Meal
	 */
	private $meal;

    public function __construct(Meal $meal)
    {
    	$this->meal = $meal;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Response::json($this->meal->all()->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $validator = Validator::make(
            Input::all(),
            array(
                'name' => 'required|min:5|max:100',
                'nights' => 'required|integer|min:0'
            )
        );

        if ($validator->fails()) {
            return Response::json(
                array('errors' => $validator->messages()->toArray()),
                400
            );
        }

        $meal = new Meal();

        $meal->name = Input::get('name');
        $meal->nights = Input::get('nights');

        $meal->save();

        return Response::json($meal->toArray(), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Response::json($this->meal->findOrFail($id)->toArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $validator = Validator::make(
            Input::all(),
            array(
                'name' => 'min:5|max:100',
                'nights' => 'integer|min:0'
            )
        );

        if ($validator->fails()) {
            return Response::json(
                array('errors' => $validator->messages()->toArray()),
                400
            );
        }

        $meal = $this->meal->findOrFail($id);

        if (Input::has('name')) {
            $meal->name = Input::get('name');
        }

        if (Input::has('nights')) {
            $meal->nights = Input::get('nights');
        }

        $meal->save();

        return Response::make('', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $meal = $this->meal->findOrFail($id);
        $meal->delete();
        return Response::make('', 204);
    }

}