<?php

namespace App\Http\Controllers;

use App\Services\PageService;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        protected PageService $pageService
    ) {}

    public function show(string $slug)
    {
        $page = $this->pageService->getPageBySlug($slug);

        if (!$page) {
            abort(404);
        }

        return Inertia::render('DynamicPage', [
            'page' => $page
        ]);
    }
}
