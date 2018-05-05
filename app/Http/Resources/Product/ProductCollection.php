<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\Resource;
use App\Category;
use App\Optiontypegroup;
class ProductCollection extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
       
      // return parent::toArray($request);
    
      $category =  Category::find($this->catgeory_id);
      $optiontypegroup =  Optiontypegroup::find($this->option_type_group);

        return [
            'id'  => $this->id,
            'product_name'=> $this->product_name,
            'product_sku'=> $this->product_sku,
            'brand'=> $this->brand,
            'qty'=> $this->qty,
            'catgeory_name' =>$category->category_name,
            'optiontype_group'=>$optiontypegroup->group_name,
            'department'=>$category->department,
          ]; 
    }
}
