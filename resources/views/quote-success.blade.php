@extends('layouts.app')

@section('title', 'Quotation Submitted Successfully | Online Jewelry Shop')

@section('content')

    <section class="py-20 bg-cream flex-grow flex items-center justify-center">
        <div class="max-w-xl mx-auto px-4 text-center">
            
            <!-- Icon checkmark -->
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-sm border border-green-200">
                <i class="fa-solid fa-check text-4xl"></i>
            </div>

            <h1 class="font-luxury text-3xl font-bold text-charcoal mb-3">Inquiry Submitted Successfully!</h1>
            <p class="text-gray-500 text-sm mb-8">
                Thank you, <strong>{{ $lead->customer_name }}</strong>. Your inquiry has been logged in our CRM database. Our team will verify and route this to a local partner.
            </p>

            <!-- Lead ID Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-md p-6 max-w-sm mx-auto mb-8 text-left">
                <span class="text-xxs text-gray-400 font-bold uppercase tracking-widest block mb-1">Your Unique Lead ID</span>
                
                <div class="flex items-center justify-between bg-cream p-3 rounded border border-gray-100 mb-4">
                    <span id="lead-id-text" class="font-mono text-base font-bold text-charcoal tracking-wide">{{ $lead->lead_id }}</span>
                    <button onclick="copyLeadId()" class="text-xs text-gold font-bold hover:text-gold-hover focus:outline-none">
                        <i class="fa-solid fa-copy mr-1"></i> Copy
                    </button>
                </div>

                <div class="space-y-3 text-xs text-gray-600">
                    <div><strong>City:</strong> {{ $lead->city->name }}</div>
                    @if($lead->jeweller)
                        <div><strong>Seller Routing:</strong> {{ $lead->jeweller->business_name }} ({{ $lead->jeweller->area }})</div>
                    @else
                        <div><strong>Seller Routing:</strong> Open Matching (Sellers in {{ $lead->city->name }})</div>
                    @endif
                    <div><strong>Status:</strong> <span class="bg-blue-50 text-blue-700 font-bold uppercase text-[9px] px-2 py-0.5 rounded border border-blue-100">{{ str_replace('_', ' ', $lead->status) }}</span></div>
                </div>
            </div>

            <!-- What Happens Next Roadmap -->
            <div class="max-w-md mx-auto text-left space-y-4 mb-8">
                <h3 class="font-luxury text-base font-bold text-charcoal border-b border-gray-100 pb-2">What Happens Next?</h3>
                
                <div class="flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <p class="text-xs text-gray-500 leading-relaxed">
                        <strong>Lead Assignment:</strong> Your lead ID has been generated. The system matches and routes this inquiry to top verified jewellers in {{ $lead->city->name }}.
                    </p>
                </div>

                <div class="flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                    <p class="text-xs text-gray-500 leading-relaxed">
                        <strong>Seller Notification:</strong> Selected partner jewellers will receive immediate email and dashboard alerts containing your requirement specifications.
                    </p>
                </div>

                <div class="flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                    <p class="text-xs text-gray-500 leading-relaxed">
                        <strong>Quote Release & WhatsApp:</strong> The assigned seller will contact you directly on WhatsApp or phone with price quotations. A confirmation email has been dispatched to you.
                    </p>
                </div>
            </div>

            <!-- Return CTA button -->
            <a href="{{ route('home') }}" class="inline-block bg-charcoal hover:bg-charcoal/90 text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded shadow">
                Back to Home
            </a>

        </div>
    </section>

    <!-- Copy to Clipboard script -->
    <script>
        function copyLeadId() {
            const leadIdText = document.getElementById('lead-id-text').innerText;
            navigator.clipboard.writeText(leadIdText).then(() => {
                alert('Lead ID Copied to Clipboard!');
            });
        }
    </script>

@endsection
