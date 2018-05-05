<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Optiontypegroup extends Model
{
    //
    protected $fillable = ['group_name','site_id','parent_id'];
    public function optiontypes(){
        return $this->belongsTo('App\Optiontype');
    }  
}
