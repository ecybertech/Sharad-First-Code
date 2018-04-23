<?php

use Faker\Generator as Faker;
use App\User;

$factory->define(App\Site::class, function (Faker $faker) {
    return [
        //
        'sitename' => $faker->name,
        'siteurl'  => $faker->url,
        'userId'   => function(){
            return User::all()->random();
        }
    ];
});
