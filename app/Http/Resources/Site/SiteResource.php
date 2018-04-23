<?php

namespace App\Http\Resources\Site;

use Illuminate\Http\Resources\Json\Resource;

class SiteResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      //  return parent::toArray($request);
      return [
          'site_name' => $this->sitename,
          'site_url'=> $this->siteurl,
          'site_id' => $this->id,
      ];
    }
}
