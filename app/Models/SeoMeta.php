<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $fillable = [
        'url_path',
        'title',
        'description',
        'keywords',
        'og_image',
    ];
}
