<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePartnerRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name'               => ['required', 'string', 'max:255'],
            'email'              => ['required', 'email', 'max:255'],
            'phone'              => ['required', 'string', 'max:20'],
            'whatsapp'           => ['nullable', 'string', 'max:20'],
            'business_name'      => ['required', 'string', 'max:255'],
            'city_id'            => ['required', 'exists:cities,id'],
            'area'               => ['required', 'string', 'max:255'],
            'full_address'       => ['required', 'string', 'max:500'],
            'years_in_business'  => ['nullable', 'integer', 'min:0', 'max:150'],
            'specialities'       => ['nullable', 'array'],
            'specialities.*'     => ['string', 'max:255'],
            'message'            => ['nullable', 'string', 'max:2000'],
        ];
    }
}
