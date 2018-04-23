<?php

use Faker\Generator as Faker;
use App\Site;
use App\Wrapper;

$factory->define(App\Sitewrapper::class, function (Faker $faker) {
    return [
        //
        'siteid' => function(){
            return Site::all()->random();
        },
        'wrapperid'  => function(){
            return Wrapper::all()->random();
        }
        
    ];
});
