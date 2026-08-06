<?php

namespace App\Mail;

use App\Models\JewellerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PartnerRequestRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly JewellerRequest $jewellerRequest) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Update on Your Partner Application',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.partner-requests.partner-request-rejected',
        );
    }
}
