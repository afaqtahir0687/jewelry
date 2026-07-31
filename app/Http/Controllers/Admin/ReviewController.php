<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;
use App\Services\ReviewService;

class ReviewController extends Controller
{
    protected ReviewService $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'sortField', 'sortDirection']);
        $reviews = $this->reviewService->getPaginatedList($filters)
            ->through(fn ($r) => [
                'id'            => $r->id,
                'jeweller'      => $r->jeweller?->business_name,
                'reviewer_name' => $r->reviewer_name,
                'rating'        => $r->rating,
                'comment'       => $r->comment,
                'status'        => $r->is_approved ? 'approved' : 'pending',
                'created_at'    => $r->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $filters
        ]);
    }

    public function update(Review $review): RedirectResponse
    {
        $status = request()->input('status');
        $this->reviewService->updateReview($review->id, ['is_approved' => ($status === 'approved')]);

        return back()->with('success', 'Review status updated.');
    }

    public function destroy(Review $review): RedirectResponse
    {
        $this->reviewService->deleteReview($review->id);

        return back()->with('success', 'Review deleted.');
    }
}
