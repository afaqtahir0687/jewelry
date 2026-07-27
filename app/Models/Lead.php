<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'customer_name',
        'customer_phone',
        'city_id',
        'category_id',
        'jeweller_id',
        'requirement_description',
        'budget',
        'reference_image',
        'preferred_contact_time',
        'status',
        'sale_amount',
        'commission_type',
        'commission_amount',
        'payment_status',
        'notes',
    ];

    protected $casts = [
        'sale_amount' => 'decimal:2',
        'commission_amount' => 'decimal:2',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function jeweller(): BelongsTo
    {
        return $this->belongsTo(Jeweller::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
