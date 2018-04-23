<?php

namespace App\Http\Resources\Wrapper;

use Illuminate\Http\Resources\Json\ResourceCollection;

class WrapperCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
