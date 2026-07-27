<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'status'         => ['sometimes', 'string', 'in:new,contacted,appointment_booked,sale_completed,lost'],
            'jeweller_id'    => ['sometimes', 'nullable', 'exists:jewellers,id'],
            'sale_amount'    => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'payment_status' => ['sometimes', 'string', 'in:unpaid,paid,partial'],
            'notes'          => ['sometimes', 'nullable', 'string', 'max:2000'],
        ];
    }
}
