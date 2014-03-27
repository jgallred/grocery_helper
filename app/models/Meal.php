<?php

class Meal extends Eloquent
{

    public function ingredients()
    {
        return $this->hasMany('Ingredient');
    }

}