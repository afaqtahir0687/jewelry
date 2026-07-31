<?php

namespace App\Services;

use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserService
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->userRepository->getPaginatedList($filters, $perPage);
    }

    public function createUser(array $data)
    {
        $userData = [
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ];

        $user = $this->userRepository->create($userData);

        if (!empty($data['role'])) {
            $user->assignRole($data['role']);
        }

        return $user;
    }

    public function updateUser(int $id, array $data)
    {
        $user = $this->userRepository->findOrFail($id);

        $userData = [
            'name'  => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $userData['password'] = Hash::make($data['password']);
        }

        $this->userRepository->update($userData, $id);

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    public function deleteUser(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function findUser(int $id)
    {
        return $this->userRepository->findOrFail($id);
    }
}
