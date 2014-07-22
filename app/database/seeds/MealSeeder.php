<?php

class MealSeeder extends Seeder
{
    const NUMBER_OF_MEALS = 100;

    const MAX_NUM_OF_INGREDIENTS_PER_MEAL = 15;

    const SEED = 77;

    private $allowed_units = ['teaspoon', 'tablespoon', 'cups', 'pounds', 'ounces', 'quarts', 'can', 'bag', 'package'];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meals')->delete();

        $meals = $this->getMealData();

        foreach ($meals as $meal) {
            $id = DB::table('meals')->insertGetId(["name" => $meal->name, "nights" => $meal->nights]);

            $ingredients = $meal->ingredients;
            $db_ingredients = [];
            foreach ($ingredients as $ingredient) {
                $db_ingredients[] = [
                    "meal_id" => $id,
                    "size" => $ingredient->size,
                    "unit" => $ingredient->unit,
                    "name" => $ingredient->name
                ];
            }
            DB::table('ingredients')->insert($db_ingredients);
        }
    }

    public function getMealData()
    {
        $faker = Faker\Factory::create();
        $faker->seed(self::SEED);

        $meals = [];

        for($i = 0; $i < self::NUMBER_OF_MEALS; $i++) {
            $meal = new stdClass();

            $meal->name = $faker->sentence(6);
            $meal->nights = $faker->numberBetween(1,5);
            $meal->ingredients = [];

            $number_of_ingredients = $faker->numberBetween(3, self::MAX_NUM_OF_INGREDIENTS_PER_MEAL);

            for($j = 0; $j < $number_of_ingredients; $j++) {
                $ingredient = new stdClass();

                $ingredient->name = $faker->word;
                $ingredient->size = $faker->randomDigit;
                $ingredient->unit = $faker->randomElement($this->allowed_units);

                $meal->ingredients []= $ingredient;
            }

            $meals []= $meal;
        }

        return $meals;
    }
}