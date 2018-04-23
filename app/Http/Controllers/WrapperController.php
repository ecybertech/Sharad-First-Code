<?php

namespace App\Http\Controllers;
use App\Http\Resources\Wrapper\WrapperResource;
use App\Http\Requests\WrapperRequest;
use App\Wrapper;
use Illuminate\Http\Request;

class WrapperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return  Wrapper::all();
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
    public function store(WrapperRequest $request)
    {
        //

        $wrapper = Wrapper::create([
            'wrapperurl' => $request->wrapperurl,
            'wrappername' => $request->wrappername,
            
          ]);
          
    
           return response([
               'data' => new WrapperResource($wrapper)
           ],201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Wrapper  $wrapper
     * @return \Illuminate\Http\Response
     */
    public function show(Wrapper $wrapper)
    {
        //
        return new WrapperResource($wrapper);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Wrapper  $wrapper
     * @return \Illuminate\Http\Response
     */
    public function edit(Wrapper $wrapper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Wrapper  $wrapper
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Wrapper $wrapper)
    {
        //
        $wrapper->update($request->all());
        return response(null,201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Wrapper  $wrapper
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wrapper $wrapper)
    {
        //
        $wrapper->delete();
        return response(null,204); 
    }
}
