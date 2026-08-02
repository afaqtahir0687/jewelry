<?php

namespace App\Services;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

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

    public function getActiveCategories()
    {
        return $this->categoryRepository->getActiveCategories();
    }

    public function getFeaturedCategories(int $limit = 4)
    {
        return $this->categoryRepository->getFeaturedCategories($limit);
    }

    public function createCategory(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image'] = $data['image']->store('categories', 'public');
        }
        if (isset($data['banner_image']) && $data['banner_image'] instanceof UploadedFile) {
            $data['banner_image'] = $data['banner_image']->store('categories', 'public');
        }

        return $this->categoryRepository->create($data);
    }

    public function updateCategory(int $id, array $data)
    {
        $category = $this->categoryRepository->findOrFail($id);

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
            $data['image'] = $data['image']->store('categories', 'public');
        }
        if (isset($data['banner_image']) && $data['banner_image'] instanceof UploadedFile) {
            if ($category->banner_image && Storage::disk('public')->exists($category->banner_image)) {
                Storage::disk('public')->delete($category->banner_image);
            }
            $data['banner_image'] = $data['banner_image']->store('categories', 'public');
        }

        return $this->categoryRepository->update($data, $id);
    }

    public function deleteCategory(int $id)
    {
        $category = $this->categoryRepository->findOrFail($id);
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }
        if ($category->banner_image && Storage::disk('public')->exists($category->banner_image)) {
            Storage::disk('public')->delete($category->banner_image);
        }

        return $this->categoryRepository->delete($id);
    }

    public function findCategory(int $id)
    {
        return $this->categoryRepository->findOrFail($id);
    }

    public function toggleFeatured(int $id): bool
    {
        $category = $this->categoryRepository->findOrFail($id);
        $newValue = !$category->is_featured;
        $this->categoryRepository->update(['is_featured' => $newValue], $id);
        return $newValue;
    }

    public function toggleActive(int $id): bool
    {
        $category = $this->categoryRepository->findOrFail($id);
        $newValue = !$category->is_active;
        $this->categoryRepository->update(['is_active' => $newValue], $id);
        return $newValue;
    }
}
