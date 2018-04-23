<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wrapper extends Model
{
    //
    protected $fillable = ['wrappername','wrapperurl'];
    public function sites()
    {
        return $this->belongsToMany('App\Site','site_wrapper','siteid', 'wrapperid')->withTimestamps();
    }
    public function categories()
    {
        return $this->belongsToMany('App\Category','category_wrapper','category_id', 'wrapper_id')->withTimestamps();
    }
}
