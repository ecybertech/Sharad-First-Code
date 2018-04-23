<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\Resource;

class CategoryResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'category_name' => $this->category_name,
            'parent_id'=> $this->parent_id,
            'department'=> $this->department,
            'amazon_item_type' => $this->amazon_item_type,
            'amazon_target_audiences' => $this->amazon_target_audiences,
            
        ];
    }
}
