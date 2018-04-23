<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('amazon_order_id');
            $table->integer('store_order_dd');
            $table->integer('store_id');
            $table->dateTime('purchase_date');
            $table->string('amazon_order_status');
            $table->string('fulfillment_channel');
            $table->string('sales_channel');
            $table->string('ship_service_level');
            $table->integer('number_of_items_shipped');
            $table->integer('number_of_items_unshipped');
            $table->string('payment_method');
            $table->string('marketplace_id');
            $table->string('buyer_name');
            $table->string('buyer_email');
            $table->dateTime('earliest_ship_date');
            $table->dateTime('latest_ship_date');
            $table->dateTime('earliest_delivery_date');
            $table->dateTime('latest_delivery_date');
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
        Schema::dropIfExists('orders');
    }
}
