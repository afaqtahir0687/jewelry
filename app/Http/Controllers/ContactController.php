<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Services\ContactMessageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected ContactMessageService $contactMessageService
    ) {}

    public function index(): Response
    {
        return Inertia::render('ContactUs');
    }

    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        $this->contactMessageService->createMessage($request->validated());

        return back()->with('success', 'Thank you for your message. We will get back to you soon.');
    }
}
