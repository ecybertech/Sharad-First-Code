<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WrapperRequest extends FormRequest
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
            'wrappername' => 'required|unique:wrappers',
            'wrapperurl'  => 'required|unique:wrappers',
        ];
    }
}
