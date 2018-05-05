<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductwrappersubmitfeedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productwrappersubmitfeeds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id');
            $table->integer('feed_id');
            $table->string('localstatus');
            $table->string('amazonstatus');
            $table->longText('message');
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
        Schema::dropIfExists('productwrappersubmitfeeds');
    }
}
