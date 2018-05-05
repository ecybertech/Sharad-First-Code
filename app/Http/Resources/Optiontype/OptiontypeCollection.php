<?php

namespace App\Http\Resources\Optiontype;

use Illuminate\Http\Resources\Json\Resource;
use App\Optiontype;
use App\Optiontypegroup;


class OptiontypeCollection extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
       
      
      
      //  return parent::toArray($request);
     
       $optiontypeGroup =   Optiontypegroup::find($this->optiontype_group_id);
      
       $categoriesList = Optiontype::find($this->id)->categories;
       $categoriesList_option =array();
       if(isset($categoriesList))
         {
          
              $categoriesList_option=  $categoriesList;
          
           
         }
       return [
        'id'  => $this->id,
        'optiontype_name'=> $this->optiontype_name,
        'optiontype_group_id'=> $this->optiontype_group_id,
        'optiontypegroup_name' => $optiontypeGroup->group_name,
        'price' => $this->price,
        'price_type' => $this->price_type,
        'category_list' =>  $categoriesList_option
        
      ];
      
    }
}
