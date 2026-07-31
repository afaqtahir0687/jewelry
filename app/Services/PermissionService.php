<?php

namespace App\Services;

use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class PermissionService
{
    protected PermissionRepositoryInterface $permissionRepository;

    public function __construct(PermissionRepositoryInterface $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->permissionRepository->getPaginatedList($filters, $perPage);
    }

    public function getAllPermissions()
    {
        return $this->permissionRepository->all();
    }

    public function createPermission(array $data)
    {
        try {
            return $this->permissionRepository->create([
                'name' => $data['name'],
                'guard_name' => 'admin'
            ]);
        } catch (Exception $e) {
            Log::error('Permission creation failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function updatePermission(int $id, array $data)
    {
        try {
            return $this->permissionRepository->update(['name' => $data['name']], $id);
        } catch (Exception $e) {
            Log::error('Permission update failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function deletePermission(int $id)
    {
        return $this->permissionRepository->delete($id);
    }

    public function findPermission(int $id)
    {
        return $this->permissionRepository->findOrFail($id);
    }
}
