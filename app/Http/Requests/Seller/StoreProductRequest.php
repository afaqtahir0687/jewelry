<?php

namespace App\Http\Requests\Seller;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['seller', 'admin']);
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'title'                  => ['required', 'string', 'max:255'],
            'category_id'            => ['required', 'exists:categories,id'],
            'description'            => ['nullable', 'string'],
            'images'                 => ['sometimes', 'array'],
            'images.*'               => ['image', 'max:4096'],
            'price_on_request'       => ['boolean'],
            'price'                  => ['nullable', 'numeric', 'min:0'],
            'discount_price'         => ['nullable', 'numeric', 'min:0'],
            'gold_purity'            => ['nullable', 'string', 'max:50'],
            'approximate_weight'     => ['nullable', 'string', 'max:50'],
            'stone_info'             => ['nullable', 'string', 'max:255'],
            'status'                 => ['required', 'string', 'in:available,made_to_order,design_inspiration'],
            'customisation_options'  => ['nullable', 'string'],
        ];
    }
}
