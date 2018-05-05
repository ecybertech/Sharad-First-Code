<?php

namespace App\Http\Controllers;
use Illuminate\Support\Collection;

use Illuminate\Http\Request;
use Sonnenglas\AmazonMws\AmazonFeed;
use Sonnenglas\AmazonMws\AmazonFeedlist;
use Sonnenglas\AmazonMws\AmazonFeedResult;
use App\Localfeed;
use App\Http\Resources\Product\ProductResource;
use App\Http\Resources\Product\ProductCollection;
use App\Product;
use App\Category;
use App\Optiontypegroup;

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
        //
        echo "<pre>";print_r($request->all());
        
        $request->wrappers;
        exit;
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
  <Message>
    <MessageID>1</MessageID>
    <OperationType>Update</OperationType>
    <Product>
      <SKU>TX290-ABCD</SKU>
      <DescriptionData>
        <Title>INMONARCH Mens Fabulous Silver 6 Pc Tuxedo Suit TX290-ABCD</Title>
        <Brand>INMONARCH</Brand>
        <Description>Fabulous 1 button  tuxedo suit- 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) made from silver color pure polyester fabric. It has bottom as trouser. If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. When selecting the size of your outfit, please note that the waistline measurement of the accompanying pants will be 6 inches less than the jacket size you indicate. For example: A size 42 Long jacket will come with a size 36 waist trouser. If you prefer a different pant size, please select the Tailor Made/Custom Made option and we will be happy to make your outfit to the exact specifications that you need. All outfits come in standard US sizes. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches.</Description>
        <BulletPoint>If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. A price increase of 15-25% is applied to Plus sizes.  All Accessories shown are included in the price except shoes and watches.</BulletPoint>
        <BulletPoint>FREE UK delivery.</BulletPoint>
        <BulletPoint>Usually dispatched within 6 to 10 days.</BulletPoint>
        <BulletPoint>1 Button Tuxedo - 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square). Silver color pure polyester fabric. Bottom as trouser.</BulletPoint>
        <BulletPoint>You will get it soon when you will choose Express Delivery at checkout.</BulletPoint>
        
        <Manufacturer>INMONARCH</Manufacturer>
      
        <MfrPartNumber>TX290-ABCD</MfrPartNumber>
        <SearchTerms>tuxedo for men</SearchTerms>   
        <SearchTerms>Silver Tuxedo</SearchTerms>   
        <SearchTerms>tuxedo buy jacket and pant</SearchTerms>   
        <SearchTerms>men's tuxedo suit</SearchTerms>   
        <SearchTerms>tuxedo</SearchTerms>   
        <ItemType>tuxedo-suits</ItemType>
      
        <RecommendedBrowseNode>1731019031</RecommendedBrowseNode>
        
      </DescriptionData>
      <ProductData>
       <Clothing>
        <VariationData>
          <Parentage>parent</Parentage>
          <VariationTheme>SizeColor</VariationTheme>
       </VariationData>
        <ClassificationData>
        <ClothingType>Blazer</ClothingType>         
        <Department>Mens</Department>
        </ClassificationData>
      </Clothing>
      </ProductData>
    </Product>
   
  </Message>
  <Message>
  <MessageID>2</MessageID>
  <OperationType>Update</OperationType>
  <Product>
    <SKU>TX290L34-ABCD</SKU>
    <DescriptionData>
      <Title>INMONARCH Mens Fabulous 6 Pc Tuxedo Suit TX290L34  Silver-ABCD</Title>
      <Brand>INMONARCH</Brand>
      <Description>Fabulous 1 button  tuxedo suit- 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) made from silver color pure polyester fabric. It has bottom as trouser. If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. When selecting the size of your outfit, please note that the waistline measurement of the accompanying pants will be 6 inches less than the jacket size you indicate. For example: A size 42 Long jacket will come with a size 36 waist trouser. If you prefer a different pant size, please select the Tailor Made/Custom Made option and we will be happy to make your outfit to the exact specifications that you need. All outfits come in standard US sizes. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches.</Description>
      <BulletPoint>If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. A price increase of 15-25% is applied to Plus sizes.  All Accessories shown are included in the price except shoes and watches.</BulletPoint>
      <BulletPoint>FREE UK delivery. </BulletPoint>
      <BulletPoint>Usually dispatched within 6 to 10 days.</BulletPoint>
      <BulletPoint>1 Button Tuxedo - 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square). Silver color pure polyester fabric. Bottom as trouser.</BulletPoint>
      <BulletPoint>You will get it soon when you will choose Express Delivery at checkout.</BulletPoint>
      <ShippingWeight type="kg">2</ShippingWeight>
      <Manufacturer>INMONARCH</Manufacturer>
      <MfrPartNumber>TX290L34</MfrPartNumber>
      <SearchTerms>tuxedo for men</SearchTerms>   
      <SearchTerms>Silver Tuxedo</SearchTerms>   
      <SearchTerms>tuxedo buy jacket and pant</SearchTerms>   
      <SearchTerms>men's tuxedo suit</SearchTerms>   
      <SearchTerms>tuxedo tailor made</SearchTerms>   
      <ItemType>tuxedo-suits</ItemType>
      <TargetAudience>Mens</TargetAudience>
      <IsGiftWrapAvailable>false</IsGiftWrapAvailable>
      <IsGiftMessageAvailable>false</IsGiftMessageAvailable>
      <RecommendedBrowseNode>1730999031</RecommendedBrowseNode>
      <ItemWeight type="kg"> 2</ItemWeight>
    </DescriptionData>
    <ProductData>
    <Clothing>
      <VariationData>
      <Parentage>child</Parentage>
      <Size>34 Long</Size>
      <Color>Sliver</Color>
      <VariationTheme>SizeColor</VariationTheme>
   </VariationData>
      <ClassificationData>
      
       <ClothingType>Blazer</ClothingType>  
       <Department>Mens</Department>
        <ColorMap>Sliver</ColorMap>
        <FabricWash></FabricWash>
        <PatternStyle></PatternStyle>
        <FitType></FitType>
        <SleeveType></SleeveType>
        <PocketDescription></PocketDescription>
        <SizeMap>34 Long</SizeMap>
        <SleeveLength></SleeveLength>
        <NeckSize type="IN"></NeckSize>
        <NeckStyle></NeckStyle>
				<ChestSize type="IN"></ChestSize>			
			</ClassificationData>
      </Clothing>
    </ProductData>
  </Product>
</Message>
<Message>
<MessageID>3</MessageID>
<OperationType>Update</OperationType>
<Product>
  <SKU>TX290XL34-ABCD</SKU>  
    <DescriptionData>
      <Title>INMONARCH Mens Fabulous 6 Pc Tuxedo Suit TX290XL34 Silver-ABCD</Title>
      <Brand>INMONARCH</Brand>
      <Description>Fabulous 1 button  tuxedo suit- 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) made from silver color pure polyester fabric. It has bottom as trouser. If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. When selecting the size of your outfit, please note that the waistline measurement of the accompanying pants will be 6 inches less than the jacket size you indicate. For example: A size 42 Long jacket will come with a size 36 waist trouser. If you prefer a different pant size, please select the Tailor Made/Custom Made option and we will be happy to make your outfit to the exact specifications that you need. All outfits come in standard US sizes. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches.</Description>
      <BulletPoint>If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. A price increase of 15-25% is applied to Plus sizes.  All Accessories shown are included in the price except shoes and watches.</BulletPoint>
      <BulletPoint>FREE UK delivery. </BulletPoint>
      <BulletPoint>Usually dispatched within 6 to 10 days.</BulletPoint>
      <BulletPoint>1 Button Tuxedo - 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square). Silver color pure polyester fabric. Bottom as trouser.</BulletPoint>
      <BulletPoint>You will get it soon when you will choose Express Delivery at checkout.</BulletPoint>
      <ShippingWeight type="kg">2</ShippingWeight>
      <Manufacturer>INMONARCH</Manufacturer>
      <Modal>TX290XL34</Modal>
      <MfrPartNumber>TX290XL34</MfrPartNumber>
      <SearchTerms>tuxedo for men</SearchTerms>   
      <SearchTerms>Silver Tuxedo</SearchTerms>   
      <SearchTerms>tuxedo buy jacket and pant</SearchTerms>   
      <SearchTerms>men's tuxedo suit</SearchTerms>   
      <SearchTerms>tuxedo 34S</SearchTerms>   
      <ItemType>tuxedo-suits</ItemType>
      <TargetAudience>Mens</TargetAudience>
      <IsGiftWrapAvailable>false</IsGiftWrapAvailable>
      <IsGiftMessageAvailable>false</IsGiftMessageAvailable>
      <RecommendedBrowseNode>1730999031</RecommendedBrowseNode>
      <ItemWeight type="kg"> 2</ItemWeight>
     
    </DescriptionData>
  <ProductData>
   <Clothing>
    <VariationData>
    <Parentage>child</Parentage>
    <Size>34 X-Long</Size>
    <Color>Sliver</Color>
    <VariationTheme>SizeColor</VariationTheme>
 </VariationData>
    <ClassificationData>
     
     <ClothingType>Blazer</ClothingType> 
     <Department>Mens</Department>
      <ColorMap>Sliver</ColorMap>
      <SizeMap>34 X-Long</SizeMap>
     </ClassificationData>
    </Clothing>
  </ProductData>
</Product>
</Message>
<Message>
<MessageID>4</MessageID>
<OperationType>Update</OperationType>
<Product>
<SKU>TX290S36-ABCD</SKU> 
<DescriptionData>
  <Title>INMONARCH Mens Fabulous 6 Pc Tuxedo Suit TX290S36 Silver-ABCD</Title>
  <Brand>INMONARCH</Brand>
  <Description>Fabulous 1 button  tuxedo suit- 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square) made from silver color pure polyester fabric. It has bottom as trouser. If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. When selecting the size of your outfit, please note that the waistline measurement of the accompanying pants will be 6 inches less than the jacket size you indicate. For example: A size 42 Long jacket will come with a size 36 waist trouser. If you prefer a different pant size, please select the Tailor Made/Custom Made option and we will be happy to make your outfit to the exact specifications that you need. All outfits come in standard US sizes. A price increase of 15-25% is applied to Plus sizes. All Accessories shown are included in the price except shoes and watches.</Description>
  <BulletPoint>If you want to order it as custom made select custom made from size box and then we will send you an measurement form through which you will provide us your all measurements. A price increase of 15-25% is applied to Plus sizes.  All Accessories shown are included in the price except shoes and watches.</BulletPoint>
  <BulletPoint>FREE UK delivery. </BulletPoint>
  <BulletPoint>Usually dispatched within 6 to 10 days.</BulletPoint>
  <BulletPoint>1 Button Tuxedo - 6pc (Jacket, Vest, Pants, Shirt, Tie, Pocket Square). Silver color pure polyester fabric. Bottom as trouser.</BulletPoint>
  <BulletPoint>You will get it soon when you will choose Express Delivery at checkout.</BulletPoint>
  <ShippingWeight type="kg">2</ShippingWeight>
  <Manufacturer>INMONARCH</Manufacturer>
  <MfrPartNumber>TX290S36</MfrPartNumber>
  <SearchTerms>tuxedo for men</SearchTerms>   
  <SearchTerms>Silver Tuxedo</SearchTerms>   
  <SearchTerms>tuxedo buy jacket and pant</SearchTerms>   
  <SearchTerms>men's tuxedo suit</SearchTerms>   
  <SearchTerms>tuxedo 34R</SearchTerms>   
  <ItemType>tuxedo-suits</ItemType>
      <TargetAudience>Mens</TargetAudience>
      <IsGiftWrapAvailable>false</IsGiftWrapAvailable>
      <IsGiftMessageAvailable>false</IsGiftMessageAvailable>
      <RecommendedBrowseNode>1730999031</RecommendedBrowseNode>
      <ItemWeight type="kg"> 2</ItemWeight>
</DescriptionData>
<ProductData>

  <Clothing>
    <VariationData>
      <Parentage>child</Parentage>
      <Size>36 Short</Size>
      <Color>Sliver</Color>
      <VariationTheme>SizeColor</VariationTheme>
   </VariationData>
  <ClassificationData>
  
   <ClothingType>Blazer</ClothingType> 
   <Department>Mens</Department>
    <ColorMap>Sliver</ColorMap>
    <SizeMap>36 Short</SizeMap>
   </ClassificationData>
  </Clothing>
</ProductData>
</Product>
</Message>
 
</AmazonEnvelope>
EOD;

$amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
$amz->setFeedType("_POST_PRODUCT_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
$amz->setFeedContent($feed);
$amz->submitFeed();
  //return $amz->getResponse();

  echo "Submit Product";//62085017637
echo "<pre>";
print_r($amz->getResponse());
echo "<br>";
$this->submitRelationship();
//$this->submitInventory();    
}
public function submitRelationship()
{
  $feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
    <Header>
    <DocumentVersion>1.01</DocumentVersion>
    <MerchantIdentifier>Inmonarch</MerchantIdentifier>
    </Header>
    <MessageType>Relationship</MessageType>
    <Message>
    <MessageID>1</MessageID>
    <OperationType>Update</OperationType>
    <Relationship>
      <ParentSKU>TX290-ABCD</ParentSKU>
      <Relation>
        <SKU>TX290L34-ABCD</SKU>  
        <Type>Variation</Type>
      </Relation>
      <Relation>
        <SKU>TX290XL34-ABCD</SKU>
        <Type>Variation</Type>
      </Relation>
      <Relation>
        <SKU>TX290S36-ABCD</SKU>
        <Type>Variation</Type>
      </Relation>
    </Relationship>
  </Message>
    </AmazonEnvelope> 
EOD;
$amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
$amz->setFeedType("_POST_PRODUCT_RELATIONSHIP_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
$amz->setFeedContent($feed);
$amz->submitFeed();
echo "Submit Realtionship";
echo "<pre>";
print_r($amz->getResponse());
echo "<br>";
$this->submitInventory();
}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
public function submitInventory(){
//_POST_INVENTORY_AVAILABILITY_DATA_

$feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
    <Header>
    <DocumentVersion>1.01</DocumentVersion>
    <MerchantIdentifier>Inmonarch</MerchantIdentifier>
    </Header>
    <MessageType>Inventory</MessageType>
    <Message>
    <MessageID>1</MessageID>
    <OperationType>Update</OperationType>
    <Inventory>
    <SKU>TX290L34-ABCD</SKU>
    <Quantity>5</Quantity>
    <FulfillmentLatency>7</FulfillmentLatency>
    </Inventory>
    </Message>
    <Message>
    <MessageID>2</MessageID>
    <OperationType>Update</OperationType>
    <Inventory>
    <SKU>TX290XL34-ABCD</SKU>
    <Quantity>8</Quantity>
    <FulfillmentLatency>9</FulfillmentLatency>
    </Inventory>
    </Message>
    <Message>
    <MessageID>3</MessageID>
    <OperationType>Update</OperationType>
    <Inventory>
    <SKU>TX290S36-ABCD</SKU>
    <Quantity>5</Quantity>
    <FulfillmentLatency>3</FulfillmentLatency>
    </Inventory>
    </Message>
    </AmazonEnvelope> 
EOD;
$amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
$amz->setFeedType("_POST_INVENTORY_AVAILABILITY_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
$amz->setFeedContent($feed);
$amz->submitFeed();
echo "Submit Invntory";
echo "<pre>";
print_r($amz->getResponse());
echo "<br>";
$this->submitprice();
}

public function submitprice()
{
   // echo "Sjarad";exit; //62084017637
     //
        $feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
<AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
  <Header>
    <DocumentVersion>1.01</DocumentVersion>
    <MerchantIdentifier>Inmonarch</MerchantIdentifier>
  </Header>
  <MessageType>Price</MessageType>
 
  <Message>
    <MessageID>1</MessageID>
    <OperationType>Update</OperationType>
    <Price>
     <SKU>TX290L34-ABCD</SKU>
       <StandardPrice currency="GBP">358</StandardPrice>
    </Price>
  </Message>
  <Message>
    <MessageID>2</MessageID>
    <OperationType>Update</OperationType>
    <Price>
     <SKU>TX290XL34-ABCD</SKU>
       <StandardPrice currency="GBP">358</StandardPrice>
    </Price>
  </Message>
  <Message>
    <MessageID>3</MessageID>
    <OperationType>Update</OperationType>
    <Price>
     <SKU>TX290S36-ABCD</SKU>
       <StandardPrice currency="GBP">358</StandardPrice>
    </Price>
  </Message>
</AmazonEnvelope>
EOD;
$amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
$amz->setFeedType("_POST_PRODUCT_PRICING_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
$amz->setFeedContent($feed);

$amz->submitFeed(); 
echo "Submit Price";
echo "<pre>";
print_r($amz->getResponse());
echo "<br>"; 
$this->submitImage();

}
public function submitImage()
{
 $feed = <<<EOD
<?xml version="1.0" encoding="iso-8859-1"?>
    <AmazonEnvelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="amzn-envelope.xsd">
      <Header>
        <DocumentVersion>1.01</DocumentVersion>
        <MerchantIdentifier>Inmonarch</MerchantIdentifier>
      </Header>
      <MessageType>ProductImage</MessageType>
     <Message>
        <MessageID>1</MessageID>
        <OperationType>Update</OperationType>
        <ProductImage>
           <SKU>TX290-ABCD</SKU>
           <ImageType>Main</ImageType>
           <ImageLocation>https://inmonarch-storage.s3.amazonaws.com/static_images/TX280.main.jpg</ImageLocation>
        </ProductImage>
    </Message>    
        <Message>
        <MessageID>2</MessageID>
        <OperationType>Update</OperationType>  
        <ProductImage>
           <SKU>TX290-ABCD</SKU>
           <ImageType>PT1</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits01.jpg</ImageLocation>
        </ProductImage>
        </Message>
        <Message>
        <MessageID>3</MessageID>
        <OperationType>Update</OperationType>    
        <ProductImage>
           <SKU>TX290-ABCD</SKU>
           <ImageType>PT2</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits02.jpg</ImageLocation>
        </ProductImage>
        </Message>
        <Message>
        <MessageID>4</MessageID>
        <OperationType>Update</OperationType>    
        <ProductImage>
           <SKU>TX290-ABCD</SKU>
           <ImageType>PT3</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits03.jpg</ImageLocation>
        </ProductImage>
      </Message>
     <Message>
        <MessageID>5</MessageID>
        <OperationType>Update</OperationType>
        <ProductImage>
           <SKU>TX290L34-ABCD</SKU>
           <ImageType>Main</ImageType>
           <ImageLocation>https://inmonarch-storage.s3.amazonaws.com/static_images/TX280.main.jpg</ImageLocation>
        </ProductImage>
    </Message>    
        <Message>
        <MessageID>6</MessageID>
        <OperationType>Update</OperationType>  
        <ProductImage>
           <SKU>TX290L34-ABCD</SKU>
           <ImageType>PT1</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits01.jpg</ImageLocation>
        </ProductImage>
        </Message>
        <Message>
        <MessageID>7</MessageID>
        <OperationType>Update</OperationType>    
        <ProductImage>
           <SKU>TX290L34-ABCD</SKU>
           <ImageType>PT2</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits02.jpg</ImageLocation>
        </ProductImage>
        </Message>
        <Message>
        <MessageID>8</MessageID>
        <OperationType>Update</OperationType>    
        <ProductImage>
           <SKU>TX290L34-ABCD</SKU>
           <ImageType>PT3</ImageType>
           <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits03.jpg</ImageLocation>
        </ProductImage>
      </Message>

      <Message>
      <MessageID>9</MessageID>
      <OperationType>Update</OperationType>
      <ProductImage>
         <SKU>TX290XL34-ABCD</SKU>
         <ImageType>Main</ImageType>
         <ImageLocation>https://inmonarch-storage.s3.amazonaws.com/static_images/TX280.main.jpg</ImageLocation>
      </ProductImage>
  </Message>    
      <Message>
      <MessageID>10</MessageID>
      <OperationType>Update</OperationType>  
      <ProductImage> 
         <SKU>TX290XL34-ABCD</SKU>
         <ImageType>PT1</ImageType>
         <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits01.jpg</ImageLocation>
      </ProductImage>
      </Message>
      <Message>
      <MessageID>11</MessageID>
      <OperationType>Update</OperationType>    
      <ProductImage>
         <SKU>TX290XL34-ABCD</SKU>
         <ImageType>PT2</ImageType>
         <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits02.jpg</ImageLocation>
      </ProductImage>
      </Message>
      <Message>
      <MessageID>12</MessageID>
      <OperationType>Update</OperationType>    
      <ProductImage>
         <SKU>TX290XL34-ABCD</SKU>
         <ImageType>PT3</ImageType>
         <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits03.jpg</ImageLocation>
      </ProductImage>
    </Message>


    
  <Message>
    <MessageID>13</MessageID>
    <OperationType>Update</OperationType>
    <ProductImage>
       <SKU>TX290S36-ABCD</SKU>
       <ImageType>Main</ImageType>
       <ImageLocation>https://inmonarch-storage.s3.amazonaws.com/static_images/TX280.main.jpg</ImageLocation>
    </ProductImage>
</Message>    
    <Message>
    <MessageID>14</MessageID>
    <OperationType>Update</OperationType>  
    <ProductImage>
       <SKU>TX290S36-ABCD</SKU>
       <ImageType>PT1</ImageType>
       <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits01.jpg</ImageLocation>
    </ProductImage>
    </Message>
    <Message>
    <MessageID>15</MessageID>
    <OperationType>Update</OperationType>    
    <ProductImage>
       <SKU>TX290S36-ABCD</SKU>
       <ImageType>PT2</ImageType>
       <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits02.jpg</ImageLocation>
    </ProductImage>
    </Message>
    <Message>
    <MessageID>16</MessageID>
    <OperationType>Update</OperationType>    
    <ProductImage>
       <SKU>TX290S36-ABCD</SKU>
       <ImageType>PT3</ImageType>
       <ImageLocation>http://www.monarch-garments.com/photos/tuxedo/orderformsuits03.jpg</ImageLocation>
    </ProductImage>
  </Message>

    </AmazonEnvelope>
EOD;
    $amz = new AmazonFeed("Inmonarch_Wrapper"); //store name matches the array key in the config file
    $amz->setFeedType("_POST_PRODUCT_IMAGE_DATA_"); //feed types listed in documentation 	_POST_FLAT_FILE_LISTINGS_DATA_
    $amz->setFeedContent($feed);
    $amz->submitFeed();  
    echo "Submit Images";
echo "<pre>";
print_r($amz->getResponse());
echo "<br>";
   
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
