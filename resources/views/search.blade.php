@extends('layouts.app')

@section('title', 'Find Verified Jewellers in Pakistan | Online Jewelry Shop')

@section('content')

    <!-- Search Hero Header -->
    <section class="bg-charcoal text-white py-12 relative overflow-hidden border-b border-gold/10">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="font-luxury text-3xl md:text-4xl font-bold">Find a Local Verified Jeweller</h1>
            <p class="text-xs text-gray-400 mt-2">Filter and search verified partners by city, area, specialty, and services.</p>
        </div>
    </section>

    <!-- Main Content Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <!-- Filters Sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                    
                    <h3 class="font-luxury text-base font-bold text-charcoal border-b border-gray-100 pb-2">Filter Search</h3>

                    <form action="{{ route('search.index') }}" method="GET" class="space-y-4">
                        
                        <!-- Select City -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">City</label>
                            <select name="city_id" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                                <option value="">All Cities</option>
                                @foreach($cities as $c)
                                    <option value="{{ $c->id }}" {{ request('city_id') == $c->id ? 'selected' : '' }}>{{ $c->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Specific Area -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Area / Locality</label>
                            <input type="text" name="area" value="{{ request('area') }}" placeholder="e.g. DHA, Clifton" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                        </div>

                        <!-- Specialty -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Specialty</label>
                            <select name="speciality" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                                <option value="">All Specialties</option>
                                <option value="22K Gold" {{ request('speciality') === '22K Gold' ? 'selected' : '' }}>22K Gold</option>
                                <option value="Solitaire Diamond Rings" {{ request('speciality') === 'Solitaire Diamond Rings' ? 'selected' : '' }}>Diamond Solitaires</option>
                                <option value="Heritage Bridal Sets" {{ request('speciality') === 'Heritage Bridal Sets' ? 'selected' : '' }}>Heritage Bridal Sets</option>
                                <option value="Gold Bangles" {{ request('speciality') === 'Gold Bangles' ? 'selected' : '' }}>Gold Bangles</option>
                            </select>
                        </div>

                        <!-- Service features -->
                        <div class="space-y-2 pt-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Services</label>
                            
                            <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                <input type="checkbox" name="custom_order" value="1" {{ request('custom_order') ? 'checked' : '' }} class="rounded border-gray-300 text-gold focus:ring-gold">
                                Custom Order Available
                            </label>

                            <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                <input type="checkbox" name="delivery" value="1" {{ request('delivery') ? 'checked' : '' }} class="rounded border-gray-300 text-gold focus:ring-gold">
                                Delivery Available
                            </label>

                            <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                <input type="checkbox" name="repair" value="1" {{ request('repair') ? 'checked' : '' }} class="rounded border-gray-300 text-gold focus:ring-gold">
                                Repair Services Available
                            </label>
                        </div>

                        <!-- Action Buttons -->
                        <div class="pt-4 flex gap-2">
                            <button type="submit" class="w-full bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-gold/10">Apply Filters</button>
                            <a href="{{ route('search.index') }}" class="w-full text-center border border-charcoal/20 hover:bg-cream text-charcoal text-xs font-bold uppercase tracking-wider py-2.5 rounded">Clear</a>
                        </div>

                    </form>

                </div>
            </div>

            <!-- Results Grid -->
            <div class="lg:col-span-3">
                
                @if($jewellers->isEmpty())
                    <div class="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                        <i class="fa-solid fa-store-slash text-5xl text-gray-300 mb-4 block"></i>
                        <h3 class="font-luxury font-bold text-xl mb-2 text-charcoal">Partner Onboarding In Progress</h3>
                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
                            No verified partner matching your filters is currently onboarded. Submit your custom requirement and our support team will help you find a suitable seller.
                        </p>
                        <a href="{{ route('lead.custom') }}" class="bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded shadow shadow-gold/25">
                            Submit Custom Requirement
                        </a>
                    </div>
                @else
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        @forelse($jewellers as $j)
                            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                                
                                <div>
                                    <div class="h-32 bg-cream relative">
                                        <img src="{{ $j->cover_image }}" alt="Cover" class="w-full h-full object-cover">
                                        <div class="absolute inset-0 bg-charcoal/30"></div>
                                        <div class="absolute bottom-3 left-3 flex items-center gap-2">
                                            <div class="w-10 h-10 rounded-full bg-white p-0.5 border shadow overflow-hidden">
                                                <img src="{{ $j->logo }}" alt="Logo" class="w-full h-full object-cover">
                                            </div>
                                            <div class="text-white">
                                                <h3 class="font-luxury font-bold text-sm leading-tight">{{ $j->business_name }}</h3>
                                                <span class="text-[9px] bg-charcoal/80 text-gold px-1.5 py-0.5 rounded-full"><i class="fa-solid fa-circle-check"></i> Verified</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="p-5">
                                        <div class="text-xxs text-gray-400 mb-2">
                                            <i class="fa-solid fa-location-dot text-gold mr-1"></i> {{ $j->area }}, {{ $j->city->name }}
                                        </div>

                                        <div class="flex flex-wrap gap-1 mb-4">
                                            @foreach($j->specialities as $spec)
                                                <span class="text-[9px] bg-cream text-charcoal/80 px-1.5 py-0.5 rounded border border-gray-200">{{ $spec }}</span>
                                            @endforeach
                                        </div>

                                        <div class="border-t border-gray-100 pt-3 flex gap-4 text-xxs text-gray-500">
                                            <div><i class="fa-solid fa-gem text-gold mr-1"></i> {{ $j->products->count() }} Designs</div>
                                            <div><i class="fa-solid fa-award text-gold mr-1"></i> {{ $j->years_in_business }} Yrs</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-5 pt-0 border-t border-gray-100 mt-auto flex gap-2">
                                    <a href="{{ route('jeweller.show', $j->slug) }}" class="flex-1 text-center border border-charcoal/20 hover:border-gold hover:text-gold text-[10px] font-bold uppercase tracking-wider py-2 rounded transition-colors">
                                        Profile
                                    </a>
                                    <a href="{{ route('lead.custom', ['jeweller_id' => $j->id]) }}" class="flex-1 text-center bg-gold hover:bg-gold-hover text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded transition-colors shadow">
                                        Book Visit
                                    </a>
                                </div>

                            </div>
                        @empty
                        @endforelse
                    </div>

                    <!-- Pagination -->
                    <div class="mt-8">
                        {{ $jewellers->appends(request()->query())->links() }}
                    </div>
                @endif

            </div>

        </div>
    </div>

@endsection
