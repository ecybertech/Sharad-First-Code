<?php

namespace App\Http\Controllers;
use App\Http\Resources\Optiontypegroup\OptiontypegroupResources;
use App\Http\Resources\Optiontypegroup\OptiontypegroupCollection;
use Illuminate\Support\Collection;
use App\Http\Requests\OptiontypegroupRequest;
use App\Optiontypegroup;
use App\Optiontype;

use Illuminate\Http\Request;
class OptiontypegroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $optionList =  Optiontypegroup::all();

        return response([
            'data' => $optionList
          ],201);
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
   public function sitewisegrouptype($id)
   {
     $optiontypeGroup =  Optiontypegroup::where('site_id', '=', $id)->get();
     return response([
        'data' => new OptiontypegroupResources($optiontypeGroup)
    ],201);
   } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OptiontypegroupRequest $request)
    {
      
        //
        $optiontypegroup = Optiontypegroup::create([
            'group_name' => $request->group_name,
            'site_id' => $request->site_id,
            'parent_id' => $request->parent_id,
          ]);
      
        return response([
            'data' => new OptiontypegroupResources($optiontypegroup)
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Optiontypegroup $optiontypegroup)
    {
        //
        return new OptiontypegroupResources($optiontypegroup);
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
    //public function update(OptiontypegroupRequest $request,Optiontypegroup $optiontypegroup)
    public function update(Request $request, $id)
    {
        //
       // $optiontypegroup->update($request->all());
       $optiontype = Optiontypegroup::find($id); 
       $optiontype->group_name = $request->group_name;
       $optiontype->site_id = $request->site_id;
       $optiontype->parent_id = $request->parent_id;
       
       $optiontype->save();
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
        
        

        //$optiontypecolllect  = Optiontype::find(3); 
        
        $optiontype  = Optiontype::where('optiontype_group_id', '=', $id)->get();
        if(isset($optiontype[0]))
        {
            $optiontype[0]->categories()->detach();
            $optiontype[0]->delete();
        }

        $optiontypegroup = Optiontypegroup::find($id);
        $optiontypegroup->delete();
        return response(null,204); 
    }
}
