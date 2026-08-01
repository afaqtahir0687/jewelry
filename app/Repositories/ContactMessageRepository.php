<?php

namespace App\Repositories;

use App\Models\ContactMessage;

class ContactMessageRepository
{
    public function create(array $data): ContactMessage
    {
        return ContactMessage::create($data);
    }
}
