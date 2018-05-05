<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Optiontype extends Model
{
    protected $fillable = ['optiontype_group_id','optiontype_name','site_id','price','price_type'];
    //
    public function categories(){
        return $this->belongsToMany('App\Category','category_optiontype','optiontype_id', 'category_id');
      }
      public function optiontypegroup(){
        return $this->belongsTo('App\Optiontypegroup');
    }  
}
