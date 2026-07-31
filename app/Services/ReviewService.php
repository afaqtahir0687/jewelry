<?php

namespace App\Services;

use App\Repositories\Contracts\ReviewRepositoryInterface;

class ReviewService
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->reviewRepository->getPaginatedList($filters, $perPage);
    }

    public function createReview(array $data)
    {
        return $this->reviewRepository->create($data);
    }

    public function updateReview(int $id, array $data)
    {
        return $this->reviewRepository->update($data, $id);
    }

    public function deleteReview(int $id)
    {
        return $this->reviewRepository->delete($id);
    }

    public function findReview(int $id)
    {
        return $this->reviewRepository->findOrFail($id);
    }
}
