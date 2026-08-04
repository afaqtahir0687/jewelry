<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Str;

class ProductService
{
    protected ProductRepositoryInterface $productRepository;
    protected UploadService $uploadService;

    public function __construct(ProductRepositoryInterface $productRepository, UploadService $uploadService)
    {
        $this->productRepository = $productRepository;
        $this->uploadService = $uploadService;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->productRepository->getPaginatedList($filters, $perPage);
    }

    public function getLatestArrivals(int $limit = 8)
    {
        return $this->productRepository->getLatestArrivals($limit);
    }

    public function getFeaturedProducts(int $limit = 8)
    {
        return $this->productRepository->getFeaturedProducts($limit);
    }

    public function getRelatedProducts(int $categoryId, int $excludeProductId, int $limit = 8)
    {
        return $this->productRepository->getRelatedProducts($categoryId, $excludeProductId, $limit);
    }

    public function findProduct(int $id)
    {
        return $this->productRepository->findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return $this->productRepository->findBySlug($slug);
    }

    /**
     * Create a product and store uploaded images.
     *
     * @param  array                                     $data
     * @param  \Illuminate\Http\UploadedFile[]|null      $imageFiles
     * @return Product
     */
    public function storeWithImages(array $data, ?array $imageFiles = []): Product
    {
        // Auto-generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        /** @var Product $product */
        $product = $this->productRepository->create($data);

        $this->saveImages($product, $imageFiles ?? []);

        return $product;
    }

    /**
     * Update a product and handle image changes.
     *
     * @param  int                                       $id
     * @param  array                                     $data
     * @param  \Illuminate\Http\UploadedFile[]|null      $newImageFiles
     * @param  int[]                                     $deletedImageIds
     * @return void
     */
    public function updateWithImages(int $id, array $data, ?array $newImageFiles = [], array $deletedImageIds = []): void
    {
        $this->productRepository->update($data, $id);

        // Delete removed images
        foreach ($deletedImageIds as $imageId) {
            $this->deleteSingleImage((int) $imageId);
        }

        // Store new images
        /** @var Product $product */
        $product = $this->productRepository->findOrFail($id);
        $this->saveImages($product, $newImageFiles ?? []);
    }

    /**
     * Delete a product and all its associated images from storage and DB.
     */
    public function deleteWithImages(int $id): void
    {
        /** @var Product $product */
        $product = $this->productRepository->findOrFail($id);

        foreach ($product->productImages as $image) {
            $this->deleteImageFile($image->path);
        }

        $this->productRepository->delete($id);
    }

    /**
     * Reorder product images by providing an ordered array of image IDs.
     *
     * @param  int   $productId
     * @param  int[] $orderedIds
     */
    public function reorderImages(int $productId, array $orderedIds): void
    {
        foreach ($orderedIds as $sortOrder => $imageId) {
            ProductImage::where('product_id', $productId)
                ->where('id', $imageId)
                ->update(['sort_order' => $sortOrder]);
        }
    }

    /**
     * Delete a single ProductImage record and its file from storage.
     */
    public function deleteSingleImage(int $imageId): void
    {
        $image = ProductImage::find($imageId);
        if ($image) {
            $this->deleteImageFile($image->path);
            $image->delete();
        }
    }

    // ─── Private Helpers ───────────────────────────────────────────────────────

    private function saveImages(Product $product, array $files): void
    {
        $offset = $product->productImages()->count();

        foreach ($files as $index => $file) {
            $path = $this->uploadService->upload($file, 'products');
            ProductImage::create([
                'product_id' => $product->id,
                'path'       => $path,
                'sort_order' => $offset + $index,
            ]);
        }
    }

    private function deleteImageFile(string $path): void
    {
        $this->uploadService->delete($path);
    }
}
