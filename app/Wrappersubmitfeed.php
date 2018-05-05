<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wrappersubmitfeed extends Model
{
   //
   protected $fillable = ['feedname','site_id','wrapper_id','amazon_feed_id','action','feed_type','message'];

   public function productwrppersubmitfeeds(){
    return $this->belongsTo('App\Productwrappersubmitfeed');
} 
}
