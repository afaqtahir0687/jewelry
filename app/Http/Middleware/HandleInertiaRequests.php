<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'seo_meta' => function () use ($request) {
                // Ignore admin/seller routes for SEO
                if ($request->is('admin*') || $request->is('seller*')) {
                    return null;
                }
                
                // Get path with a leading slash to match how it's usually entered
                $path = '/' . ltrim($request->path(), '/');
                
                $seoService = app(\App\Services\SeoMetaService::class);
                return $seoService->getSeoForPath($path);
            },
            // Share active categories for dynamic nav/footer (cached per request)
            'nav_categories' => function () use ($request) {
                if ($request->is('admin*') || $request->is('seller*')) {
                    return [];
                }
                return \App\Models\Category::where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->get(['id', 'name', 'slug'])
                    ->map(fn ($c) => ['id' => $c->id, 'name' => $c->name, 'slug' => $c->slug])
                    ->values();
            },
        ];
    }
}
