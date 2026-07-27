@extends('layouts.app')

@section('title', $jeweller->business_name . ' | Verified Jeweller in ' . $jeweller->city->name)
@section('meta_description', 'View products, location, timings, and verified badges for ' . $jeweller->business_name . ' in ' . $jeweller->area . ', ' . $jeweller->city->name . '.')

@section('content')

    <!-- Jeweller Profile Header -->
    <section class="relative bg-charcoal text-white py-20 overflow-hidden">
        
        <!-- Cover image background with overlay -->
        <div class="absolute inset-0">
            <img src="{{ $jeweller->cover_image ?? 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop' }}" alt="{{ $jeweller->business_name }} Cover" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                
                <!-- Logo -->
                <div class="w-28 h-28 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex-shrink-0">
                    <img src="{{ $jeweller->logo }}" alt="{{ $jeweller->business_name }} Logo" class="w-full h-full object-cover">
                </div>

                <!-- Text Details -->
                <div class="flex-grow">
                    <div class="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start mb-2">
                        <h1 class="font-luxury text-3xl sm:text-4xl font-bold">{{ $jeweller->business_name }}</h1>
                        <div>
                            <span class="bg-green-600 text-white text-xxs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"><i class="fa-solid fa-circle-check mr-1"></i> Verified Partner</span>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-300 mb-4"><i class="fa-solid fa-location-dot text-gold mr-1.5"></i> {{ $jeweller->area }}, {{ $jeweller->city->name }}</p>
                    
                    <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                        @foreach($jeweller->specialities as $spec)
                            <span class="text-xxs bg-white/10 text-white px-2 py-0.5 rounded border border-white/10">{{ $spec }}</span>
                        @endforeach
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Main Content Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- Left 2 Columns: Info, Gallery, and Products -->
            <div class="lg:col-span-2 space-y-12">
                
                <!-- Info Section -->
                <div class="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h2 class="font-luxury text-xl font-bold border-b border-gray-100 pb-3 mb-6">About the Showroom</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Address</span>
                            <p class="text-gray-700 leading-relaxed">{{ $jeweller->full_address }}</p>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Timings</span>
                            <p class="text-gray-700">{{ $jeweller->business_timings }}</p>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Experience</span>
                            <p class="text-gray-700">{{ $jeweller->years_in_business }} Years in Jewellery Industry</p>
                        </div>
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Payment Methods</span>
                            <p class="text-gray-700">{{ implode(', ', $jeweller->payment_methods ?? []) }}</p>
                        </div>
                    </div>

                    @if($jeweller->return_policy)
                        <div class="border-t border-gray-100 pt-6">
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Return / Exchange Policy</span>
                            <p class="text-gray-600 text-sm leading-relaxed">{{ $jeweller->return_policy }}</p>
                        </div>
                    @endif
                </div>

                <!-- Verification Badges -->
                <div class="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h2 class="font-luxury text-xl font-bold border-b border-gray-100 pb-3 mb-6">Verification Checklist</h2>
                    
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-id-card text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Identity Verified</h4>
                            <span class="text-xxs text-gray-400 block mt-1">CNIC & Business Reg checked</span>
                        </div>
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-store text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Physical Shop Audited</h4>
                            <span class="text-xxs text-gray-400 block mt-1">Physical audit complete</span>
                        </div>
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-map-pin text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Address Verified</h4>
                            <span class="text-xxs text-gray-400 block mt-1">Showroom address audited</span>
                        </div>
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-gem text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Custom Orders</h4>
                            <span class="text-xxs text-gray-400 block mt-1">Bespoke making available</span>
                        </div>
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-file-invoice-dollar text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Official Invoice</h4>
                            <span class="text-xxs text-gray-400 block mt-1">Provides printed GST invoice</span>
                        </div>
                        <div class="p-4 bg-cream rounded border border-gray-100">
                            <i class="fa-solid fa-calendar-check text-gold text-2xl mb-2"></i>
                            <h4 class="font-bold text-xs text-charcoal">Appointments</h4>
                            <span class="text-xxs text-gray-400 block mt-1">Showroom visit booking open</span>
                        </div>
                    </div>
                </div>

                <!-- Products Grid -->
                <div>
                    <h2 class="font-luxury text-2xl font-bold border-b border-gray-200 pb-3 mb-6">Latest Designs & Inspirations</h2>
                    
                    @if($jeweller->products->isEmpty())
                        <p class="text-gray-500 text-sm">No products listed by this jeweller yet.</p>
                    @else
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            @foreach($jeweller->products as $p)
                                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                                    <div class="h-56 bg-gray-100 relative">
                                        <img src="{{ is_array($p->images) ? ($p->images[0] ?? '') : (json_decode($p->images)[0] ?? '') }}" alt="{{ $p->title }}" class="w-full h-full object-cover">
                                        <span class="absolute top-3 right-3 bg-charcoal/80 text-gold text-xxs font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                                            {{ str_replace('_', ' ', $p->status) }}
                                        </span>
                                    </div>
                                    <div class="p-5 flex-grow flex flex-col justify-between">
                                        <div>
                                            <span class="text-[10px] text-gold font-semibold uppercase tracking-wider">{{ $p->category->name }}</span>
                                            <h3 class="font-luxury font-bold text-lg text-charcoal mt-1">{{ $p->title }}</h3>
                                            <p class="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">{{ $p->description }}</p>
                                            
                                            <div class="grid grid-cols-2 gap-2 mt-4 text-[10px] text-gray-400 bg-cream p-2.5 rounded">
                                                <div>Purity: <strong class="text-charcoal">{{ $p->gold_purity ?? 'N/A' }}</strong></div>
                                                <div>Weight: <strong class="text-charcoal">{{ $p->approximate_weight ?? 'N/A' }}</strong></div>
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 flex-wrap">
                                            <div>
                                                @if($p->price_on_request)
                                                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Price on Request</span>
                                                @else
                                                    <span class="text-gold font-bold text-base">Rs. {{ number_format($p->price, 2) }}</span>
                                                @endif
                                            </div>
                                            <a href="{{ route('lead.custom', ['jeweller_id' => $jeweller->id]) }}" class="bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded shadow shadow-gold/10">
                                                Get Quote
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Reviews Section -->
                <div class="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h2 class="font-luxury text-xl font-bold border-b border-gray-100 pb-3 mb-6">Customer Reviews ({{ $jeweller->reviews->count() }})</h2>
                    
                    @if($jeweller->reviews->isEmpty())
                        <p class="text-gray-500 text-sm">No reviews yet. Be the first to leave a review!</p>
                    @else
                        <div class="space-y-6">
                            @foreach($jeweller->reviews as $rev)
                                <div class="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div class="flex justify-between items-center mb-2">
                                        <h4 class="font-bold text-sm text-charcoal">{{ $rev->customer_name }}</h4>
                                        <div class="text-gold text-xs">
                                            @for($i=1; $i<=5; $i++)
                                                @if($i <= $rev->rating)
                                                    <i class="fa-solid fa-star"></i>
                                                @else
                                                    <i class="fa-regular fa-star"></i>
                                                @endif
                                            @endfor
                                        </div>
                                    </div>
                                    <p class="text-gray-500 text-xs leading-relaxed">{{ $rev->comment }}</p>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>

            </div>

            <!-- Right Column: Lead Capture Box -->
            <div class="space-y-8">
                
                <!-- Action Form Box -->
                <div class="bg-white rounded-lg border border-gray-200 shadow-lg p-6 sticky top-24">
                    <h3 class="font-luxury text-xl font-bold text-charcoal border-b border-gray-100 pb-3 mb-4 text-center">Contact Showroom</h3>
                    
                    <!-- Consultant WhatsApp Info -->
                    <div class="bg-green-50 rounded border border-green-100 p-4 mb-6 flex items-center gap-3">
                        <i class="fa-brands fa-whatsapp text-3xl text-green-500"></i>
                        <div class="text-xs text-green-800">
                            <span class="font-bold block">Consultant Direct Line</span>
                            Ask about custom orders & gold rates.
                            <a href="https://wa.me/{{ preg_replace('/[^0-9]/', '', $jeweller->whatsapp ?? '+923001234567') }}" class="underline font-bold block mt-0.5">Talk on WhatsApp</a>
                        </div>
                    </div>

                    <!-- Main Lead CTAs -->
                    <div class="space-y-4">
                        <div class="text-center p-4 bg-cream rounded border border-gray-100">
                            <span class="text-xs text-gray-500 block mb-2">Want to inspect ornaments physically?</span>
                            <a href="{{ route('lead.custom', ['jeweller_id' => $jeweller->id]) }}" class="w-full block bg-charcoal hover:bg-charcoal/90 text-white font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition-all">
                                <i class="fa-solid fa-calendar-days mr-1.5"></i> Book Showroom Appointment
                            </a>
                        </div>

                        <div class="text-center p-4 bg-cream rounded border border-gray-100">
                            <span class="text-xs text-gray-500 block mb-2">Need direct price quotation?</span>
                            <a href="{{ route('lead.custom', ['jeweller_id' => $jeweller->id]) }}" class="w-full block bg-gold hover:bg-gold-hover text-white font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition-all shadow-gold/20">
                                <i class="fa-solid fa-file-lines mr-1.5"></i> Request Quotation
                            </a>
                        </div>
                    </div>

                    <!-- Direct Contact numbers are initially hidden to ensure lead tracking -->
                    <div class="border-t border-gray-100 mt-6 pt-4 text-center">
                        <span class="text-[10px] text-gray-400 leading-relaxed block">
                            Direct store numbers are hidden. Please submit an inquiry form or use our consultant link so we can log and track your lead properly.
                        </span>
                    </div>

                </div>

            </div>

        </div>
    </div>

@endsection
