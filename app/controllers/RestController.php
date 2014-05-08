<?php

abstract class RestController extends \BaseController {

    /**
     * @var mixed
     */
    protected $model;

    protected $create_rules = array();

    protected $update_rules = array();

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Response::json($this->model->all());
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
            $this->create_rules
        );

        if ($validator->fails()) {
            return Response::json(
                array('errors' => $validator->messages()->toArray()),
                400
            );
        }

        $model = $this->saveNewResource();

        return Response::json($model, 201);
    }

    /**
     * @return \Illuminate\Support\Contracts\ArrayableInterface
     */
    protected abstract function saveNewResource();

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Response::json($this->model->findOrFail($id));
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
            $this->update_rules
        );

        if ($validator->fails()) {
            return Response::json(
                array('errors' => $validator->messages()->toArray()),
                400
            );
        }

        $model = $this->model->findOrFail($id);

        $this->updateResource($model);

        return Response::make('', 204);
    }

    protected abstract function updateResource(Eloquent &$model);

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $this->model->findOrFail($id)->delete();
        return Response::make('', 204);
    }

}