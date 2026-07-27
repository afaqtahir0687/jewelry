<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(\App\Repositories\Contracts\CityRepositoryInterface::class, \App\Repositories\Eloquent\CityRepository::class);
        $this->app->bind(\App\Repositories\Contracts\CategoryRepositoryInterface::class, \App\Repositories\Eloquent\CategoryRepository::class);
        $this->app->bind(\App\Repositories\Contracts\JewellerRepositoryInterface::class, \App\Repositories\Eloquent\JewellerRepository::class);
        $this->app->bind(\App\Repositories\Contracts\LeadRepositoryInterface::class, \App\Repositories\Eloquent\LeadRepository::class);
        $this->app->bind(\App\Repositories\Contracts\ProductRepositoryInterface::class, \App\Repositories\Eloquent\ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
