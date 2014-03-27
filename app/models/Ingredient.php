<?php

/**
 * Ingredient
 *
 * @property integer $id
 * @property integer $meal_id
 * @property float $size
 * @property string $unit
 * @property string $name
 * @property-read \Meal $meal
 * @method static \Illuminate\Database\Query\Builder|\Ingredient whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\Ingredient whereMealId($value)
 * @method static \Illuminate\Database\Query\Builder|\Ingredient whereSize($value)
 * @method static \Illuminate\Database\Query\Builder|\Ingredient whereUnit($value)
 * @method static \Illuminate\Database\Query\Builder|\Ingredient whereName($value)
 */
class Ingredient extends Eloquent
{

    public $timestamps = false;

    public function meal()
    {
        return $this->belongsTo('Meal');
    }

}