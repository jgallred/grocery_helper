<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CoreTables extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('units', function ($table) {
            $table->increments('id')->unsigned();
            $table->string('name', 50);
        });

        Schema::create('ingredients', function ($table) {
            $table->increments('id')->unsigned();
            $table->string('name');
        });

        Schema::create('meals', function ($table) {
            $table->increments('id')->unsigned();
            $table->string('name', 100);
            $table->integer('nights');
        });

        Schema::create('components', function ($table) {
            $table->increments('id')->unsigned();
            $table->integer('size')->unsigned();
            $table->integer('unit_id')->unsigned();
            $table->integer('ingredient_id')->unsigned();
            $table->integer('meal_id')->unsigned();

            $table->foreign('unit_id')
             ->references('id')->on('units')
             ->onDelete('cascade');

            $table->foreign('ingredient_id')
             ->references('id')->on('ingredients')
             ->onDelete('cascade');

            $table->foreign('meal_id')
              ->references('id')->on('meals')
              ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('components');
        Schema::dropIfExists('meals');
        Schema::dropIfExists('units');
        Schema::dropIfExists('ingredients');
    }

}
