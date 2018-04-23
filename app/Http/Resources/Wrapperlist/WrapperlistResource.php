<?php

namespace App\Http\Resources\Wrapperlist;

use Illuminate\Http\Resources\Json\Resource;

class WrapperlistResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'siteId' => $this->siteid,
            'wrapperId'=> $this->wrapperid,
            
        ];
    }
}
