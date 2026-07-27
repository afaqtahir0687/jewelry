<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'jeweller_id',
        'category_id',
        'images',
        'description',
        'price_on_request',
        'price',
        'gold_purity',
        'approximate_weight',
        'stone_info',
        'status',
        'customisation_options',
    ];

    protected $casts = [
        'images' => 'array',
        'price_on_request' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function jeweller(): BelongsTo
    {
        return $this->belongsTo(Jeweller::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
