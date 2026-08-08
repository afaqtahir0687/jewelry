<?php

namespace App\Repositories;

use App\Models\NewsletterSubscriber;

class NewsletterSubscriberRepository
{
    public function subscribe(string $email): NewsletterSubscriber
    {
        return NewsletterSubscriber::firstOrCreate(['email' => $email]);
    }
}
