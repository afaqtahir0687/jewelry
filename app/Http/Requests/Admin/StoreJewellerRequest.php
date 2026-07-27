<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreJewellerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'user_id'                  => ['nullable', 'exists:users,id'],
            'business_name'            => ['required', 'string', 'max:255'],
            'city_id'                  => ['required', 'exists:cities,id'],
            'area'                     => ['nullable', 'string', 'max:255'],
            'full_address'             => ['nullable', 'string', 'max:500'],
            'phone'                    => ['required', 'string', 'max:20'],
            'whatsapp'                 => ['nullable', 'string', 'max:20'],
            'years_in_business'        => ['nullable', 'integer', 'min:0'],
            'specialities'             => ['nullable', 'array'],
            'custom_order_available'   => ['boolean'],
            'delivery_available'       => ['boolean'],
            'repair_services_available' => ['boolean'],
            'is_verified'              => ['boolean'],
            'slug'                     => ['required', 'string', 'max:255', 'unique:jewellers,slug'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->input('business_name')).'-'.uniqid(),
        ]);
    }
}
