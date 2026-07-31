<?php

namespace App\Services;

use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryService
{
    protected CategoryRepositoryInterface $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->categoryRepository->getPaginatedList($filters, $perPage);
    }

    public function createCategory(array $data)
    {
        return $this->categoryRepository->create($data);
    }

    public function updateCategory(int $id, array $data)
    {
        return $this->categoryRepository->update($data, $id);
    }

    public function deleteCategory(int $id)
    {
        return $this->categoryRepository->delete($id);
    }

    public function findCategory(int $id)
    {
        return $this->categoryRepository->findOrFail($id);
    }
}
