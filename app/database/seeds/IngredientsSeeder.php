<?php

use \DB;
use \File;

class IngredientsSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredients')->delete();

        $ingredients = File::get(__DIR__ . '/ingredients_provider.txt');
        $ingredients = explode("\n", $ingredients);

        $db_ingredients = [];

        foreach ($ingredients as $ingredient) {
            if (strlen($ingredient) > 0) {
                $db_ingredients[] = ["name" => trim(strtolower($ingredient))];
            }
        }

        DB::table('ingredients')->insert($db_ingredients);
    }

}