<?php

class Component extends Eloquent
{

    public function meal()
    {
        return $this->belongsTo('Meal');
    }

    public function unit()
    {
        return $this->hasOne('Unit');
    }

    public function ingredient()
    {
        return $this->hasOne('Ingredient');
    }

}