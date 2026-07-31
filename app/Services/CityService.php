<?php

namespace App\Services;

use App\Repositories\Contracts\CityRepositoryInterface;

class CityService
{
    protected CityRepositoryInterface $cityRepository;

    public function __construct(CityRepositoryInterface $cityRepository)
    {
        $this->cityRepository = $cityRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->cityRepository->getPaginatedList($filters, $perPage);
    }

    public function createCity(array $data)
    {
        return $this->cityRepository->create($data);
    }

    public function updateCity(int $id, array $data)
    {
        return $this->cityRepository->update($data, $id);
    }

    public function deleteCity(int $id)
    {
        return $this->cityRepository->delete($id);
    }

    public function findCity(int $id)
    {
        return $this->cityRepository->findOrFail($id);
    }
}
