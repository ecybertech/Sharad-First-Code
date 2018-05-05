<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;
use App\Http\Resources\Optiontype\OptiontypeResource;
use App\Http\Resources\Optiontype\OptiontypeCollection;
use App\Http\Requests\OptiontypeRequest;
use App\Optiontype;
use Illuminate\Http\Request;

class OptiontypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $optionList =  Optiontype::all();
        
        return  OptiontypeCollection::collection(Optiontype::all());
    }
    public function sitewiseoptiontype($id)
    {
      
      $optiontype =  Optiontype::where('site_id', '=', $id)->orderBy('id','desc')->get();
    
      return  OptiontypeCollection::collection($optiontype);
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
    public function store(OptiontypeRequest $request)
    {
        //
        
        $optiontype = Optiontype::create([
            'optiontype_group_id'=>$request->optiontype_group_id,
            'optiontype_name' => $request->optiontype_name,
            'site_id'=> $request->site_id,
            'price'=> $request->price,
            'price_type'=> $request->price_type,
          ]);
          
       // $category_wrapper_brwose_node=
      
       $category_list = $request->category_list;
        $ij=0;
         foreach($category_list as $key => $categoryId_val)
         {
            if($categoryId_val!='') 
             {
               $categoryIdArray[$ij]=$categoryId_val;
               $ij++;
             }
         }
     

        $optiontype->categories()->sync($categoryIdArray); 
         

        return response([
               'data' => new OptiontypeResource($optiontype)
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
       // return  OptiontypeCollection::collection(Optiontype::find($id));
        return  OptiontypeCollection::collection(Optiontype::where('id', '=', $id)->get());
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
        //
        
        $optiontype = Optiontype::find($id); 
        $optiontype->optiontype_name = $request->optiontype_name;
        $optiontype->optiontype_group_id = $request->optiontype_group_id;
        $optiontype->site_id  = $request->site_id;
        $optiontype->price    = $request->price;
        $optiontype->price_type = $request->price_type;
        
        $optiontype->save();

        $category_list = $request->category_list;
        $ij=0;
         foreach($category_list as $key => $categoryId_val)
         {
            if($categoryId_val!='') 
             {
               $categoryIdArray[$ij]=$categoryId_val;
               $ij++;
             }
         }
        
       $optiontype->categories()->sync($categoryIdArray);

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
        //
        $optiontype = Optiontype::find($id); 
        $optiontype->categories()->detach();
        $optiontype->delete();
        return response(null,204); 
    }
}
