<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(): Response
    {
        $reviews = Review::with(['jeweller'])
            ->latest()
            ->paginate(20)
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
        ]);
    }

    public function update(Review $review): RedirectResponse
    {
        $status = request()->input('status');
        $review->update(['is_approved' => ($status === 'approved')]);

        return back()->with('success', 'Review status updated.');
    }

    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return back()->with('success', 'Review deleted.');
    }
}
