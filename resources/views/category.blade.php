@extends('layouts.app')

@section('title', $category->name . ' - Fine Designs & Inspirations | Online Jewelry Shop')
@section('meta_description', $category->description)

@section('content')

    <!-- Category Header -->
    <section class="bg-charcoal text-white py-16 relative overflow-hidden border-b border-gold/10">
        <div class="absolute inset-0 opacity-15">
            <img src="{{ $category->image }}" alt="{{ $category->name }}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-charcoal"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
            <span class="text-gold tracking-widest uppercase font-semibold text-xs mb-2 block">Catalogues</span>
            <h1 class="font-luxury text-3xl md:text-5xl font-bold mb-4">{{ $category->name }}</h1>
            <p class="text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">{{ $category->description }}</p>
        </div>
    </section>

    <!-- Main Content Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <!-- Filters Sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                    
                    <h3 class="font-luxury text-base font-bold text-charcoal border-b border-gray-100 pb-2">Filter Catalog</h3>

                    <form action="{{ route('category.show', $category->slug) }}" method="GET" class="space-y-4">
                        
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

                        <!-- Product Status -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Availability</label>
                            <select name="status" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                                <option value="">All Types</option>
                                <option value="available" {{ request('status') === 'available' ? 'selected' : '' }}>Available in Stock</option>
                                <option value="made_to_order" {{ request('status') === 'made_to_order' ? 'selected' : '' }}>Made to Order</option>
                                <option value="design_inspiration" {{ request('status') === 'design_inspiration' ? 'selected' : '' }}>Design Inspiration</option>
                            </select>
                        </div>

                        <!-- Max Budget -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Max Budget (PKR)</label>
                            <input type="number" name="budget_max" value="{{ request('budget_max') }}" placeholder="e.g. 500000" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                        </div>

                        <!-- Gold Purity -->
                        <div>
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Gold Purity</label>
                            <select name="purity" class="w-full bg-cream border border-gray-200 rounded px-2.5 py-2 text-xs focus:outline-none focus:border-gold">
                                <option value="">All Purity Types</option>
                                <option value="22K Gold" {{ request('purity') === '22K Gold' ? 'selected' : '' }}>22K Gold</option>
                                <option value="21K Gold" {{ request('purity') === '21K Gold' ? 'selected' : '' }}>21K Gold</option>
                                <option value="18K Gold" {{ request('purity') === '18K Gold' ? 'selected' : '' }}>18K Gold</option>
                                <option value="18K White Gold" {{ request('purity') === '18K White Gold' ? 'selected' : '' }}>18K White Gold</option>
                            </select>
                        </div>

                        <!-- Action Buttons -->
                        <div class="pt-4 flex gap-2">
                            <button type="submit" class="w-full bg-gold hover:bg-gold-hover text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow shadow-gold/10">Filter</button>
                            <a href="{{ route('category.show', $category->slug) }}" class="w-full text-center border border-charcoal/20 hover:bg-cream text-charcoal text-xs font-bold uppercase tracking-wider py-2.5 rounded">Clear</a>
                        </div>

                    </form>

                </div>
            </div>

            <!-- Products Results Grid -->
            <div class="lg:col-span-3">
                
                @if($products->isEmpty())
                    <div class="bg-white p-12 rounded-lg border border-gray-200 text-center shadow-sm">
                        <i class="fa-solid fa-gem text-5xl text-gray-300 mb-4 block"></i>
                        <h3 class="font-luxury font-bold text-xl mb-2 text-charcoal">No Designs Found</h3>
                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
                            No designs matching your search parameters are currently listed under this category. Upload a reference image to get custom quotes.
                        </p>
                        <a href="{{ route('lead.custom', ['category_id' => $category->id]) }}" class="bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded shadow shadow-gold/25">
                            Request Custom Quotation
                        </a>
                    </div>
                @else
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach($products as $p)
                            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div class="h-48 bg-gray-100 relative">
                                    <img src="{{ is_array($p->images) ? ($p->images[0] ?? '') : (json_decode($p->images)[0] ?? '') }}" alt="{{ $p->title }}" class="w-full h-full object-cover">
                                    <span class="absolute top-3 right-3 bg-charcoal/80 text-gold text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                                        {{ str_replace('_', ' ', $p->status) }}
                                    </span>
                                </div>

                                <div class="p-4 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 class="font-luxury font-bold text-base text-charcoal line-clamp-1">{{ $p->title }}</h3>
                                        <span class="text-[10px] text-gray-400 block mt-1"><i class="fa-solid fa-store mr-1 text-gold"></i> {{ $p->jeweller->business_name }} ({{ $p->jeweller->city->name }})</span>
                                        
                                        <div class="grid grid-cols-2 gap-1 mt-3 text-[9px] text-gray-400 bg-cream p-2 rounded">
                                            <div>Purity: <strong class="text-charcoal">{{ $p->gold_purity ?? 'N/A' }}</strong></div>
                                            <div>Weight: <strong class="text-charcoal">{{ $p->approximate_weight ?? 'N/A' }}</strong></div>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-4">
                                        <div>
                                            @if($p->price_on_request)
                                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price on Request</span>
                                            @else
                                                <span class="text-gold font-bold text-sm">Rs. {{ number_format($p->price, 2) }}</span>
                                            @endif
                                        </div>
                                        <a href="{{ route('lead.custom', ['jeweller_id' => $p->jeweller_id]) }}" class="bg-gold hover:bg-gold-hover text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                                            Inquire
                                        </a>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <!-- Pagination -->
                    <div class="mt-8">
                        {{ $products->appends(request()->query())->links() }}
                    </div>
                @endif

            </div>

        </div>
    </div>

@endsection
