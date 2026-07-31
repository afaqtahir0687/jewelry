<?php

namespace App\Services;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class RoleService
{
    protected RoleRepositoryInterface $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->roleRepository->getPaginatedList($filters, $perPage);
    }

    public function getAllRoles()
    {
        return $this->roleRepository->all();
    }

    public function createRole(array $data)
    {
        DB::beginTransaction();
        try {
            $role = $this->roleRepository->create([
                'name' => $data['name'],
                'guard_name' => 'admin'
            ]);

            if (isset($data['permissions'])) {
                $this->roleRepository->syncPermissions($role->id, $data['permissions']);
            }

            DB::commit();
            return $role;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Role creation failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function updateRole(int $id, array $data)
    {
        DB::beginTransaction();
        try {
            $role = $this->roleRepository->update(['name' => $data['name']], $id);

            if (isset($data['permissions'])) {
                $this->roleRepository->syncPermissions($id, $data['permissions']);
            }

            DB::commit();
            return $role;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Role update failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function deleteRole(int $id)
    {
        return $this->roleRepository->delete($id);
    }

    public function findRole(int $id)
    {
        return $this->roleRepository->findOrFail($id);
    }
}
