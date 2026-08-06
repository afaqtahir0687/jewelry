@extends('emails.layout')

@section('title', 'New Lead Received')
@section('badge', 'New Lead')

@section('content')
    <h2>🔔 New Lead Received</h2>
    <p>A new custom jewellery quote request has been submitted on Jewellery Shop PK.</p>

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
            <span class="label">Phone</span>
            <span class="value">{{ $lead->customer_phone }}</span>
        </div>
        @if($lead->customer_email)
        <div class="row">
            <span class="label">Email</span>
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
        @if($lead->jeweller)
        <div class="row">
            <span class="label">Assigned To</span>
            <span class="value">{{ $lead->jeweller->business_name }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Status</span>
            <span class="value">
                <span class="status-pill status-{{ $lead->status }}">{{ ucfirst($lead->status) }}</span>
            </span>
        </div>
        <div class="row">
            <span class="label">Submitted At</span>
            <span class="value">{{ $lead->created_at->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    @if($lead->requirement_description)
    <p><strong>Requirement:</strong><br>{{ $lead->requirement_description }}</p>
    @endif

    <a class="cta-btn" href="{{ config('app.url') }}/admin/leads">View in Admin Panel →</a>
@endsection
