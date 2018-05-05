<?php

namespace App\Http\Resources\Optiontype;

use Illuminate\Http\Resources\Json\Resource;

class OptiontypeResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      //  return parent::toArray($request);
      return [
        'id'  => $this->id,
        'optiontype_name'=> $this->optiontype_name,
        'optiontype_group_id'=> $this->optiontype_group_id,
        'price'=> $this->price,
        'price_type'=> $this->price_type,
        
        
      ];
    }
}
