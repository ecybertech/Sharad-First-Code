<?php

namespace App\Http\Resources\Wrapper;

use Illuminate\Http\Resources\Json\Resource;

class WrapperResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
       // return parent::toArray($request);
       return [
        'wrapper_name' => $this->wrappername,
        'wrapper_url'=> $this->wrapperurl,
        'wrapper_id' => $this->id,
        'currency' => $this->currency,
    ];
    }
}
