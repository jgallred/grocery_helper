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

        $units = DB::table('units')->lists('id', 'name');
        $ingredients = DB::table('ingredients')->lists('id', 'name');

        $meals = File::get(__DIR__ . '/meals_provider.json');
        $meals = json_decode($meals);

        $db_meal = [];
        foreach ($meals as $meal) {
            $id = DB::table('meals')->insertGetId(["name" => $meal->name, "nights" => $meal->nights]);

            $components = $meal->ingredients;
            $db_components = [];
            foreach ($components as $component) {
                $db_components[] = [
                    "meal_id" => $id,
                    "size" => $component->size,
                    "unit_id" => $units[$component->unit],
                    "ingredient_id" => $ingredients[$component->name]
                ];
            }
            DB::table('components')->insert($db_components);
        }
    }

}