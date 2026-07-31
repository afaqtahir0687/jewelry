<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductService
{
    protected ProductRepositoryInterface $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->productRepository->getPaginatedList($filters, $perPage);
    }

    public function createProduct(array $data)
    {
        return $this->productRepository->create($data);
    }

    public function updateProduct(int $id, array $data)
    {
        return $this->productRepository->update($data, $id);
    }

    public function deleteProduct(int $id)
    {
        return $this->productRepository->delete($id);
    }

    public function findProduct(int $id)
    {
        return $this->productRepository->findOrFail($id);
    }
}
