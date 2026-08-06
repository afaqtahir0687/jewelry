<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JewellerRequest extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'whatsapp',
        'business_name',
        'city_id',
        'area',
        'full_address',
        'years_in_business',
        'specialities',
        'message',
        'status',
        'rejection_reason',
        'user_id',
        'reviewed_at',
    ];

    protected $casts = [
        'specialities'      => 'array',
        'years_in_business' => 'integer',
        'reviewed_at'       => 'datetime',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
