<?php

namespace App\Services;

use App\Models\SeoMeta;
use App\Repositories\SeoMetaRepository;

class SeoMetaService
{
    public function __construct(
        protected SeoMetaRepository $repository
    ) {}

    /**
     * Get SEO metadata for a given path
     *
     * @param string $path
     * @return SeoMeta|null
     */
    public function getSeoForPath(string $path): ?SeoMeta
    {
        // Check exact path match
        $seo = $this->repository->findByPath($path);
        
        // If not found, and path has trailing slash, try without it (and vice-versa)
        if (!$seo) {
            $altPath = str_ends_with($path, '/') ? rtrim($path, '/') : $path . '/';
            $seo = $this->repository->findByPath($altPath);
        }

        return $seo;
    }
}
