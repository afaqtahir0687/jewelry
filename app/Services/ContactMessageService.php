<?php

namespace App\Services;

use App\Repositories\ContactMessageRepository;
use App\Models\ContactMessage;

class ContactMessageService
{
    public function __construct(
        protected ContactMessageRepository $contactMessageRepository,
        protected EmailService $emailService
    ) {}

    public function createMessage(array $data): ContactMessage
    {
        $contactMessage = $this->contactMessageRepository->create($data);

        // Email: notify admin of new contact message
        $this->emailService->sendContactMessageNotification($contactMessage);

        return $contactMessage;
    }
}
