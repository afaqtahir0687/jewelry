<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        $categoryId = $this->route('category')?->id;

        return [
            'name'         => ['required', 'string', 'max:100', 'unique:categories,name,' . $categoryId],
            'slug'         => ['required', 'string', 'max:150', 'unique:categories,slug,' . $categoryId],
            'description'  => ['nullable', 'string'],
            'image'        => ['nullable', 'sometimes'],
            'banner_image' => ['nullable', 'sometimes'],
            'is_active'    => ['boolean'],
            'is_featured'  => ['boolean'],
            'sort_order'   => ['nullable', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->input('name')),
        ]);
    }
}
