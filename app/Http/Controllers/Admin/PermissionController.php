<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    protected PermissionService $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'sortField', 'sortDirection']);
        $permissions = $this->permissionService->getPaginatedList($filters);
        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions,
            'filters' => $filters
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Permissions/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        $this->permissionService->createPermission($validated);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission created successfully.');
    }

    public function edit($id)
    {
        $permission = $this->permissionService->findPermission($id);

        return Inertia::render('Admin/Permissions/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $id,
        ]);

        $this->permissionService->updatePermission($id, $validated);

        return redirect()->route('admin.permissions.index')->with('success', 'Permission updated successfully.');
    }

    public function destroy($id)
    {
        $this->permissionService->deletePermission($id);
        return redirect()->route('admin.permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
