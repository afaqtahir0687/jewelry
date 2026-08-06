@extends('emails.layout')

@section('title', 'New Partner Application')
@section('badge', 'New Application')

@section('content')
    <h2>🤝 New Partner Application</h2>
    <p>A jeweller has applied to become a verified partner on Online Jewelry Shop.</p>

    <div class="info-card">
        <div class="row">
            <span class="label">Business Name</span>
            <span class="value"><strong>{{ $jewellerRequest->business_name }}</strong></span>
        </div>
        <div class="row">
            <span class="label">Contact Name</span>
            <span class="value">{{ $jewellerRequest->name }}</span>
        </div>
        <div class="row">
            <span class="label">Email</span>
            <span class="value">{{ $jewellerRequest->email }}</span>
        </div>
        <div class="row">
            <span class="label">Phone</span>
            <span class="value">{{ $jewellerRequest->phone }}</span>
        </div>
        @if($jewellerRequest->whatsapp)
        <div class="row">
            <span class="label">WhatsApp</span>
            <span class="value">{{ $jewellerRequest->whatsapp }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">City</span>
            <span class="value">{{ $jewellerRequest->city?->name ?? '—' }}</span>
        </div>
        @if($jewellerRequest->years_in_business)
        <div class="row">
            <span class="label">Years in Business</span>
            <span class="value">{{ $jewellerRequest->years_in_business }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Submitted At</span>
            <span class="value">{{ $jewellerRequest->created_at->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    @if($jewellerRequest->message)
    <p><strong>Message:</strong><br>{{ $jewellerRequest->message }}</p>
    @endif

    <a class="cta-btn" href="{{ config('app.url') }}/admin/partner-requests">Review Application →</a>
@endsection
