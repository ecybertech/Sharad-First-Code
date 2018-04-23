<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         //$this->call(UsersTableSeeder::class);
         factory(App\User::class,50)->create();
         factory(App\Site::class,50)->create();
         factory(App\Wrapper::class,50)->create();
        // factory(App\Sitewrapper::class,150)->create();
    }
}
