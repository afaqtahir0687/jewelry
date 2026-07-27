<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('roles')
            ->withCount('jeweller')
            ->latest()
            ->paginate(20)
            ->through(fn ($u) => [
                'id'           => $u->id,
                'name'         => $u->name,
                'email'        => $u->email,
                'roles'        => $u->roles->pluck('name'),
                'has_jeweller' => $u->jeweller_count > 0,
                'created_at'   => $u->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name'     => $request->validated('name'),
            'email'    => $request->validated('email'),
            'password' => Hash::make($request->validated('password')),
        ]);

        $user->assignRole($request->validated('role'));

        return back()->with('success', 'User created successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->hasRole('admin') && User::role('admin')->count() === 1) {
            return back()->with('error', 'Cannot delete the last admin user.');
        }

        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
