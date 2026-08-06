@extends('emails.layout')

@section('title', 'Lead Assigned to You')
@section('badge', 'Lead Assigned')

@section('content')
    <h2>🏆 New Lead Assigned to You</h2>
    <p>Congratulations! A new customer lead has been assigned to <strong>{{ $lead->jeweller?->business_name }}</strong>. Please contact the customer at your earliest.</p>

    <div class="info-card">
        <div class="row">
            <span class="label">Lead ID</span>
            <span class="value"><strong>{{ $lead->lead_id }}</strong></span>
        </div>
        <div class="row">
            <span class="label">Customer Name</span>
            <span class="value">{{ $lead->customer_name }}</span>
        </div>
        <div class="row">
            <span class="label">Customer Phone</span>
            <span class="value">{{ $lead->customer_phone }}</span>
        </div>
        @if($lead->customer_email)
        <div class="row">
            <span class="label">Customer Email</span>
            <span class="value">{{ $lead->customer_email }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">City</span>
            <span class="value">{{ $lead->city?->name ?? '—' }}</span>
        </div>
        <div class="row">
            <span class="label">Category</span>
            <span class="value">{{ $lead->category?->name ?? '—' }}</span>
        </div>
        @if($lead->budget)
        <div class="row">
            <span class="label">Budget</span>
            <span class="value">{{ $lead->budget }}</span>
        </div>
        @endif
        @if($lead->preferred_contact_time)
        <div class="row">
            <span class="label">Preferred Contact Time</span>
            <span class="value">{{ $lead->preferred_contact_time }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Assigned At</span>
            <span class="value">{{ now()->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    @if($lead->requirement_description)
    <p><strong>Customer Requirement:</strong><br>{{ $lead->requirement_description }}</p>
    @endif

    <hr class="divider">
    <p style="font-size: 13px; color: #888;">Please reach out to the customer within 24 hours to maintain our quality standards.</p>
@endsection
