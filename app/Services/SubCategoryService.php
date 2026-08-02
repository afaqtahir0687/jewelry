<?php

namespace App\Services;

use App\Repositories\Contracts\SubCategoryRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class SubCategoryService
{
    protected SubCategoryRepositoryInterface $subCategoryRepository;

    public function __construct(SubCategoryRepositoryInterface $subCategoryRepository)
    {
        $this->subCategoryRepository = $subCategoryRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->subCategoryRepository->getPaginatedList($filters, $perPage);
    }

    public function createSubCategory(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $data['image']->store('subcategories', 'public');
        }
        return $this->subCategoryRepository->create($data);
    }

    public function updateSubCategory(int $id, array $data)
    {
        $subcategory = $this->subCategoryRepository->findOrFail($id);

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
                Storage::disk('public')->delete($subcategory->image);
            }
            $data['image'] = $data['image']->store('subcategories', 'public');
        }

        return $this->subCategoryRepository->update($data, $id);
    }

    public function deleteSubCategory(int $id)
    {
        $subcategory = $this->subCategoryRepository->findOrFail($id);
        if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
            Storage::disk('public')->delete($subcategory->image);
        }
        return $this->subCategoryRepository->delete($id);
    }

    public function findSubCategory(int $id)
    {
        return $this->subCategoryRepository->findOrFail($id);
    }

    public function getByCategory(int $categoryId)
    {
        return $this->subCategoryRepository->getByCategory($categoryId);
    }

    public function getActiveByCategory(int $categoryId)
    {
        return $this->subCategoryRepository->getActiveByCategory($categoryId);
    }
}
