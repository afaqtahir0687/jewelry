@extends('emails.layout')

@section('title', 'Lead Status Updated')
@section('badge', 'Status Update')

@section('content')
    <h2>📋 Lead Status Updated</h2>
    <p>The status of lead <strong>{{ $lead->lead_id }}</strong> has been updated.</p>

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
            <span class="label">City</span>
            <span class="value">{{ $lead->city?->name ?? '—' }}</span>
        </div>
        <div class="row">
            <span class="label">Category</span>
            <span class="value">{{ $lead->category?->name ?? '—' }}</span>
        </div>
        @if($lead->jeweller)
        <div class="row">
            <span class="label">Jeweller</span>
            <span class="value">{{ $lead->jeweller->business_name }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">New Status</span>
            <span class="value">
                <span class="status-pill status-{{ $lead->status }}">{{ ucfirst($lead->status) }}</span>
            </span>
        </div>
        @if($lead->sale_amount)
        <div class="row">
            <span class="label">Sale Amount</span>
            <span class="value">PKR {{ number_format($lead->sale_amount, 0) }}</span>
        </div>
        @endif
        @if($lead->commission_amount)
        <div class="row">
            <span class="label">Commission</span>
            <span class="value">PKR {{ number_format($lead->commission_amount, 0) }} ({{ ucfirst($lead->commission_type) }})</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Updated At</span>
            <span class="value">{{ now()->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    @if($lead->notes)
    <p><strong>Admin Notes:</strong><br>{{ $lead->notes }}</p>
    @endif

    <a class="cta-btn" href="{{ config('app.url') }}/admin/leads">View Lead Details →</a>
@endsection
