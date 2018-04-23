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
            $table->string('product_name');
            $table->string('action');
            $table->string('product_sku');
            $table->string('product_upc');
            $table->integer('qty');
            $table->integer('option_type_group');
            $table->string('brand');
            $table->text('description');
            $table->integer('catgeory_id');
            $table->integer('color');
            $table->integer('fulfillment_latency');
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
