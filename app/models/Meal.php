<?php

/**
 * Meal
 *
 * @property integer $id
 * @property string $name
 * @property integer $nights
 * @property-read \Illuminate\Database\Eloquent\Collection|\Ingredient[] $ingredients
 * @method static \Illuminate\Database\Query\Builder|\Meal whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\Meal whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\Meal whereNights($value)
 */
class Meal extends Eloquent
{

    public $timestamps = false;

    public function ingredients()
    {
        return $this->hasMany('Ingredient');
    }

}