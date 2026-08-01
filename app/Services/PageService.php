<?php

namespace App\Services;

use App\Repositories\PageRepository;
use App\Models\Page;

class PageService
{
    public function __construct(
        protected PageRepository $pageRepository
    ) {}

    public function getPageBySlug(string $slug): ?Page
    {
        return $this->pageRepository->findBySlug($slug);
    }
}
