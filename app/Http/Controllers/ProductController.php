<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;

use Illuminate\Http\Request;
use Sonnenglas\AmazonMws\AmazonFeed;
use Sonnenglas\AmazonMws\AmazonFeedlist;
use Sonnenglas\AmazonMws\AmazonFeedResult;
use App\Localfeed;
use App\Wrapper;
use App\Http\Resources\Product\ProductResource;
use App\Http\Resources\Product\ProductCollection;
use App\Product;
use App\Category;
use App\Optiontypegroup;
use App\Optiontype;
use App\Productwrappersubmitfeed;
use App\Wrappersubmitfeed;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $feedId="62083017637";//50001017633,50002017633,50003017633,50004017633,50005017633
        //inmonarch uk =62077017634
        //
    
        $amz=new AmazonFeedResult("Inmonarch_Wrapper", $feedId); //feed ID can be quickly set by passing it to the constructor
        $amz->setFeedId($feedId); //otherwise, it must be set this way
        $amz->fetchFeedResult();
         
        echo "<pre>";print_r($amz->getRawFeed());
         /*
        $amz=new AmazonFeedList("Inmonarch_Wrapper");
        $amz->setTimeLimits('- 24 hours'); //limit time frame for feeds to any updated since the given time
        $amz->setFeedStatuses(array("_SUBMITTED_", "_IN_PROGRESS_", "_DONE_")); //exclude cancelled feeds
        $amz->fetchFeedSubmissions(); //this is what actually sends the request
         echo "<pre>";print_r($amz->getFeedList()); */
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
    public function siteproducts($id)
    { 
      return  ProductCollection::collection(Product::where('site_id', '=', $id)->get());
     
    }
    public function submitxls(Request $request)
    {
       $allProducts = $request->submitdata;
       $productValueArray=[];
       $errorProductName=[];
      
       $localfeed = Localfeed::create([
        'site_id'=>$request->site_id,
        'feed_name'=>''
      ]);


      $Localfeed = Localfeed::find($localfeed->id); 
      $Localfeed->feed_name = "Inmonarch - 10001".$localfeed->id;
      $Localfeed->save();
      
      //"SQLSTATE[22001]: String data, right truncated: 1406 Data too long for column 'bullet_point_1' at row 1 (SQL: insert into `products` (`product_name`, `product_sku`, `description`, `qty`, `price`, `currency`, `meterial`, `option_type_group`, `search_term_1`, `search_term_2`, `search_term_3`, `search_term_4`, `search_term_5`, `fulfillment_latency`, `bullet_point_1`, `bullet_point_2`, `bullet_point_3`, `bullet_point_4`, `bullet_point_5`, `weight`, `weight_measurment`, `height`, `width`, `length`, `local_feed_id`, `updated_at`, `created_at`) values (tuxedo name, TX280-excel, Fabulous 1 button tuxedo suit- 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) made from silver color pure polyester fabric. It has bottom as trouser. If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. When selecting the size of your outfit, please note that the waistline measurement of the accompanying pants will be 6 inches less than the jacket size you indicate. For example: A size 42 Long jacket will come with a size 36 waist trouser. If you prefer a different pant size, please select the Tailor Made/Custom Made option and we will be happy to make your outfit to the exact specifications that you need. All outfits come in standard US sizes. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches., 4, 2760, USD, 100% Polyester, 7, search_term_1-TX280, , , , , 5, If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches., Silver color pure polyester fabric. Bottom as trouser., Sold as a \"Suits\" with a 6\" drop (ie. 42R Long Jacket comes with 36 Waist). Suits listed in US sizes., Estimated delivery time 11 to 15 calender days after receiving cleared payment., 1 Button Tuxedo - 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) Made in India. Dryclean only., , Kg, , , , 1, 2018-05-01 04:50:27, 2018-05-01 04:50:27))",


       foreach($allProducts as $key => $value)
        {
              if(isset($value['category']))
              {
              
                $categories       =   Category::where('category_name', '=', trim($value['category']))->get();
                $optiontype_group =   Optiontypegroup::where('group_name', '=', trim($value['optiontype_group']))->get();
                $searchTerm1=''; $searchTerm2='';$searchTerm3='';$searchTerm4='';$searchTerm5='';
                $bullet_point_1=''; $bullet_point_2='';$bullet_point_3='';$bullet_point_4='';$bullet_point_5='';
                $weight='';$weight_measurment='';$height='';$width='';$length='';
                $product_upc=''; $color='';
                $image_1='';$image_2='';$image_3='';$image_4='';$image_5='';
          //    echo "<pre>";print_r($optiontype_group[0]->id);exit;
               if(isset($value['color']))
                 {$color=$value['color'];}
           
                if(isset($value['weight_measurment']))
                {$weight_measurment=$value['weight_measurment']; }
               if(isset($value['item_weight']))
                 {$weight=trim($value['item_weight']);}
               if(isset($value['height']))
                  {$height=trim($value['height']);} 
                if(isset($value['width']))
                  {$width=trim($value['width']);} 
                if(isset($value['length']))
                  {$width=trim($value['length']);} 
      
      
                if(isset($value['search_term_1']))
                 {$searchTerm1=$value['search_term_1'];}
                if(isset($value['search_term_2']))
                 {$searchTerm2=$value['search_terms_2'];}
               if(isset($value['search_term_3']))
                 {$searchTerm3=$value['search_terms_3'];}
               if(isset($value['search_term_4']))
                 {$searchTerm4=$value['search_terms_4'];}
               if(isset($value['search_term_5']))
                 {$searchTerm5=$value['search_terms_5'];}
                
               if(isset($value['bullet_point_1']))
                 {$bullet_point_1=$value['bullet_point_1'];}
                if(isset($value['bullet_point_2']))
                 {$bullet_point_2=$value['bullet_point_2'];}
               if(isset($value['bullet_point_3']))
                 {$bullet_point_3=$value['bullet_point_3'];}
               if(isset($value['bullet_point_4']))
                 {$bullet_point_4=$value['bullet_point_4'];}
               if(isset($value['bullet_point_5']))
                 {$bullet_point_5=$value['bullet_point_5'];}
               

                 if(isset($value['image_1']))
                 {$image_1=$value['image_1'];}
                if(isset($value['image_2']))
                 {$image_2=$value['image_2'];}
               if(isset($value['image_3']))
                 {$image_3=$value['image_3'];}
               if(isset($value['image_4']))
                 {$image_4=$value['image_4'];}
               if(isset($value['image_5']))
                 {$image_5=$value['image_5'];}


      
                if(isset($optiontype_group[0]->id) && ($value['item_sku']!='')) 
                {
                  $prouctdeatils       =   Product::where('product_sku', '=', $value['item_sku'])->get();
                  if(!isset($prouctdeatils[0]->id))
                     {
                    
                      $products = Product::create([
                        'site_id'=>$request->site_id,
                        'product_name' => $value['item_name'],
                        'product_sku' => $value['item_sku'],
                        'brand' => $value['brand_name'],
                        'product_upc'=> $product_upc,
                        'catgeory_id'=>$categories[0]->id,
                        'description'=>$value['description'],
                        'qty'=>$value['quantity'],
                        'price'=>$value['price'],
                        'currency'=>$value['currency'],
                        'meterial'=>$value['material_composition'], 
                        'option_type_group'=>$optiontype_group[0]->id, 
                        'search_term_1'=>$searchTerm1,
                        'search_term_2'=>$searchTerm2,
                        'search_term_3'=>$searchTerm3,
                        'search_term_4'=>$searchTerm4,
                        'search_term_5'=>$searchTerm5,
                        'fulfillment_latency'=>$value['fulliment_latcency'],
                        'bullet_point_1'=>$bullet_point_1,
                        'bullet_point_2'=>$bullet_point_2,
                        'bullet_point_3'=>$bullet_point_3,
                        'bullet_point_4'=>$bullet_point_4,
                        'bullet_point_5'=>$bullet_point_5,
                        'image_1'=>$image_1,
                        'image_2'=>$image_2,
                        'image_3'=>$image_3,
                        'image_4'=>$image_4,
                        'image_5'=>$image_5,
                        'weight'=>$weight,
                        'weight_measurment'=>$weight_measurment,
                        'height'=>$height,
                        'width'=>$width,
                        'length'=>$length,
                        'local_feed_id' => $localfeed->id,
                        'color'=>$color
                      ]);
                      $browseNodeArray =array(
                        'product_id'=>$products->id,
                        'localfeed_id'=>$localfeed->id
                      );
                      $products->localfeeds()->sync($browseNodeArray);
                     }
                     else
                     {
                     // $category = Category::find($prouctdeatils->id); 
                     $prouctdeatils_get       =   Product::find($prouctdeatils[0]->id); 
                     $prouctdeatils_get->site_id= $request->site_id;
                     $prouctdeatils_get->product_name =  $value['item_name'];
                     $prouctdeatils_get->product_sku =  $value['item_sku'];
                     $prouctdeatils_get->product_upc =  $product_upc;
                     $prouctdeatils_get->brand =  $value['brand_name'];
                     $prouctdeatils_get->catgeory_id =  $categories[0]->id;
                     $prouctdeatils_get->description =  $value['description'];
                     $prouctdeatils_get->color =  $color;
                     $prouctdeatils_get->qty =  $value['quantity'];
                     $prouctdeatils_get->price =  $value['price'];
                     $prouctdeatils_get->currency =  $value['currency'];
                     $prouctdeatils_get->meterial =  $value['material_composition'];
                     $prouctdeatils_get->option_type_group =  $optiontype_group[0]->id;
                     $prouctdeatils_get->search_term_1 =  $searchTerm1;
                     $prouctdeatils_get->search_term_2 =  $searchTerm2;
                     $prouctdeatils_get->search_term_3 =  $searchTerm3;
                     $prouctdeatils_get->search_term_4 =  $searchTerm4;
                     $prouctdeatils_get->search_term_5 =  $searchTerm5;
                     $prouctdeatils_get->fulfillment_latency =  $value['fulliment_latcency'];
                     $prouctdeatils_get->bullet_point_1= $bullet_point_1;
                     $prouctdeatils_get->bullet_point_2= $bullet_point_2;
                     $prouctdeatils_get->bullet_point_3= $bullet_point_3;
                     $prouctdeatils_get->bullet_point_4= $bullet_point_4;
                     $prouctdeatils_get->bullet_point_5= $bullet_point_5;
                     $prouctdeatils_get->weight = $weight;
                     $prouctdeatils_get->weight_measurment = $weight_measurment;
                     $prouctdeatils_get->height= $height;
                     $prouctdeatils_get->width= $width;
                     $prouctdeatils_get->length= $length;
                     $prouctdeatils_get->image_1= $image_1;
                     $prouctdeatils_get->image_2= $image_2;
                     $prouctdeatils_get->image_3= $image_3;
                     $prouctdeatils_get->image_4= $image_4;
                     $prouctdeatils_get->image_5= $image_5;
                     $prouctdeatils_get->save();

                        $browseNodeArray =array(
                          'product_id'=>$prouctdeatils_get->id,
                          'localfeed_id'=>$localfeed->id
                        );
                        $prouctdeatils_get->localfeeds()->sync($browseNodeArray);
                    }
                    

                 }
          
                
           
           }
          
        } 
       
      

    // return $request->all();
    
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
public function store(Request $request)
  {
    //echo "<pre>";print_r($request->all());
    // $request->wrappers;// You will get all the wrapper which is listed with it
   if(isset($request->wrappers))
    {
      foreach($request->wrappers as $key => $wrapperId)
       {
      
        
       
         $WrapperSubmit = Wrappersubmitfeed::create([
          'site_id'=>$request->siteId,
          'wrapper_id'=>$wrapperId,
          'amazon_feed_id'=>'',
           'message'=>'',
          'feed_type'=>'_POST_PRODUCT_DATA_',
          'feedname'=>''
          
        ]);
      
      
      
  
       $mainFeed="";
       $messageKey=1;
       $subProduct=2;
       foreach($request->productId as $productkey => $ProductId)
        {
          
       $productFeeds="";
           $products =  Product::find($ProductId);
           
           $sku=$products->product_sku;
           $prd_name=$products->product_name;
           $brand=$products->brand;
           $color=$products->color;
           $description=$products->description;
           $fulfillment_latency=$products->fulfillment_latency;
           $category_id=$products->catgeory_id;
           $group_id=$products->option_type_group;
           
           $bullet_point_1_string =''; $bullet_point_2_string =''; $bullet_point_3_string ='';
           $bullet_point_4_string =''; $bullet_point_5_string ='';

           $search_term_1_string =''; $search_term_2_string =''; $search_term_3_string ='';
           $search_term_4_string =''; $search_term_5_string ='';


           $bullet_point_1=$products->bullet_point_1;
           $bullet_point_2=$products->bullet_point_2;
           $bullet_point_3=$products->bullet_point_3;
           $bullet_point_4=$products->bullet_point_4;
           $bullet_point_5=$products->bullet_point_5;
           
           $shippingWeight=""; $itemWeight="";

           
           if($products->weight!='')
            { 
             // $shippingWeight = "<ShippingWeight type='".$products->weight_measurment."'>".$products->weight."</ShippingWeight>";
             // $itemWeight = "<ItemWeight type='".$products->weight_measurment."'>".$products->weight."</ItemWeight>";
            }

            if($bullet_point_1!='')
              { $bullet_point_1_string ='<BulletPoint>'.$bullet_point_1.'</BulletPoint>'; }
            
            if($bullet_point_2!='')
              { $bullet_point_2_string ='<BulletPoint>'.$bullet_point_2.'</BulletPoint>'; }

            if($bullet_point_3!='')
              { $bullet_point_3_string ='<BulletPoint>'.$bullet_point_3.'</BulletPoint>'; }  

            if($bullet_point_4!='')
              { $bullet_point_4_string ='<BulletPoint>'.$bullet_point_4.'</BulletPoint>'; }
            
            if($bullet_point_5!='')
              { $bullet_point_5_string ='<BulletPoint>'.$bullet_point_5.'</BulletPoint>'; }  

           $search_term_1=$products->search_term_1;
           $search_term_2=$products->search_term_2;
           $search_term_3=$products->search_term_3;
           $search_term_4=$products->search_term_4;
           $search_term_5=$products->search_term_5;
          
           
           if($search_term_1!='')
           { $search_term_1_string ='<SearchTerms>'.$search_term_1.'</SearchTerms>'; }
         
         if($search_term_2!='')
           { $search_term_2_string ='<SearchTerms>'.$search_term_2.'</SearchTerms>'; }

         if($search_term_3!='')
           { $search_term_3_string ='<SearchTerms>'.$search_term_3.'</SearchTerms>'; }  

         if($search_term_4!='')
           { $search_term_4_string ='<SearchTerms>'.$search_term_4.'</SearchTerms>'; }
         
         if($search_term_5!='')
           { $search_term_5_string ='<SearchTerms>'.$search_term_5.'</SearchTerms>'; } 
         
           $categories       =   Category::find($category_id);
          // $optiontype_group =   Optiontype::find($group_id);
          $amazon_target_audiences =  $categories->amazon_target_audiences;
          $title = $brand." ".strtoupper($categories->department)." ".strtoupper($color)." ".strtoupper($prd_name)." ".$sku;

          $brwoserNodesId =    $categories->wrappers()->where('wrapper_id', '=', $wrapperId)->get();
          $browserNodeId =   $brwoserNodesId[0]->pivot->browse_node;
         
          $optiontypes=   Optiontype::where('optiontype_group_id', '=', $group_id)->get();
          
         
          $variationData="";     
          if(isset($optiontypes))
            {
              $variationData="
              <VariationData>
                  <Parentage>parent</Parentage>
                  <VariationTheme>SizeColor</VariationTheme>
               </VariationData>
           ";
            }
          
            $productFeeds="
            <Message>
              <MessageID>".$messageKey."</MessageID>
              <OperationType>Update</OperationType>
              <Product>
                <SKU>".$sku."</SKU>
                <DescriptionData>
                  <Title>".$title."</Title>
                  <Brand>".$brand."</Brand>
                  <Description>".$description."</Description>
                   ".$bullet_point_1_string."
                   ".$bullet_point_2_string."
                   ".$bullet_point_3_string."
                   ".$bullet_point_4_string."
                   ".$bullet_point_5_string."
                  <Manufacturer>$brand</Manufacturer>
                  <MfrPartNumber>".$sku."</MfrPartNumber>
                  ".$search_term_1_string."
                  ".$search_term_2_string."
                  ".$search_term_3_string."
                  ".$search_term_4_string."
                  ".$search_term_5_string."
                  <ItemType>".$categories->amazon_item_type."</ItemType>
                 <RecommendedBrowseNode>".$browserNodeId."</RecommendedBrowseNode>
                </DescriptionData>
                <ProductData>
                 <Clothing>
                  ".$variationData."
                  <ClassificationData>
                   <ClothingType>Blazer</ClothingType> 
                   <Department>".$categories->department."</Department>
                  </ClassificationData>
                </Clothing>
                </ProductData>
              </Product>
            </Message>";  
         


          $subChild='';
       if(isset($optiontypes))
          {
           if($messageKey > 1)
              {$subProduct = $messageKey+1;}
            
            foreach($optiontypes as $key => $value)
                { 
                  $subChildSku =  $optiontypes[$key]->optiontype_name;
                  $itemsku = explode(" ",$subChildSku);
                  $size = $itemsku[0];
                  if (strpos($itemsku[1], '-') !== false) {
                    $subname = substr($itemsku[1], 0, 3);
                    $subname= explode("-",$subname);
                    $name = $subname[0]."".$subname[1];
                   }
                  else 
                  {
                    $name = substr($itemsku[1], 0, 1);;
                  }
                  $childSku=$sku."".$name."".$size;
                  $subChild.="
                  <Message>
  <MessageID>".$subProduct."</MessageID>
  <OperationType>Update</OperationType>
  <Product>
    <SKU>".$childSku."</SKU>
    <DescriptionData>
      <Title>". $title."</Title>
      <Brand>".$brand."</Brand>
      <Description>".$description."</Description>
      ".$bullet_point_1_string."
      ".$bullet_point_2_string."
      ".$bullet_point_3_string."
      ".$bullet_point_4_string."
      ".$bullet_point_5_string."
      ".$shippingWeight."
      <Manufacturer>".$brand."</Manufacturer>
      <MfrPartNumber>".$childSku."</MfrPartNumber>
      ".$search_term_1_string."
      ".$search_term_2_string."
      ".$search_term_3_string."
      ".$search_term_4_string."
      ".$search_term_5_string."
      <ItemType>".$categories->amazon_item_type."</ItemType>   
      
      <TargetAudience>".$amazon_target_audiences."</TargetAudience>
      <RecommendedBrowseNode>".$browserNodeId."</RecommendedBrowseNode>
      ".$itemWeight."
    </DescriptionData>
    <ProductData>
    <Clothing>
      <VariationData>
      <Parentage>child</Parentage>
      <Size>".$optiontypes[$key]->optiontype_name."</Size>
      <Color>".$color."</Color>
      <VariationTheme>SizeColor</VariationTheme>
     </VariationData>
      <ClassificationData>
       <ClothingType>Blazer</ClothingType> 
       <Department>".$categories->department."</Department>
       <ColorMap>".$color."</ColorMap>
       <ModelNumber>".$childSku."</ModelNumber>
       <SizeMap>".$optiontypes[$key]->optiontype_name."</SizeMap>
      </ClassificationData>
      </Clothing>
    </ProductData>
  </Product>
</Message>";
$subProduct++;
                }
                $messageKey =  count($optiontypes)+$messageKey;  
          }
  
          $mainFeed .= $productFeeds."".$subChild;
          $messageKey++;

    
   
  
    $ProductwrapperSubmit = Productwrappersubmitfeed::create([
      'product_id'=>$ProductId,
      'feed_id'=>$WrapperSubmit->id,
      'localstatus'=>'',
      'amazonstatus'=>'',
      'message'=>''
    ]);
     
    
  


}

 
$feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
<Header>
<DocumentVersion>1.01</DocumentVersion>
<MerchantIdentifier>Inmonarch</MerchantIdentifier>
</Header>
<MessageType>Product</MessageType>
<PurgeAndReplace>false</PurgeAndReplace>
$mainFeed
</AmazonEnvelope>


EOD;


  
    
      
      $feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
      $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
      $amz->setFeedType("_POST_PRODUCT_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
      $amz->setFeedContent($feed);
      $amz->submitFeed();
      $reponse = $amz->getResponse();
      
      $message=$reponse['SubmittedDate']."=".$reponse['FeedProcessingStatus'];

      $WrapperSubmitUpdateFeed = Wrappersubmitfeed::find($WrapperSubmit->id); 
      $WrapperSubmitUpdateFeed->feedname = $feedname;
      $WrapperSubmitUpdateFeed->amazon_feed_id = $reponse['FeedSubmissionId'];
      $WrapperSubmitUpdateFeed->message = $message;
      $WrapperSubmitUpdateFeed->save();
      
   

     } 
   $this->submitRelationship($request);
    // $this->submitprice($request);
    }   
//$this->submitInventory();    
}
public function submitRelationship($request)
{
  if(isset($request->wrappers))
  {
    foreach($request->wrappers as $key => $wrapperId)
     {
    
      
        
          $WrapperSubmit = Wrappersubmitfeed::create([
        'site_id'=>$request->siteId,
        'wrapper_id'=>$wrapperId,
        'amazon_feed_id'=>'',
         'message'=>'',
        'feed_type'=>'_POST_PRODUCT_RELATIONSHIP_DATA_',
        'feedname'=>''
        
      ]);
       
      
         $messageKey = 1;
         $mainProductFeed="";
         $mainFeed="";
          foreach($request->productId as $productkey => $ProductId)
          {
            
                $products =  Product::find($ProductId);
                $group_id=$products->option_type_group;
                $product_sku=$products->product_sku;
                $optiontypes=   Optiontype::where('optiontype_group_id', '=', $group_id)->get();
                      
                $subChild='';
              
                if(isset($optiontypes))
                  {  
                    $ijk=2;
                    $subchild="";
                    foreach($optiontypes as $key => $value)
                        { 
                          $subChildSku =  $optiontypes[$key]->optiontype_name;
                          $itemsku = explode(" ",$subChildSku);
                          $size = $itemsku[0];
                          if (strpos($itemsku[1], '-') !== false) {
                            $subname = substr($itemsku[1], 0, 3);
                            $subname= explode("-",$subname);
                            $name = $subname[0]."".$subname[1];
                          }
                          else 
                          {
                            $name = substr($itemsku[1], 0, 1);;
                          }
                          $childSku=$product_sku."".$name."".$size;
                          $subchild.= "
                          <Relation>
                          <SKU>".$childSku."</SKU>  
                          <Type>Variation</Type>
                        </Relation>";

                          $ijk++;
                        }   
              
                        $mainProductFeed.="
                        <Message>
                             <MessageID>".$messageKey."</MessageID>
                             <OperationType>Update</OperationType>
                             <Relationship>
                               <ParentSKU>".$product_sku."</ParentSKU>
                               $subchild
                               </Relationship>
                             </Message>
                        ";
                      
            
               $ProductwrapperSubmit = Productwrappersubmitfeed::create([
                'product_id'=>$ProductId,
                'feed_id'=>$WrapperSubmit->id,
                'localstatus'=>'',
                'amazonstatus'=>'',
                'message'=>''
              ]);
             
              
            
             
            }
            $messageKey++;
          }
          $feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
<Header>
<DocumentVersion>1.01</DocumentVersion>
<MerchantIdentifier>Inmonarch</MerchantIdentifier>
</Header>
<MessageType>Relationship</MessageType>
$mainProductFeed 
</AmazonEnvelope> 
EOD;


$feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
            $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
            $amz->setFeedType("_POST_PRODUCT_RELATIONSHIP_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
            $amz->setFeedContent($feed);
            $amz->submitFeed();
            $reponse = $amz->getResponse();
            $message=$reponse['SubmittedDate']."=".$reponse['FeedProcessingStatus'];
            $feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
            $WrapperSubmitUpdateFeed = Wrappersubmitfeed::find($WrapperSubmit->id); 
            $WrapperSubmitUpdateFeed->feedname = $feedname;
            $WrapperSubmitUpdateFeed->amazon_feed_id = $reponse['FeedSubmissionId'];
            $WrapperSubmitUpdateFeed->message = $message;
            $WrapperSubmitUpdateFeed->save();   
         
  }
} 

$this->submitInventory($request);
}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
public function submitInventory($request){
//_POST_INVENTORY_AVAILABILITY_DATA_

if(isset($request->wrappers))
{
  foreach($request->wrappers as $key => $wrapperId)
    {
  
       $WrapperSubmit = Wrappersubmitfeed::create([
        'site_id'=>$request->siteId,
        'wrapper_id'=>$wrapperId,
        'amazon_feed_id'=>'',
        'message'=>'',
        'feed_type'=>'_POST_INVENTORY_AVAILABILITY_DATA_',
        'feedname'=>''
        
      ]); 
       $messageKey=1;
       $subChild='';
        foreach($request->productId as $productkey => $ProductId)
        {
          $products =  Product::find($ProductId);
          $group_id=$products->option_type_group;
          $sku=$products->product_sku;
          $qty=$products->qty;
          $fulfillment_latency=$products->fulfillment_latency;
          $optiontypes=   Optiontype::where('optiontype_group_id', '=', $group_id)->get();
                
         
        if(isset($optiontypes))
          { 
            $ijk=1; 
            if($messageKey > 1)
            { $ijk = count($optiontypes) + $messageKey; }
            //  $subchild="";
            foreach($optiontypes as $key => $value)
              { 
                $subChildSku =  $optiontypes[$key]->optiontype_name;
               
                $itemsku = explode(" ",$subChildSku);
                $size = $itemsku[0];
                if (strpos($itemsku[1], '-') !== false) {
                  $subname = substr($itemsku[1], 0, 3);
                  $subname= explode("-",$subname);
                  $name = $subname[0]."".$subname[1];
                }
                else 
                {
                  $name = substr($itemsku[1], 0, 1);;
                }
                $childSku=$sku."".$name."".$size;
                $subChild.= "
                <Message>
                <MessageID>$ijk</MessageID>
                <OperationType>Update</OperationType>
                <Inventory>
                <SKU>".$childSku."</SKU>
                <Quantity>".$qty."</Quantity>
                <FulfillmentLatency>".$fulfillment_latency."</FulfillmentLatency>
                </Inventory>
                </Message>";

                $ijk++;
            }
          }
         else
         {
          $subChild.= "
              <Message>
              <MessageID>$messageKey</MessageID>
              <OperationType>Update</OperationType>
              <Inventory>
              <SKU>".$sku."</SKU>
              <Quantity>".$qty."</Quantity>
              <FulfillmentLatency>".$fulfillment_latency."</FulfillmentLatency>
              </Inventory>
              </Message>";

         } 
         $ProductwrapperSubmit = Productwrappersubmitfeed::create([
          'product_id'=>$ProductId,
          'feed_id'=>$WrapperSubmit->id,
          'localstatus'=>'',
          'amazonstatus'=>'',
          'message'=>''
        ]);
         $messageKey++;
        }
$feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
<Header>
<DocumentVersion>1.01</DocumentVersion>
<MerchantIdentifier>Inmonarch</MerchantIdentifier>
</Header>
<MessageType>Inventory</MessageType>
$subChild 
</AmazonEnvelope> 
EOD;


        $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
          $amz->setFeedType("_POST_INVENTORY_AVAILABILITY_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
          $amz->setFeedContent($feed);
          $amz->submitFeed();
          $reponse = $amz->getResponse();
          $message=$reponse['SubmittedDate']."=".$reponse['FeedProcessingStatus'];
          $feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
          $WrapperSubmitUpdateFeed = Wrappersubmitfeed::find($WrapperSubmit->id); 
          $WrapperSubmitUpdateFeed->feedname = $feedname;
          $WrapperSubmitUpdateFeed->amazon_feed_id = $reponse['FeedSubmissionId'];
          $WrapperSubmitUpdateFeed->message = $message;
          $WrapperSubmitUpdateFeed->save();   
    }
  }         


$this->submitprice($request);
}

public function submitprice($request)
{
   // echo "Sjarad";exit; //62084017637
     //

if(isset($request->wrappers))
{
  foreach($request->wrappers as $key => $wrapperId)
    {
  
     $WrapperSubmit = Wrappersubmitfeed::create([
        'site_id'=>$request->siteId,
        'wrapper_id'=>$wrapperId,
        'amazon_feed_id'=>'',
        'message'=>'',
        'feed_type'=>'_POST_PRODUCT_PRICING_DATA_',
        'feedname'=>''
        
      ]); 
       $wrapperCurrecy =   Wrapper::find($wrapperId);
       $currency = $wrapperCurrecy->currency;
       $messageKey=1;
       $subChild='';
        foreach($request->productId as $productkey => $ProductId)
        {
          $products =  Product::find($ProductId);
          $group_id=$products->option_type_group;
          $sku=$products->product_sku;
          $qty=$products->qty;
          $price=$products->price;
          $fulfillment_latency=$products->fulfillment_latency;
          $optiontypes=   Optiontype::where('optiontype_group_id', '=', $group_id)->get();
         
          if(isset($optiontypes))
          { 
            $ijk=1; 
            if($messageKey > 1)
            { $ijk = count($optiontypes) + $messageKey; }
            //  $subchild="";
            foreach($optiontypes as $key => $value)
              { 
                $subChildSku =  $optiontypes[$key]->optiontype_name;
                $price_type =  $optiontypes[$key]->price_type;
                $priceFixed =  $optiontypes[$key]->price;
              if($price_type=='F')
                {$price=$price+$priceFixed;}
              else  
                {
                  $addedPrice = ($price * $priceFixed)/100;
                  $price=$price+$addedPrice;
                }
                $price = round($price);
                $itemsku = explode(" ",$subChildSku);
                $size = $itemsku[0];
                if (strpos($itemsku[1], '-') !== false) {
                  $subname = substr($itemsku[1], 0, 3);
                  $subname= explode("-",$subname);
                  $name = $subname[0]."".$subname[1];
                }
                else 
                {
                  $name = substr($itemsku[1], 0, 1);;
                }
                $childSku=$sku."".$name."".$size;
                $subChild.= "
                <Message>
                <MessageID>$ijk</MessageID>
                <OperationType>Update</OperationType>
                <Price>
                <SKU>".$childSku."</SKU>
                <StandardPrice currency='".$currency."'>".$price."</StandardPrice>
                </Price>
                </Message>";

                $ijk++;
            }
          }
         else
         {
          $subChild.= "
              <Message>
              <MessageID>$messageKey</MessageID>
              <OperationType>Update</OperationType>
              <Price>
              <SKU>".$sku."</SKU>
              <StandardPrice currency='".$currency."'>".$price."</StandardPrice>
            
              </Price>
              </Message>";

            

         } 
          
         $messageKey++;
           
         $ProductwrapperSubmit = Productwrappersubmitfeed::create([
          'product_id'=>$ProductId,
          'feed_id'=>$WrapperSubmit->id,
          'localstatus'=>'',
          'amazonstatus'=>'',
          'message'=>''
        ]);

        }
$feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
<Header>
<DocumentVersion>1.01</DocumentVersion>
<MerchantIdentifier>Inmonarch</MerchantIdentifier>
</Header>
<MessageType>Price</MessageType>
$subChild
</AmazonEnvelope>
EOD;
        
        
         $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
        $amz->setFeedType("_POST_PRODUCT_PRICING_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
        $amz->setFeedContent($feed);
        
        $amz->submitFeed(); 
        $reponse = $amz->getResponse();
        $message=$reponse['SubmittedDate']."=".$reponse['FeedProcessingStatus'];
        $feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
        $WrapperSubmitUpdateFeed = Wrappersubmitfeed::find($WrapperSubmit->id); 
        $WrapperSubmitUpdateFeed->feedname = $feedname;
        $WrapperSubmitUpdateFeed->amazon_feed_id = $reponse['FeedSubmissionId'];
        $WrapperSubmitUpdateFeed->message = $message;
        $WrapperSubmitUpdateFeed->save();

      }
  }      
       

$this->submitImage($request);

}
public function submitImage($request)
{

  if(isset($request->wrappers))
  {
    foreach($request->wrappers as $key => $wrapperId)
      {
    
         $WrapperSubmit = Wrappersubmitfeed::create([
          'site_id'=>$request->siteId,
          'wrapper_id'=>$wrapperId,
          'amazon_feed_id'=>'',
          'message'=>'',
          'feed_type'=>'_POST_PRODUCT_IMAGE_DATA_',
          'feedname'=>''
          
        ]); 
        
         $messageKey=1;
         $subChild='';
         $mainProduct="";
         $ProductList="";
         $feedMain="";
        
          foreach($request->productId as $productkey => $ProductId)
          {
            $products =  Product::find($ProductId);
            $group_id=$products->option_type_group;
            $sku=$products->product_sku;
            
            $image1=$products->image_1;
            $image2=$products->image_2;
            $image3=$products->image_3;
            $image4=$products->image_4;
            $image5=$products->image_5;
            $subimages=array($image2,$image3,$image4,$image5);
            
            $optiontypes=   Optiontype::where('optiontype_group_id', '=', $group_id)->get();
            
            $parentsubImageList="";
            $totalSubImageCnt=0;
            $SubImageCount=0;
            if(isset($subimages))
            {
               $parentImage= $messageKey+1;
               $pt1=1;
                foreach($subimages as $key => $imgSrc)
                 {
                  if($imgSrc!='') 
                    {
                     $parentsubImageList.="
                     <Message>
                       <MessageID>$parentImage</MessageID>
                       <OperationType>Update</OperationType>  
                       <ProductImage>
                         <SKU>$sku</SKU>
                         <ImageType>PT$pt1</ImageType>
                         <ImageLocation>$imgSrc</ImageLocation>
                       </ProductImage>
                       </Message>
                   ";
                    $SubImageCount++;
                    }
                   $parentImage++;
                   $pt1++;
                 }
             } 
             $totalSubImageCnt=$SubImageCount+$messageKey; 
 
            $mainProduct="
            <Message>
                 <MessageID>$messageKey</MessageID>
                 <OperationType>Update</OperationType>
                 <ProductImage>
                   <SKU>$sku</SKU>
                   <ImageType>Main</ImageType>
                   <ImageLocation>$image1</ImageLocation>
                 </ProductImage>
             </Message>
             $parentsubImageList
            ";


            $optionMainprd=$totalSubImageCnt+1; 
            $subChild= "";
            $totalSubChild="";
            if(isset($optiontypes))
            { 
              
              $ijk=$totalSubImageCnt; 
              //  $subchild="";
              foreach($optiontypes as $key => $value)
                { 
                  $subChildSku =  $optiontypes[$key]->optiontype_name;
                  $itemsku = explode(" ",$subChildSku);
                  $size = $itemsku[0];
                  if (strpos($itemsku[1], '-') !== false) {
                    $subname = substr($itemsku[1], 0, 3);
                    $subname= explode("-",$subname);
                    $name = $subname[0]."".$subname[1];
                  }
                  else 
                  {
                    $name = substr($itemsku[1], 0, 1);;
                  }
                  $childSku=$sku."".$name."".$size;
                  $subChild= "
                  <Message>
                    <MessageID>$optionMainprd</MessageID>
                    <OperationType>Update</OperationType>
                    <ProductImage>
                      <SKU>$childSku</SKU>
                      <ImageType>Main</ImageType>
                      <ImageLocation>$image1</ImageLocation>
                    </ProductImage>
                   </Message> 
                  ";
                $subImageList="";
                  if(isset($subimages))
                  {
                    $subImage= $optionMainprd+1;
                   
                    $pt=1;
                    foreach($subimages as $key => $imgSrc)
                       {
                        if($imgSrc!='') 
                           {
                            $subImageList.="
                                <Message>
                                <MessageID>$subImage</MessageID>
                                <OperationType>Update</OperationType>  
                                <ProductImage>
                                  <SKU>$childSku</SKU>
                                  <ImageType>PT$pt</ImageType>
                                  <ImageLocation>$imgSrc</ImageLocation>
                                </ProductImage>
                                </Message>
                            ";
                            $subImage++;
                        $pt++;
                           }
                        
                         }
                        
                      $optionMainprd= $subImage;
                      
                    }
                    
                    $totalSubChild.= $subChild."".$subImageList;
               }
             
              }
              $messageKey = $optionMainprd;
              $feedMain .=$mainProduct."".$totalSubChild;
             $messageKey++;
            
             $ProductwrapperSubmit = Productwrappersubmitfeed::create([
              'product_id'=>$ProductId,
              'feed_id'=>$WrapperSubmit->id,
              'localstatus'=>'',
              'amazonstatus'=>'',
              'message'=>''
            ]);


          }

$feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
<Header>
<DocumentVersion>1.01</DocumentVersion>
<MerchantIdentifier>Inmonarch</MerchantIdentifier>
</Header>
<MessageType>ProductImage</MessageType>
$feedMain
</AmazonEnvelope>
EOD;
            $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
              $amz->setFeedType("_POST_PRODUCT_IMAGE_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
              $amz->setFeedContent($feed);
              $amz->submitFeed(); 
              $reponse = $amz->getResponse();
          $message=$reponse['SubmittedDate']."=".$reponse['FeedProcessingStatus'];
          $feedname="INMONRCH_FEED_ID-1001".$WrapperSubmit->id;
          $WrapperSubmitUpdateFeed = Wrappersubmitfeed::find($WrapperSubmit->id); 
          $WrapperSubmitUpdateFeed->feedname = $feedname;
          $WrapperSubmitUpdateFeed->amazon_feed_id = $reponse['FeedSubmissionId'];
          $WrapperSubmitUpdateFeed->message = $message;
          $WrapperSubmitUpdateFeed->save();  
            
      }
  }        

 
   
}
    public function show($id)
    {
        //
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

        $product = Product::find($id); 
        $product->localfeed()->detach();
        $product->delete();
        return response(null,204); 
    }
}
