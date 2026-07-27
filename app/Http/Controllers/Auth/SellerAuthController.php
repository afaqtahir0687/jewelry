<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SellerAuthController extends Controller
{
    public function showLogin(): Response|RedirectResponse
    {
        if (Auth::check() && Auth::user()->hasAnyRole(['seller', 'admin'])) {
            return redirect()->route('seller.dashboard');
        }

        return Inertia::render('Seller/Auth/Login');
    }

    public function login(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        if (! Auth::user()->hasAnyRole(['seller', 'admin'])) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email' => 'These credentials do not match our records or you do not have seller access.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('seller.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('seller.login');
    }
}
