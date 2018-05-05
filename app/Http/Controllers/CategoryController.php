<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;
use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Requests\CategoryRequest;
use App\Category;

use Illuminate\Http\Request;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        
     
      
     /* 
       return response([
        'data' => new CategoryResource()
    ],201);*/
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        //  
       
        $wrapperList = $request->wrapper_list;
        
        foreach($wrapperList as $key => $browseNodeVal)
           {
              if($browseNodeVal!='') 
               {$browseNodeArray[$key]=array('browse_node'=>$browseNodeVal);}
           }
 

        $category = Category::create([
            'site_id'=>$request->site_id,
            'category_name' => $request->category_name,
            'parent_id' => $request->parent_id,
            'department'   => $request->department,
            'amazon_item_type'=> $request->amazon_item_type,
            'amazon_target_audiences'=> $request->amazon_target_audiences,
           
          ]);
          
       // $category_wrapper_brwose_node=
      
      if(isset($browseNodeArray))
       { $category->wrappers()->sync($browseNodeArray); }
           /*
            wrapper_list
            [wrapper_id=>['browse_node']=>'35']
            "Amazon_us" ="ID" ==Wrapper ID
            [
                1 => ['browse_node' => $browsenode_id],
                2 => ['browse_node' => $browsenode_id]
            ]
           */

       
       //$user->roles()->sync([1 => ['expires' => true], 2, 3]);

        return response([
               'data' => new CategoryResource($category)
           ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        //return  CategoryCollection::collection(Category::find($id));
        return  CategoryCollection::collection(Category::where('id', '=', $id)->get());
    }
    function makeNested($source) {
        $nested = array();
    
        foreach ( $source as &$s ) {
            if ( is_null($s['parent_id']) ) {
                // no parent_id so we put it in the root of the array
                $nested[] = &$s;
            }
            else {
                $pid = $s['parent_id'];
                if ( isset($source[$pid]) ) {
                  
                    // If the parent ID exists in the source array
                    // we add it to the 'children' array of the parent after initializing it.
    
                    if ( !isset($source[$pid]['children']) ) {
                        $source[$pid]['children'] = array();
                    }
    
                    $source[$pid]['children'][] = &$s;
                }
            }
        }
        return $nested;
    }
    public function categoryList($id)
     {
        $categoryList=array();
       // $group =  Category::with('children','parent')->where('site_id', '=', $id)->get();
        $categories = Category::where('site_id', '=', $id)->get();
       foreach($categories as $category)
          {
             $category_id=null;
              if($category->parent_id)
                 {
                      $category_id=$category->parent_id;
                 }
           /*
            $categoryList[$category->id]=array(
                'category_name'=>$category->category_name,
                'id'=>$category->id,
                'parent_id' => $category_id
               );
            */
            $categoryList[]=array(
                'category_name'=>$category->category_name,
                'id'=>$category->id,
                'parent_id' => $category_id
               );
          }
       $nested = $this->makeNested( $categoryList);
     //   echo "<pre>";print_r($nested);
        return response([
            'data' => $categoryList
          ],201);
        //return  CategoryCollection::collection($group);
     }
    public function sitecategorylist($id)
    {
        //
        //$group = $this->group->with('children', 'parent')->find(1);
        
        // $group =  Category::with('children', 'parent')->where('site_id', '=', $id)->get();
       /*Adding Parent child relationship */

       


        return  CategoryCollection::collection(Category::where('site_id', '=', $id)->get());
        
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
       
        $category = Category::find($id); 
        $category->category_name = $request->category_name;
        $category->parent_id = $request->parent_id;
        $category->department  = $request->department;
        $category->amazon_item_type = $request->amazon_item_type;
        $category->amazon_target_audiences= $request->amazon_target_audiences;
        $category->save();
        $wrapperList = $request->wrapper_list;
       
        foreach($wrapperList as $key => $browseNodeVal)
            {
               if($browseNodeVal!='') 
               {$browseNodeArray[$key]=array('browse_node'=>$browseNodeVal);}    
            }
      if(isset($browseNodeArray))
        {  $category->wrappers()->sync($browseNodeArray);}

        return response(null,201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       
        $list_category = Category::where('parent_id', '=', $id)->get();
        if(isset($list_category))
        {
            foreach($list_category as $list_category_second)
            {
                $list_category_second->wrappers()->detach();
                $list_category_second->delete();
            }
        }
        $category = Category::find($id); 
        $category->wrappers()->detach();
        $category->delete();
        return response(null,204); 
    }
}
