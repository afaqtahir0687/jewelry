<?php

namespace App\Services;

use App\Repositories\ContactMessageRepository;
use App\Models\ContactMessage;

class ContactMessageService
{
    public function __construct(
        protected ContactMessageRepository $contactMessageRepository
    ) {}

    public function createMessage(array $data): ContactMessage
    {
        return $this->contactMessageRepository->create($data);
    }
}
