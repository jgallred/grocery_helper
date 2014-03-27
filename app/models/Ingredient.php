<?php

class Ingredient extends Eloquent
{

    public function meal()
    {
        return $this->belongsTo('Meal');
    }

}