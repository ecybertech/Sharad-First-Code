<?php

use Illuminate\Http\Request;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/sites','SiteController')->middleware('auth:api');
Route::apiResource('/categories','CategoryController')->middleware('auth:api');
Route::apiResource('/optiontype','OptiontypeController')->middleware('auth:api');
Route::apiResource('/optiontypegroup','OptiontypegroupController')->middleware('auth:api');
Route::get('/optiontypegroup/sitewisegrouptype/{id}', 'OptiontypegroupController@sitewisegrouptype')->middleware('auth:api');
Route::get('/optiontype/sitewiseoptiontype/{id}', 'OptiontypeController@sitewiseoptiontype')->middleware('auth:api');

/*Route::group(['prefix'=>'sites'],function(){
    Route::apiResource('/{site}/wrapperlist','SiteController');
}); */
Route::apiResource('/wrappers','WrapperController')->middleware('auth:api');
Route::post('login', 'PassportController@login');
Route::post('/sites/wrapperlist', 'SiteController@wrapperlist')->middleware('auth:api');
Route::get('/sites/sitewrapperlist/{id}', 'SiteController@sitewrapperlist')->middleware('auth:api'); 
Route::get('/sites/sitewrappers/{id}', 'SiteController@sitewrappers')->middleware('auth:api'); 
Route::post('/sites/updatemarketplace', 'SiteController@updatemarketplace')->middleware('auth:api');
Route::get('/sites/updatesite/{id}', 'SiteController@updatesite')->middleware('auth:api');
Route::post('/sites/updatesitesubmit', 'SiteController@updatesitesubmit')->middleware('auth:api');
Route::apiResource('/orders','OrderController')->middleware('auth:api');
Route::apiResource('/products','ProductController')->middleware('auth:api');
Route::post('/products/submitxls','ProductController@submitxls')->middleware('auth:api');
Route::get('/categories/sitecategories/{id}', 'CategoryController@sitecategorylist')->middleware('auth:api');
Route::get('/products/siteproducts/{id}', 'ProductController@siteproducts')->middleware('auth:api');
Route::get('/categories/categoryList/{id}', 'CategoryController@categoryList')->middleware('auth:api');
