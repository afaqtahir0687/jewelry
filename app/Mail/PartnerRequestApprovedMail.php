<?php

namespace App\Mail;

use App\Models\JewellerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PartnerRequestApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param string|null $temporaryPassword Only set when a brand-new user account was created for this applicant.
     */
    public function __construct(
        public readonly JewellerRequest $jewellerRequest,
        public readonly ?string $temporaryPassword = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Partner Application Has Been Approved 🎉',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.partner-requests.partner-request-approved',
        );
    }
}
