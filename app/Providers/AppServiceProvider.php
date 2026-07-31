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
        $this->app->bind(\App\Repositories\Contracts\RoleRepositoryInterface::class, \App\Repositories\Eloquent\RoleRepository::class);
        $this->app->bind(\App\Repositories\Contracts\PermissionRepositoryInterface::class, \App\Repositories\Eloquent\PermissionRepository::class);
        $this->app->bind(\App\Repositories\Contracts\ReviewRepositoryInterface::class, \App\Repositories\Eloquent\ReviewRepository::class);
        $this->app->bind(\App\Repositories\Contracts\UserRepositoryInterface::class, \App\Repositories\Eloquent\UserRepository::class);
        $this->app->bind(\App\Repositories\Contracts\AppointmentRepositoryInterface::class, \App\Repositories\Eloquent\AppointmentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
