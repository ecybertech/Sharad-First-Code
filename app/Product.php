<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
   protected $fillable = ['product_name','site_id','product_sku','product_upc','brand','catgeory_id','description','qty','price','currency','meterial','option_type_group',
   'search_term_1','search_term_2','search_term_3','search_term_4','search_term_5','color',
   'fulfillment_latency','bullet_point_1','bullet_point_2','bullet_point_3','bullet_point_4','bullet_point_5',
    'weight','weight_measurment','height','width','length','local_feed_id',
    'image_1','image_2','image_3','image_4','image_5'
   ];
    public function category(){
        return $this->belongsTo('App\Category');
    }
    public function optiontypegroup(){
        return $this->belongsTo('App\Optiontypegroup');
    }
    public function localfeeds(){
        return $this->belongsToMany('App\Localfeed')->withTimestamps();
    }
}
