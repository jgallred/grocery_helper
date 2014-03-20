<?php

class Meal extends Eloquent
{

    public function components()
    {
        return $this->hasMany('Component');
    }

}