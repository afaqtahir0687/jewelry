<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsletterSubscriberRequest;
use App\Repositories\NewsletterSubscriberRepository;
use Illuminate\Http\RedirectResponse;

class NewsletterController extends Controller
{
    public function __construct(
        protected NewsletterSubscriberRepository $newsletterSubscriberRepository
    ) {}

    public function store(StoreNewsletterSubscriberRequest $request): RedirectResponse
    {
        $this->newsletterSubscriberRepository->subscribe($request->validated('email'));

        return back()->with('success', 'Thank you for subscribing! Watch your inbox for exclusive jewellery offers.');
    }
}
