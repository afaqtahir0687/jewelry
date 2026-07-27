@extends('layouts.app')

@section('content')

    <!-- Hero Section -->
    <section class="relative bg-charcoal py-24 md:py-32 overflow-hidden">
        
        <!-- Abstract luxurious background glows -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <span class="text-gold tracking-widest uppercase font-semibold text-xs mb-3 block">Premium Lead Generation Network</span>
            <h1 class="font-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-4xl mx-auto mb-6">
                Find Trusted Gold & Diamond Jewellers Across Pakistan
            </h1>
            <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Browse exclusive designs, locate top physical stores in your city, request direct custom orders, or get quotes directly from verified artisans.
            </p>

            <!-- Main Search Form -->
            <div class="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-2xl border border-gold/10">
                <form action="{{ route('search.index') }}" method="GET" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    
                    <!-- Search query / Category -->
                    <div class="flex flex-col text-left">
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Looking For</label>
                        <div class="relative">
                            <select name="speciality" class="w-full bg-cream border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-gold">
                                <option value="">Select Category</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->name }}">{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- City select -->
                    <div class="flex flex-col text-left">
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Select City</label>
                        <div class="relative">
                            <select name="city_id" class="w-full bg-cream border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-gold">
                                <option value="">Select City</option>
                                @foreach($cities as $city)
                                    <option value="{{ $city->id }}">{{ $city->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- Budget range -->
                    <div class="flex flex-col text-left">
                        <label class="text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Approximate Budget</label>
                        <div class="relative">
                            <select name="budget" class="w-full bg-cream border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:border-gold">
                                <option value="">Select Budget</option>
                                <option value="Under Rs. 100,000">Under Rs. 100,000</option>
                                <option value="Rs. 100,000 - 250,000">Rs. 100,000 - 250,000</option>
                                <option value="Rs. 250,000 - 500,000">Rs. 250,000 - 500,000</option>
                                <option value="Above Rs. 500,000">Above Rs. 500,000</option>
                            </select>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-4 md:pt-0">
                        <label class="hidden md:block text-xs font-bold text-transparent mb-1">Search</label>
                        <button type="submit" class="w-full bg-gold hover:bg-gold-hover text-white font-bold py-3.5 px-4 rounded text-sm uppercase tracking-wider transition-colors duration-200 shadow-md">
                            <i class="fa-solid fa-magnifying-glass mr-2"></i> Find Jeweller
                        </button>
                    </div>

                </form>

                <!-- Secondary CTA -->
                <div class="text-center mt-4">
                    <span class="text-xs text-gray-500">Or design your own dream ornament: 
                        <a href="{{ route('lead.custom') }}" class="text-gold font-bold hover:underline ml-1">Request Custom Jewellery Quote <i class="fa-solid fa-chevron-right text-[10px]"></i></a>
                    </span>
                </div>
            </div>

        </div>
    </section>

    <!-- Browse by Jewellery Type -->
    <section class="py-20 bg-cream">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-12">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs">Exquisite Collections</span>
                <h2 class="font-luxury text-3xl md:text-4xl text-charcoal font-bold mt-2">Browse by Jewellery Type</h2>
                <div class="w-24 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($categories as $cat)
                    <a href="{{ route('category.show', $cat->slug) }}" class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                        <div class="h-64 overflow-hidden relative">
                            <img src="{{ $cat->image }}" alt="{{ $cat->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors"></div>
                        </div>
                        <div class="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 class="font-luxury text-xl font-bold text-charcoal group-hover:text-gold transition-colors">{{ $cat->name }}</h3>
                                <p class="text-gray-500 text-sm mt-2 leading-relaxed">{{ $cat->description }}</p>
                            </div>
                            <span class="text-gold font-semibold text-xs tracking-wider uppercase mt-4 block">View Designs <i class="fa-solid fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i></span>
                        </div>
                    </a>
                @endforeach
            </div>

        </div>
    </section>

    <!-- Browse by City -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-12">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs">Local Directories</span>
                <h2 class="font-luxury text-3xl md:text-4xl text-charcoal font-bold mt-2">Select Your City</h2>
                <div class="w-24 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                @foreach($cities as $city)
                    <a href="{{ route('city.show', $city->slug) }}" class="group bg-cream hover:bg-charcoal border border-gray-100 hover:border-gold p-6 text-center rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                        <div class="w-12 h-12 bg-gold/10 group-hover:bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                            <i class="fa-solid fa-location-dot text-gold text-lg"></i>
                        </div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal group-hover:text-white transition-colors">{{ $city->name }}</h3>
                        <span class="text-gray-400 text-xs block mt-1 group-hover:text-gold font-semibold">View Partners</span>
                    </a>
                @endforeach
            </div>

        </div>
    </section>

    <!-- Featured Partner Jewellers -->
    <section class="py-20 bg-cream">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-12">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs">Vetted & Recommended</span>
                <h2 class="font-luxury text-3xl md:text-4xl text-charcoal font-bold mt-2">Featured Partner Jewellers</h2>
                <div class="w-24 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($featuredJewellers as $j)
                    <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
                        
                        <div>
                            <!-- Cover photo -->
                            <div class="h-44 overflow-hidden relative">
                                <img src="{{ $j->cover_image ?? 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop' }}" alt="{{ $j->business_name }} Cover" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-charcoal/40"></div>
                                
                                <!-- Shop Logo overlay -->
                                <div class="absolute bottom-4 left-4 flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-full border-2 border-white bg-white overflow-hidden shadow">
                                        <img src="{{ $j->logo }}" alt="{{ $j->business_name }} Logo" class="w-full h-full object-cover">
                                    </div>
                                    <div class="text-white">
                                        <h3 class="font-luxury text-lg font-bold shadow-sm leading-tight">{{ $j->business_name }}</h3>
                                        <span class="text-xxs tracking-wider font-semibold text-gold bg-charcoal/80 px-2 py-0.5 rounded-full"><i class="fa-solid fa-circle-check mr-1"></i> Verified</span>
                                    </div>
                                </div>
                            </div>

                            <div class="p-6">
                                <div class="flex items-center justify-between text-xs text-gray-500 mb-4 border-b border-gray-100 pb-3">
                                    <span><i class="fa-solid fa-location-dot text-gold mr-1"></i> {{ $j->area }}, {{ $j->city->name }}</span>
                                    <span><i class="fa-solid fa-award text-gold mr-1"></i> {{ $j->years_in_business }} Years</span>
                                </div>

                                <div class="mb-4">
                                    <span class="text-xxs font-bold text-gray-400 uppercase tracking-widest block mb-1">Specialities</span>
                                    <div class="flex flex-wrap gap-1.5">
                                        @foreach($j->specialities as $spec)
                                            <span class="text-xxs bg-cream text-charcoal/80 px-2 py-1 rounded border border-gray-200">{{ $spec }}</span>
                                        @endforeach
                                    </div>
                                </div>

                                <div class="flex flex-col gap-1.5 text-xs text-gray-600 mb-4">
                                    <div><i class="fa-solid fa-clock text-gold mr-2"></i> {{ $j->business_timings }}</div>
                                    <div><i class="fa-solid fa-shield-check text-gold mr-2"></i> Identity, Address & Shop Verified</div>
                                </div>
                            </div>
                        </div>

                        <!-- Card CTA buttons -->
                        <div class="p-6 pt-0 border-t border-gray-100 mt-auto flex gap-3">
                            <a href="{{ route('jeweller.show', $j->slug) }}" class="flex-1 text-center border border-charcoal/30 hover:border-gold hover:text-gold text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all">
                                View Profile
                            </a>
                            <a href="{{ route('lead.custom', ['jeweller_id' => $j->id]) }}" class="flex-1 text-center bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all shadow shadow-gold/20">
                                Book Visit
                            </a>
                        </div>

                    </div>
                @endforeach
            </div>

            <div class="text-center mt-12">
                <a href="{{ route('search.index') }}" class="inline-block bg-charcoal hover:bg-charcoal/90 text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded shadow-lg transition-colors">
                    View All Partner Jewellers
                </a>
            </div>

        </div>
    </section>

    <!-- Custom Jewellery Lead Generator Section -->
    <section class="py-24 bg-charcoal text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&auto=format&fit=crop" alt="Jewelry background" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-charcoal"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
            <span class="text-gold tracking-widest uppercase font-semibold text-xs mb-3 block">Unique Masterpieces</span>
            <h2 class="font-luxury text-3xl md:text-5xl font-bold mb-6">Create Custom Jewellery</h2>
            <p class="text-gray-300 leading-relaxed text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Got a custom design in mind? Simply upload your reference image, define your gold purity and budget, and receive bespoke quotations from verified jewellery shops near you.
            </p>
            <a href="{{ route('lead.custom') }}" class="inline-block bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-xs px-10 py-4 rounded shadow-xl transition-all shadow-gold/20 hover:scale-105 transform">
                Request a Custom Quote Now
            </a>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-16">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs">Our Values</span>
                <h2 class="font-luxury text-3xl md:text-4xl text-charcoal font-bold mt-2">Why Use This Platform?</h2>
                <div class="w-24 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                
                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-map-pin text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Local Seller Access</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Direct links to verified shops in your own city, ensuring safe dealings, quick visits, and local service support.</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-envelope-open-text text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Multiple Quotations</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Submit a custom inquiry once and obtain quotations from multiple sellers to find the absolute best deal.</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-store text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Physical Shop Visits</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Easily book appointments to inspect jewellery physically in the showroom before finalizing purchases.</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-circle-check text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Verified Business Details</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">We verify business identity, physical address, and phone numbers. No fake sellers or fraudulent postings allowed.</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-comments text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Consultant Assistance</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Talk directly to expert consultants via WhatsApp. We route you to the appropriate seller for custom queries.</p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><i class="fa-solid fa-shield-halved text-gold text-lg"></i></div>
                    <div>
                        <h3 class="font-luxury text-lg font-bold text-charcoal mb-2">Safe Transactions</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">Invoice proofs and payments are processed directly with the shops. All transactions are securely logged in our system.</p>
                    </div>
                </div>

            </div>

        </div>
    </section>

    <!-- FAQs Section -->
    <section class="py-20 bg-cream">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-12">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs">Common Inquiries</span>
                <h2 class="font-luxury text-3xl text-charcoal font-bold mt-2">Frequently Asked Questions</h2>
                <div class="w-24 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <div class="space-y-4">
                
                <div class="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                    <h3 class="font-luxury font-bold text-charcoal text-base mb-2">Q: Kya is platform se direct check-out ya payment hoti hai?</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">Nahi, yeh website direct ecommerce purchase ke liye nahi hai. Hum aapko verified jewellers se connect karte hain jahan aap custom order place kar sakte hain ya physical shop visit karke direct deal kar sakte hain.</p>
                </div>

                <div class="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                    <h3 class="font-luxury font-bold text-charcoal text-base mb-2">Q: Kya partner shops verified hain?</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">Ji haan! Hum har partner shop ka trade license, physical location, business history aur reviews check karne ke baad hi unhein "Verified" badge dete hain.</p>
                </div>

                <div class="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                    <h3 class="font-luxury font-bold text-charcoal text-base mb-2">Q: Custom quote request karne ka kya tareeqa hai?</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">Aap simple "Custom Order" form par ja kar apni reference image upload karein aur detail enter karein. Hum aapki inquiry ko selected city ke best rated jeweller tak route kar denge.</p>
                </div>

                <div class="bg-white p-6 rounded-md shadow-sm border border-gray-100">
                    <h3 class="font-luxury font-bold text-charcoal text-base mb-2">Q: Gold rates kaisay confirm honge?</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">Gold rates rozana change hote hain. Aap direct "Get Today's Price" button par click karke hamare WhatsApp consultant ya selected shop se live rate double-check kar sakte hain.</p>
                </div>

            </div>

        </div>
    </section>

@endsection
