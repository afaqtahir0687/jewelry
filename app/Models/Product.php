<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'jeweller_id',
        'category_id',
        'subcategory_id',
        'images',           // kept for legacy compatibility during migration
        'description',
        'price_on_request',
        'price',
        'discount_price',
        'gold_purity',
        'approximate_weight',
        'stone_info',
        'status',
        'customisation_options',
        'is_featured',
        'is_latest_arrival',
        'sort_order',
    ];

    protected $casts = [
        'images'            => 'array',
        'price_on_request'  => 'boolean',
        'price'             => 'decimal:2',
        'discount_price'    => 'decimal:2',
        'is_featured'       => 'boolean',
        'is_latest_arrival' => 'boolean',
        'sort_order'        => 'integer',
    ];

    // ─── Relationships ─────────────────────────────────────────────────────────

    public function jeweller(): BelongsTo
    {
        return $this->belongsTo(Jeweller::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    // ─── Accessors ─────────────────────────────────────────────────────────────

    /**
     * Get the URL of the primary (first) image.
     * Falls back to the legacy JSON images column if no productImages exist.
     */
    public function getPrimaryImageUrlAttribute(): ?string
    {
        $first = $this->productImages->first();
        if ($first) {
            return $first->url;
        }

        // Legacy fallback: images JSON column
        $legacy = $this->images;
        if (!empty($legacy)) {
            $img = is_array($legacy) ? $legacy[0] : json_decode($legacy, true)[0] ?? null;
            return $img;
        }

        return null;
    }

    /**
     * Get the URL of the hover (second) image.
     * Falls back to the primary image if only one image exists.
     */
    public function getHoverImageUrlAttribute(): ?string
    {
        $images = $this->productImages;
        $second = $images->skip(1)->first();
        if ($second) {
            return $second->url;
        }

        // Fall back to primary image
        return $this->primary_image_url;
    }
}
