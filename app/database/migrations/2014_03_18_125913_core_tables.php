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
        Schema::create('meals', function ($table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->integer('nights');
        });

        Schema::create('ingredients', function ($table) {
            $table->increments('id');
            $table->integer('meal_id')->unsigned();
            $table->float('size')->unsigned();
            $table->string('unit');
            $table->string('name');

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
        Schema::dropIfExists('ingredients');
        Schema::dropIfExists('meals');
    }

}
