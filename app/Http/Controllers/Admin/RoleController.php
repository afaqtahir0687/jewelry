<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RoleService;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    protected RoleService $roleService;
    protected PermissionService $permissionService;

    public function __construct(RoleService $roleService, PermissionService $permissionService)
    {
        $this->roleService = $roleService;
        $this->permissionService = $permissionService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'sortField', 'sortDirection']);
        $roles = $this->roleService->getPaginatedList($filters);
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'filters' => $filters
        ]);
    }

    public function create()
    {
        $permissions = $this->permissionService->getAllPermissions();
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name'
        ]);

        $this->roleService->createRole($validated);

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    public function edit($id)
    {
        $role = $this->roleService->findRole($id);
        $role->load('permissions');
        $permissions = $this->permissionService->getAllPermissions();

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name'
        ]);

        $this->roleService->updateRole($id, $validated);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy($id)
    {
        $this->roleService->deleteRole($id);
        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}
