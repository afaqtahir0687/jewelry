@extends('layouts.app')

@section('title', 'Request a Custom Jewellery Quote | Online Jewelry Shop')

@section('content')

    <section class="py-16 bg-cream">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-8">
                <span class="text-gold tracking-widest uppercase font-semibold text-xs"><i class="fa-solid fa-gem mr-1"></i> Bespoke Craftsmanship</span>
                <h1 class="font-luxury text-3xl md:text-4xl text-charcoal font-bold mt-2">Request Custom Jewellery Quote</h1>
                <p class="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
                    Fill out the form below. We will generate a unique Lead ID, route your requirement to verified local partners, and get you quotes.
                </p>
                <div class="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
            </div>

            <!-- Error Banner -->
            @if ($errors->any())
                <div class="bg-red-50 text-red-800 p-4 rounded mb-6 border border-red-200 text-xs">
                    <ul class="list-disc pl-5 space-y-1">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Main Form Card -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
                <form action="{{ route('lead.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <!-- Pre-selected Jeweller info -->
                    @if($selectedJeweller)
                        <input type="hidden" name="jeweller_id" value="{{ $selectedJeweller->id }}">
                        <div class="bg-gold/5 rounded border border-gold/20 p-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full overflow-hidden border border-white bg-white">
                                    <img src="{{ $selectedJeweller->logo }}" alt="Logo" class="w-full h-full object-cover">
                                </div>
                                <div class="text-xs text-charcoal">
                                    <span class="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Sending Inquiry To</span>
                                    <strong class="font-luxury text-sm">{{ $selectedJeweller->business_name }}</strong>
                                    ({{ $selectedJeweller->area }}, {{ $selectedJeweller->city->name }})
                                </div>
                            </div>
                            <span class="text-xxs bg-gold/10 text-gold px-2.5 py-1 rounded font-bold uppercase"><i class="fa-solid fa-store"></i> Direct Routing</span>
                        </div>
                    @endif

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <!-- Customer Name -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your Name <span class="text-red-500">*</span></label>
                            <input type="text" name="customer_name" required value="{{ old('customer_name') }}" placeholder="Enter full name" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                        </div>

                        <!-- Customer Phone -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone / WhatsApp Number <span class="text-red-500">*</span></label>
                            <input type="text" name="customer_phone" required value="{{ old('customer_phone') }}" placeholder="e.g. +923001234567" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                        </div>

                        <!-- Select City -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your City <span class="text-red-500">*</span></label>
                            <select name="city_id" required class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                                <option value="">Select City</option>
                                @foreach($cities as $city)
                                    <option value="{{ $city->id }}" {{ (old('city_id') == $city->id || ($selectedJeweller && $selectedJeweller->city_id == $city->id)) ? 'selected' : '' }}>{{ $city->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Select Category -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Jewellery Category</label>
                            <select name="category_id" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                                <option value="">Select Category</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ (old('category_id') == $cat->id || request('category_id') == $cat->id) ? 'selected' : '' }}>{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>

                    </div>

                    <!-- Description of requirement -->
                    <div class="flex flex-col">
                        <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Requirements / Specifications</label>
                        <textarea name="requirement_description" rows="4" placeholder="Detail your requirements (e.g. Ring size, approximate weight, customized gem, metal purity like 22K gold, etc.)" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-vertical">{{ old('requirement_description') }}</textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <!-- Approximate Budget -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Approximate Budget (PKR)</label>
                            <input type="text" name="budget" value="{{ old('budget') }}" placeholder="e.g. Rs. 150,000 - 200,000" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                        </div>

                        <!-- Preferred Contact Time -->
                        <div class="flex flex-col">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Preferred Contact Time</label>
                            <input type="text" name="preferred_contact_time" value="{{ old('preferred_contact_time') }}" placeholder="e.g. Afternoon, Evening" class="bg-cream border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                        </div>

                    </div>

                    <!-- Reference Image Upload -->
                    <div class="flex flex-col">
                        <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Upload Reference Image</label>
                        <div class="bg-cream border-2 border-dashed border-gray-300 hover:border-gold rounded-lg p-6 text-center cursor-pointer transition-colors relative">
                            <input type="file" name="reference_image" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                            <i class="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i>
                            <span class="text-xs text-gray-500 block">Click to upload or drag & drop design references</span>
                            <span class="text-[10px] text-gray-400 block mt-1">Accepts JPG, PNG images. Max size 5MB.</span>
                        </div>
                    </div>

                    <!-- Trust declaration -->
                    <div class="bg-cream p-4 rounded border border-gray-100 flex gap-3 items-start">
                        <i class="fa-solid fa-circle-info text-gold text-base mt-0.5"></i>
                        <p class="text-[11px] text-gray-500 leading-relaxed">
                            <strong>Important Trust Notice:</strong> Your contact number will only be shared with the selected/assigned verified partner shop when you accept their quotation. We prioritize user privacy and lead tracking.
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="w-full bg-gold hover:bg-gold-hover text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded shadow shadow-gold/25 transition-transform hover:scale-[1.01]">
                        Submit Quotation Request
                    </button>

                </form>
            </div>

        </div>
    </section>

@endsection
