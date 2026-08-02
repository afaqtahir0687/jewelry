<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'title'              => ['required', 'string', 'max:255'],
            'slug'               => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($productId),
            ],
            'category_id'        => ['required', 'exists:categories,id'],
            'subcategory_id'     => ['nullable', 'exists:subcategories,id'],
            'description'        => ['nullable', 'string'],
            'price_on_request'   => ['boolean'],
            'price'              => ['nullable', 'numeric', 'min:0'],
            'discount_price'     => ['nullable', 'numeric', 'min:0'],
            'gold_purity'        => ['nullable', 'string', 'max:50'],
            'approximate_weight' => ['nullable', 'string', 'max:100'],
            'stone_info'         => ['nullable', 'string', 'max:255'],
            'status'             => ['required', Rule::in(['available', 'made_to_order', 'design_inspiration'])],
            'customisation_options' => ['nullable', 'string'],
            'is_featured'        => ['boolean'],
            'is_latest_arrival'  => ['boolean'],
            'sort_order'         => ['nullable', 'integer', 'min:0'],
            'images'             => ['nullable', 'array'],
            'images.*'           => ['file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'deleted_image_ids'  => ['nullable', 'array'],
            'deleted_image_ids.*' => ['integer'],
        ];
    }
}
