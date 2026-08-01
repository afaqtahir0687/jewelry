<?php

namespace App\Repositories;

use App\Models\SeoMeta;

class SeoMetaRepository
{
    /**
     * Get SEO meta by URL path
     *
     * @param string $path
     * @return SeoMeta|null
     */
    public function findByPath(string $path): ?SeoMeta
    {
        return SeoMeta::where('url_path', $path)->first();
    }
}
