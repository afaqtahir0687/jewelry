<?php

namespace App\Mail;

use App\Models\JewellerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewPartnerRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly JewellerRequest $jewellerRequest)
    {
        $this->jewellerRequest->load('city');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Partner Application — ' . $this->jewellerRequest->business_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.partner-requests.new-partner-request',
        );
    }
}
