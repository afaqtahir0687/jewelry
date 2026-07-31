<?php

namespace App\Services;

use App\Repositories\Contracts\JewellerRepositoryInterface;

class JewellerService
{
    protected JewellerRepositoryInterface $jewellerRepository;

    public function __construct(JewellerRepositoryInterface $jewellerRepository)
    {
        $this->jewellerRepository = $jewellerRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->jewellerRepository->getPaginatedList($filters, $perPage);
    }

    public function createJeweller(array $data)
    {
        return $this->jewellerRepository->create($data);
    }

    public function updateJeweller(int $id, array $data)
    {
        return $this->jewellerRepository->update($data, $id);
    }

    public function deleteJeweller(int $id)
    {
        return $this->jewellerRepository->delete($id);
    }

    public function findJeweller(int $id)
    {
        return $this->jewellerRepository->findOrFail($id);
    }
}
