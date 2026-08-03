<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'city_id' => 'required|exists:cities,id',
            'category_id' => 'nullable|exists:categories,id',
            'product_id' => 'nullable|exists:products,id',
            'jeweller_id' => 'nullable|exists:jewellers,id',
            'requirement_description' => 'nullable|string|max:1000',
            'budget' => 'nullable|string|max:100',
            'reference_image' => 'nullable|image|max:5120', // Max 5MB
            'preferred_contact_time' => 'nullable|string|max:100',
        ];
    }
}
