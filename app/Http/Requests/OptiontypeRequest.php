<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OptiontypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'optiontype_name' => 'required|unique:optiontypes',
            'category_list'  => 'required',
            'optiontype_group_id'=> 'required',
            'site_id' => 'required'
        ];
    }
}
