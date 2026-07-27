<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\JewellerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\SellerAuthController;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Seller;
use Illuminate\Support\Facades\Route;

// ─────────────────────────────────────────────────────────────────────────────
// Public Front-end Routes
// ─────────────────────────────────────────────────────────────────────────────

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');
Route::get('/find-a-jeweller', [JewellerController::class, 'index'])->name('search.index');
Route::get('/custom-jewellery', [LeadController::class, 'custom'])->name('lead.custom');
Route::post('/custom-jewellery', [LeadController::class, 'store'])->name('lead.store');
Route::get('/custom-jewellery/success', [LeadController::class, 'success'])->name('lead.success');
Route::get('/jewellers/{city:slug}', [CityController::class, 'show'])->name('city.show');
Route::get('/jeweller/{jeweller:slug}', [JewellerController::class, 'show'])->name('jeweller.show');

// ─────────────────────────────────────────────────────────────────────────────
// Admin Portal
// ─────────────────────────────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->group(function () {

    // Auth (unauthenticated)
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->middleware('auth')->name('logout');

    // Protected admin routes
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

        // Leads
        Route::get('/leads', [Admin\LeadController::class, 'index'])->name('leads.index');
        Route::get('/leads/{lead}', [Admin\LeadController::class, 'show'])->name('leads.show');
        Route::patch('/leads/{lead}', [Admin\LeadController::class, 'update'])->name('leads.update');
        Route::delete('/leads/{lead}', [Admin\LeadController::class, 'destroy'])->name('leads.destroy');

        // Jewellers
        Route::get('/jewellers', [Admin\JewellerController::class, 'index'])->name('jewellers.index');
        Route::get('/jewellers/create', [Admin\JewellerController::class, 'create'])->name('jewellers.create');
        Route::post('/jewellers', [Admin\JewellerController::class, 'store'])->name('jewellers.store');
        Route::get('/jewellers/{jeweller}/edit', [Admin\JewellerController::class, 'edit'])->name('jewellers.edit');
        Route::patch('/jewellers/{jeweller}', [Admin\JewellerController::class, 'update'])->name('jewellers.update');
        Route::delete('/jewellers/{jeweller}', [Admin\JewellerController::class, 'destroy'])->name('jewellers.destroy');

        // Products
        Route::get('/products', [Admin\ProductController::class, 'index'])->name('products.index');
        Route::delete('/products/{product}', [Admin\ProductController::class, 'destroy'])->name('products.destroy');

        // Appointments
        Route::get('/appointments', [Admin\AppointmentController::class, 'index'])->name('appointments.index');
        Route::patch('/appointments/{appointment}', [Admin\AppointmentController::class, 'update'])->name('appointments.update');
        Route::delete('/appointments/{appointment}', [Admin\AppointmentController::class, 'destroy'])->name('appointments.destroy');

        // Categories
        Route::get('/categories', [Admin\CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [Admin\CategoryController::class, 'store'])->name('categories.store');
        Route::patch('/categories/{category}', [Admin\CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [Admin\CategoryController::class, 'destroy'])->name('categories.destroy');

        // Cities
        Route::get('/cities', [Admin\CityController::class, 'index'])->name('cities.index');
        Route::post('/cities', [Admin\CityController::class, 'store'])->name('cities.store');
        Route::patch('/cities/{city}', [Admin\CityController::class, 'update'])->name('cities.update');
        Route::delete('/cities/{city}', [Admin\CityController::class, 'destroy'])->name('cities.destroy');

        // Reviews
        Route::get('/reviews', [Admin\ReviewController::class, 'index'])->name('reviews.index');
        Route::patch('/reviews/{review}', [Admin\ReviewController::class, 'update'])->name('reviews.update');
        Route::delete('/reviews/{review}', [Admin\ReviewController::class, 'destroy'])->name('reviews.destroy');

        // Users
        Route::get('/users', [Admin\UserController::class, 'index'])->name('users.index');
        Route::post('/users', [Admin\UserController::class, 'store'])->name('users.store');
        Route::delete('/users/{user}', [Admin\UserController::class, 'destroy'])->name('users.destroy');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Seller Portal
// ─────────────────────────────────────────────────────────────────────────────

Route::prefix('seller')->name('seller.')->group(function () {

    // Auth (unauthenticated)
    Route::get('/login', [SellerAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [SellerAuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [SellerAuthController::class, 'logout'])->middleware('auth')->name('logout');

    // Protected seller routes
    Route::middleware(['auth', 'seller'])->group(function () {
        Route::get('/', [Seller\DashboardController::class, 'index'])->name('dashboard');

        // Leads (read + update only)
        Route::get('/leads', [Seller\LeadController::class, 'index'])->name('leads.index');
        Route::get('/leads/{lead}', [Seller\LeadController::class, 'show'])->name('leads.show');
        Route::get('/leads/{lead}/edit', [Seller\LeadController::class, 'edit'])->name('leads.edit');
        Route::patch('/leads/{lead}', [Seller\LeadController::class, 'update'])->name('leads.update');

        // Products (full CRUD)
        Route::get('/products', [Seller\ProductController::class, 'index'])->name('products.index');
        Route::get('/products/create', [Seller\ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [Seller\ProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [Seller\ProductController::class, 'edit'])->name('products.edit');
        Route::patch('/products/{product}', [Seller\ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [Seller\ProductController::class, 'destroy'])->name('products.destroy');

        // Appointments (read + update status only)
        Route::get('/appointments', [Seller\AppointmentController::class, 'index'])->name('appointments.index');
        Route::patch('/appointments/{appointment}', [Seller\AppointmentController::class, 'update'])->name('appointments.update');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic category page (must be last to avoid conflicts)
// ─────────────────────────────────────────────────────────────────────────────

Route::get('/{category:slug}', [CategoryController::class, 'show'])->name('category.show');
