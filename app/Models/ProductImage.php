<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'path',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the public URL for this image.
     * Supports both external URLs (http/https) and local storage paths.
     */
    public function getUrlAttribute(): string
    {
        if (str_starts_with($this->path, 'http')) {
            return $this->path;
        }
        return asset($this->path);
    }
}
