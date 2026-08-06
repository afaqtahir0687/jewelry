<?php

namespace App\Console\Commands;

use App\Mail\NewContactMessageMail;
use App\Models\ContactMessage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailCommand extends Command
{
    protected $signature   = 'email:test';
    protected $description = 'Send a test email to verify Gmail SMTP configuration';

    public function handle(): void
    {
        $this->info('Sending test email...');

        $msg              = new ContactMessage();
        $msg->name        = 'Test User';
        $msg->email       = 'test@example.com';
        $msg->message     = 'This is a test email from Jewellery Shop PK. Gmail SMTP is working correctly!';
        $msg->created_at  = now();

        try {
            Mail::to(env('ADMIN_EMAIL', 'afaqtahir0687@gmail.com'))
                ->send(new NewContactMessageMail($msg));

            $this->info('✅ Email sent successfully! Check your Gmail inbox.');
        } catch (\Exception $e) {
            $this->error('❌ Failed: ' . $e->getMessage());
        }
    }
}
