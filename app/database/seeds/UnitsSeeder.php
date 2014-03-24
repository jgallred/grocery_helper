<?php

use \DB;
use \File;

class UnitsSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->delete();

        $units = File::get(__DIR__ . '/units_provider.txt');
        $units = explode("\n", $units);

        $db_units = [];

        foreach ($units as $unit) {
            if (strlen($unit) > 0) {
                $db_units[] = ["name" => trim(strtolower($unit))];
            }
        }

        DB::table('units')->insert($db_units);
    }

}