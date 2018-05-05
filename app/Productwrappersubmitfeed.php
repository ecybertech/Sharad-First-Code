<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productwrappersubmitfeed extends Model
{
    //
    protected $fillable = ['product_id','feed_id','localstatus','amazonstatus','message'];
}
