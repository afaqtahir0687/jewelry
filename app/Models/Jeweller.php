<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jeweller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'slug',
        'logo',
        'cover_image',
        'shop_gallery',
        'city_id',
        'area',
        'full_address',
        'google_maps_link',
        'phone',
        'whatsapp',
        'business_timings',
        'years_in_business',
        'specialities',
        'custom_order_available',
        'delivery_available',
        'repair_services_available',
        'payment_methods',
        'return_policy',
        'is_verified',
        'verified_at',
    ];

    protected $casts = [
        'shop_gallery' => 'array',
        'specialities' => 'array',
        'payment_methods' => 'array',
        'custom_order_available' => 'boolean',
        'delivery_available' => 'boolean',
        'repair_services_available' => 'boolean',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
