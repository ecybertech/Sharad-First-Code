<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    //
    
    protected $fillable = ['siteurl','sitename','userId'];
    public function wrappers(){
        //->users()->wherePivot('owner', 1)->get();
        return $this->belongsToMany('App\Wrapper','site_wrapper','siteid', 'wrapperid')->withPivot('marketplace_id');
    }
    
    public function users(){
         return $this->belongsTo('App\User','userId');
    }
    public function categories(){
        return $this->hasMany('App\Category');
    }

}
