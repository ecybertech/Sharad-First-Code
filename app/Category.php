<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = ['category_name','parent_id','department','amazon_item_type','amazon_target_audiences','site_id'];
    public function wrappers(){
        return $this->belongsToMany('App\Wrapper','category_wrapper','category_id', 'wrapper_id')->withPivot('browse_node');
    }
    public function site(){
        return $this->belongsTo('App\Site');
    }

    public function optiontypes(){
      return $this->belongsToMany('App\Optiontype','category_optiontype','optiontype_id', 'category_id');
    }
    //each category might have one parent
  public function parent() {
    return $this->belongsTo(static::class, 'parent_id');
  }

  //each category might have multiple children
  public function children() {
    return $this->hasMany(static::class, 'parent_id')->orderBy('category_name', 'asc');
  }

 
   
}
