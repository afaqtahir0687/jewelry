@extends('layouts.app')

@section('title', 'Gold & Diamond Jewellers in ' . $city->name . ' | Online Jewelry Shop')
@section('meta_description', 'Locate physical shops, browse gold rates, and request custom jewellery quotes from top verified partner jewellers in ' . $city->name . '.')

@section('content')

    <!-- City Hero Section -->
    <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden border-b border-gold/10">
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-gold rounded-full filter blur-3xl"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
            <span class="text-gold tracking-widest uppercase font-semibold text-xs mb-3 block"><i class="fa-solid fa-location-dot mr-1"></i> Area Dedicated Page</span>
            <h1 class="font-luxury text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Gold and Diamond Jewellers in {{ $city->name }}
            </h1>
            <p class="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Connect with verified jewellers, request quotations, and book physical showroom appointments in {{ $city->name }}.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- Left Side: Directory Listings -->
            <div class="lg:col-span-2 space-y-8">
                
                <h2 class="font-luxury text-2xl font-bold border-b border-gray-200 pb-3 mb-6">
                    Verified Jewellers in {{ $city->name }} ({{ $jewellers->count() }})
                </h2>

                @if($jewellers->isEmpty())
                    <div class="bg-white p-8 rounded-lg border border-gray-200 text-center">
                        <i class="fa-solid fa-store-slash text-4xl text-gray-300 mb-4 block"></i>
                        <h3 class="font-luxury font-bold text-xl mb-2 text-charcoal">Partner onboarding in progress</h3>
                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
                            We are currently auditing and onboarding premium jewelry shops in {{ $city->name }}. Submit your requirement and our team will assist you.
                        </p>
                        <a href="{{ route('lead.custom') }}" class="bg-gold text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded shadow">
                            Submit Inquiry
                        </a>
                    </div>
                @else
                    <div class="space-y-6">
                        @foreach($jewellers as $j)
                            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
                                
                                <!-- Shop Cover/Logo Area -->
                                <div class="md:w-60 bg-cream relative flex-shrink-0 min-h-[180px]">
                                    <img src="{{ $j->cover_image }}" alt="{{ $j->business_name }} Cover" class="w-full h-full object-cover absolute inset-0">
                                    <div class="absolute inset-0 bg-charcoal/40"></div>
                                    <div class="absolute inset-0 flex items-center justify-center p-4">
                                        <div class="w-16 h-16 rounded-full bg-white p-1 border shadow overflow-hidden">
                                            <img src="{{ $j->logo }}" alt="{{ $j->business_name }} Logo" class="w-full h-full object-cover">
                                        </div>
                                    </div>
                                </div>

                                <!-- Shop Details -->
                                <div class="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div class="flex items-center gap-3 mb-2 flex-wrap">
                                            <h3 class="font-luxury text-xl font-bold text-charcoal">{{ $j->business_name }}</h3>
                                            <span class="bg-green-50 text-green-700 text-xxs font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-green-200"><i class="fa-solid fa-circle-check"></i> Verified</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mb-3"><i class="fa-solid fa-map-marker-alt text-gold mr-1"></i> {{ $j->full_address }}</p>
                                        
                                        <div class="flex flex-wrap gap-1.5 mb-4">
                                            @foreach($j->specialities as $spec)
                                                <span class="text-[10px] bg-cream text-charcoal/80 px-2 py-0.5 rounded border border-gray-200">{{ $spec }}</span>
                                            @endforeach
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 flex-wrap gap-4">
                                        <div class="text-xs text-gray-500">
                                            <div><i class="fa-solid fa-gem text-gold mr-1.5"></i> {{ $j->products_count }} Designs Listed</div>
                                            <div><i class="fa-solid fa-user-tie text-gold mr-1.5"></i> {{ $j->years_in_business }} Years in Business</div>
                                        </div>
                                        <div class="flex gap-2">
                                            <a href="{{ route('jeweller.show', $j->slug) }}" class="border border-charcoal/30 hover:border-gold hover:text-gold text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors">
                                                View Profile
                                            </a>
                                            <a href="{{ route('lead.custom', ['jeweller_id' => $j->id]) }}" class="bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors">
                                                Book Appointment
                                            </a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        @endforeach
                    </div>
                @endif

                <!-- Lahore/Karachi Gold Buying Guide -->
                <div class="bg-white p-8 rounded-lg border border-gray-200 mt-12">
                    <h3 class="font-luxury text-xl font-bold text-charcoal mb-4">{{ $city->name }} Jewellery Buying Guide</h3>
                    <p class="text-gray-500 text-sm leading-relaxed mb-4">
                        Jab aap {{ $city->name }} mein sona ya heere khareed rahe hon, tou hamesha koshish karein ke verified showrooms se khareedein jo product ke sath proper GIA certification (diamonds ke liye) aur official pure weight invoice de saken.
                    </p>
                    <ul class="list-disc pl-5 text-sm text-gray-500 space-y-2">
                        <li>Gold purity (22K, 21K ya 18K) verify karein.</li>
                        <li>Sellers ke sath making charges pehle negotiate karein.</li>
                        <li>Purana gold exchange karte waqt current gold rate aur deductable weight confirm karein.</li>
                    </ul>
                </div>

            </div>

            <!-- Right Side: Sidebar info -->
            <div class="space-y-8">
                
                <!-- Area Coverage list -->
                <div class="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 class="font-luxury text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-4">
                        Coverage Areas in {{ $city->name }}
                    </h3>
                    <ul class="space-y-2.5 text-sm text-gray-600">
                        @if(strtolower($city->name) === 'lahore')
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> DHA (Phase 1 to 8)</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Gulberg (Main Boulevard & MM Alam Road)</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Liberty Market</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Johar Town</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Model Town</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Bahria Town</li>
                        @elseif(strtolower($city->name) === 'karachi')
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Clifton</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> DHA</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Tariq Road</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Saddar Jewellery Market</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Bahadurabad</li>
                        @else
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Sector F-7 & F-6 Markaz</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> Blue Area</li>
                            <li><i class="fa-solid fa-circle-chevron-right text-gold mr-2"></i> G-9 Markaz</li>
                        @endif
                    </ul>
                </div>

                <!-- Custom Quotation Banner CTA -->
                <div class="bg-charcoal text-white p-6 rounded-lg relative overflow-hidden">
                    <div class="absolute inset-0 opacity-10">
                        <div class="w-40 h-40 bg-gold rounded-full filter blur-xl"></div>
                    </div>
                    <div class="relative z-10">
                        <h3 class="font-luxury text-xl font-bold text-gold mb-3">Custom Ornament Quote</h3>
                        <p class="text-xs text-gray-300 leading-relaxed mb-4">
                            Aap apne pasandida design ki pic upload kar ke {{ $city->name }} ke verified jewellers se rate quote mangwa sakte hain.
                        </p>
                        <a href="{{ route('lead.custom') }}" class="w-full block text-center bg-gold text-white font-bold uppercase tracking-wider text-xs py-2.5 rounded shadow shadow-gold/20">
                            Request Custom Quote
                        </a>
                    </div>
                </div>

                <!-- City Specific FAQs -->
                <div class="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 class="font-luxury text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-4">FAQs</h3>
                    <div class="space-y-4 text-xs text-gray-500">
                        <div>
                            <h4 class="font-bold text-charcoal mb-1">Q: {{ $city->name }} mein verified jeweller kaisay find karein?</h4>
                            <p>Aap upar di gayi list mein se kisi bhi "Verified" badge walay jeweller ka profile open kar ke maps directory aur phone number check kar sakte hain.</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-charcoal mb-1">Q: Custom gold ring banne mein kitna time lagta hai?</h4>
                            <p>Baqayda hand-crafted designs mein 10 se 20 working days lagtay hain, depending on design complexity.</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-charcoal mb-1">Q: Kya showroom appointments booking free hai?</h4>
                            <p>Ji bilkul! Is portal ke zariye appointment book karna 100% free hai.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

@endsection
