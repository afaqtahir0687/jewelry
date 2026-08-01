<?php

namespace App\Repositories;

use App\Models\Page;

class PageRepository
{
    public function findBySlug(string $slug): ?Page
    {
        return Page::where('slug', $slug)->where('is_active', true)->first();
    }
}
