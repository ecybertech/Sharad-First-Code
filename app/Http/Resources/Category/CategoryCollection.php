<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\Resource;
use App\Category;
use App\Site;

class CategoryCollection extends Resource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    { 
        $main_cat_name ='';
        $allSitewrappers=array();
        $wrapper_json=array();
      
     
        if($this->parent_id!=0)
         {
            $main_category_name = Category::find($this->parent_id);
            $main_cat_name = $main_category_name->category_name;
         }
         
        $siteWrappers = Site::find($this->site_id)->wrappers;
        $wrappers = Category::find($this->id)->wrappers;
        foreach ($wrappers as $wrapper) {
                
                 $wrapper_json[$wrapper->id]=array(
                 'browse_node' => $wrapper->pivot->browse_node,
                 'category_id' => $wrapper->pivot->category_id
                );
               
             }
         
        foreach($siteWrappers as $siteWrapper)
          {
            $browse_node = "";
            $category_id =""; 
             if(!empty($wrapper_json))
             {
                
               if(isset($wrapper_json[$siteWrapper->id]['browse_node']))  
                 $browse_node =  $wrapper_json[$siteWrapper->id]['browse_node'];

                 if(isset($wrapper_json[$siteWrapper->id]['category_id']))     
                      $category_id =  $wrapper_json[$siteWrapper->id]['category_id'];
             }
            
               $allSitewrappers[$this->id][]=array(
                'wrapper_id'=>$siteWrapper->id,
                'wrapper_name'=>$siteWrapper->wrappername,
                'browse_node' => $browse_node,
                'category_id' => $category_id

               );
          }
    return [
              'id'  => $this->id,
              'category_name'=> $this->category_name,
              'parent_id'=> $this->parent_id,
              'wrapper_list' => $allSitewrappers,
              'main_cat_name'=>$main_cat_name,
              'department'=>$this->department,
              'amazonitemtype'=>$this->amazon_item_type,
              'amazontargetaudience'=>$this->amazon_target_audiences,
            ];
       
      
    }
}
