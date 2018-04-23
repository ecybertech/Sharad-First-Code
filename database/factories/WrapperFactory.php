<?php

use Faker\Generator as Faker;

$factory->define(App\Wrapper::class, function (Faker $faker) {
    return [
        //
        'wrappername' => $faker->name,
        'wrapperurl'  => $faker->url
         
    ];
});
