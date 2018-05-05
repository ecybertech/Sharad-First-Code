<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('site_id');
            $table->string('product_name');
            $table->string('action')->default('Update');
            $table->string('product_sku');
            $table->string('product_upc');
            $table->integer('qty');
            $table->integer('option_type_group');
            $table->string('brand');
            $table->text('description');
            $table->integer('catgeory_id');
            $table->string('color');
            $table->integer('fulfillment_latency');
            $table->string('search_term_1');
            $table->string('search_term_2');
            $table->string('search_term_3');
            $table->string('search_term_4');
            $table->string('search_term_5');
            $table->text('bullet_point_1');
            $table->text('bullet_point_2');
            $table->text('bullet_point_3');
            $table->text('bullet_point_4');
            $table->text('bullet_point_5');
            $table->string('image_1');
            $table->string('image_2');
            $table->string('image_3');
            $table->string('image_4');
            $table->string('image_5');
            $table->string('weight');
            $table->string('weight_measurment');
            $table->string('height');
            $table->string('width');
            $table->string('length');
            $table->string('price');
            $table->string('currency');
            $table->string('meterial');
            $table->integer('local_feed_id');
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
        Schema::dropIfExists('products');
    }
}
