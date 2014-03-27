<?php

class MealSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meals')->delete();

        $meals = File::get(__DIR__ . '/meals_provider.json');
        $meals = json_decode($meals);

        $db_meal = [];
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

}