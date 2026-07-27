<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJewellerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'user_id'                   => ['nullable', 'exists:users,id'],
            'business_name'             => ['sometimes', 'string', 'max:255'],
            'city_id'                   => ['sometimes', 'exists:cities,id'],
            'area'                      => ['sometimes', 'nullable', 'string', 'max:255'],
            'full_address'              => ['sometimes', 'nullable', 'string', 'max:500'],
            'google_maps_link'          => ['sometimes', 'nullable', 'string'],
            'phone'                     => ['sometimes', 'string', 'max:20'],
            'whatsapp'                  => ['sometimes', 'nullable', 'string', 'max:20'],
            'business_timings'          => ['sometimes', 'nullable', 'string'],
            'years_in_business'         => ['sometimes', 'nullable', 'integer', 'min:0'],
            'specialities'              => ['sometimes', 'nullable', 'array'],
            'payment_methods'           => ['sometimes', 'nullable', 'array'],
            'custom_order_available'    => ['sometimes', 'boolean'],
            'delivery_available'        => ['sometimes', 'boolean'],
            'repair_services_available' => ['sometimes', 'boolean'],
            'return_policy'             => ['sometimes', 'nullable', 'string'],
            'is_verified'               => ['sometimes', 'boolean'],
        ];
    }
}
