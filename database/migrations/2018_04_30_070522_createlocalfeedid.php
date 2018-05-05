<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Createlocalfeedid extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   //
        Schema::create('localfeeds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('site_id');
            $table->string('feed_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
