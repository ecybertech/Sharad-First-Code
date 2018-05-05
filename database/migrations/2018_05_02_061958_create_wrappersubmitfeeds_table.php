<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWrappersubmitfeedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wrappersubmitfeeds', function (Blueprint $table) {
            $table->increments('id');
            $table->string('feedname');
            $table->integer('site_id');
            $table->integer('wrapper_id');
            $table->longText('amazon_feed_id');
            $table->string('action')->default('Update');
            $table->string('feed_type');
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
        Schema::dropIfExists('wrappersubmitfeeds');
    }
}
