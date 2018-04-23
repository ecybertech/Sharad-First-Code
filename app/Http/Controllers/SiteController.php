<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;
use App\Http\Resources\Site\SiteResource;
use App\Http\Resources\Wrapperlist\WrapperlistResource;
use App\Http\Requests\SiteRequest;
use App\Site;
use App\User;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
       return  Site::all();
      //return new SiteResource($site);
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
    public function store(SiteRequest $request)
    {
        //dd($request);
    
       $user = User::create([
        'email'=> $request->email,
        'password' => bcrypt($request->password),
        'name' => $request->sitename
      ]);

      $site = Site::create([
        'siteurl' => $request->siteurl,
        'sitename' => $request->sitename,
        'userId'   => $user->id
      ]);
      

       return response([
           'data' => new SiteResource($site)
       ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function show(Site $site)
    {
        //
        return new SiteResource($site);
    }
    public function wrapperlist(Request $request)
    { 
      //  $site = new Site();
     // echo "<pre>";print_r($request->all());exit;
        $site = Site::find($request->site_id);
        $site->wrappers()->detach();
        $site->wrappers()->attach($request->wrapper_list);
        return response([
            'data' => 'successfully'
        ],201);
    }
   public function sitewrappers(Request $request) 
   {
        $site_Id = $request->route('id');
        $site = Site::find($site_Id)->wrappers; 
        $collection = collect($site);
 
  
       
    $response = json_encode(
        $collection,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
    );

return response($response);
   
   }
    public function sitewrapperlist(Request $request)
    {
       $site_Id = $request->route('id');
     //  $site = Site::find($site_Id)->wrappers;
        $site = Site::find($site_Id)->wrappers;
        $geojson = array(
            'data' => array()
            );
     //Response::json(User::all()->toArray())
     // echo "<pre>";print_r($site);exit;
       if(isset($site))
        {
          // echo "<pre>";print_R($site);exit;
           
            $i=0;
            foreach ($site as $wrapper) {
               
              
                $wapperId[]= array(
                      'siteId'=> $site_Id,
                      'wrapperId'=>$wrapper->pivot->wrapperid
                );
               $i++; 
              // array_push($geojson['data'], $wapperId);
            }
         
       
        }
     
    $collection = collect($wapperId);
 
  
    $response = json_encode(
        $collection
    );

return response($response);
   


       // return ;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function updatemarketplace (Request $request){
       
     $marketplace_id = array(
           'marketplace_id'=> $request['marketplace_id']
       );
     Site::find($request['site_id'])->wrappers()->updateExistingPivot($request['id'], $marketplace_id);
     return response([
        'data' => 'successfully'
    ],201);
    }
    public function edit(Site $site)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Site $site)
    {
       //
   
    //  return $request->all();
    }
    public function updatesite(Request $request, Site $site)
    {
       //
       $site = Site::find($request->route('id'));
       return response([
        'data' => $site
      ],201);
           
    }
    public function updatesitesubmit(Request $request)
    {
       //
       
        $site = Site::find($request->site_id); 
        $site->seller_id=$request->seller_id;
        $site->mws_authorize_token=$request->mwsauth;
        $site->save();
        return response([
            'data' => "data save"
          ],201);
           
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Site  $site
     * @return \Illuminate\Http\Response
     */
    public function destroy(Site $site)
    {
      //  
        //
        
        $site->wrappers()->detach();
        $site->users()->delete();
        $site->delete();
        return response(null,204); 
    }
}
