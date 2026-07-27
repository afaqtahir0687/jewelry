<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Online Jewelry Shop | Find Trusted Jewellers in Pakistan')</title>
    <meta name="description" content="@yield('meta_description', 'Discover verified gold and diamond jewellers across Lahore, Karachi, Islamabad. Request custom quotes and book shop appointments.')">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- CSS/JS Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-cream font-sans text-charcoal min-h-screen flex flex-col antialiased">

    <!-- Top Premium Notification Bar -->
    <div class="bg-charcoal text-gold text-xs py-2 text-center tracking-widest uppercase font-semibold border-b border-gold/20">
        <i class="fa-solid fa-gem mr-2"></i> Connecting You to Pakistan's Most Trusted Verified Artisans <i class="fa-solid fa-gem ml-2"></i>
    </div>

    <!-- Main Navigation Bar -->
    <header class="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                
                <!-- Brand Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="{{ route('home') }}" class="flex flex-col">
                        <span class="font-luxury font-bold text-2xl tracking-wide text-charcoal">ONLINE JEWELRY</span>
                        <span class="text-xs font-semibold tracking-widest text-gold text-right uppercase -mt-1">SHOP</span>
                    </a>
                </div>

                <!-- Desktop Navigation Menu -->
                <nav class="hidden md:flex space-x-6 lg:space-x-8 font-medium text-sm text-charcoal/80">
                    <a href="{{ route('home') }}" class="hover:text-gold transition-colors duration-200">Home</a>
                    <a href="{{ route('search.index') }}" class="hover:text-gold transition-colors duration-200">Verified Jewellers</a>
                    
                    <!-- Cities Dropdown Link -->
                    <div class="relative group">
                        <button class="hover:text-gold flex items-center gap-1 transition-colors duration-200">
                            Shop by City <i class="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden group-hover:block bg-white border border-gray-100 rounded-md shadow-lg py-2 w-48 mt-1 z-50">
                            <a href="{{ route('city.show', 'lahore') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Lahore</a>
                            <a href="{{ route('city.show', 'karachi') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Karachi</a>
                            <a href="{{ route('city.show', 'islamabad') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Islamabad</a>
                        </div>
                    </div>

                    <!-- Categories Dropdown Link -->
                    <div class="relative group">
                        <button class="hover:text-gold flex items-center gap-1 transition-colors duration-200">
                            Categories <i class="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                        <div class="absolute hidden group-hover:block bg-white border border-gray-100 rounded-md shadow-lg py-2 w-48 mt-1 z-50">
                            <a href="{{ route('category.show', 'gold-jewellery') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Gold Jewellery</a>
                            <a href="{{ route('category.show', 'diamond-jewellery') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Diamond Jewellery</a>
                            <a href="{{ route('category.show', 'bridal-jewellery') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Bridal Sets</a>
                            <a href="{{ route('category.show', 'engagement-rings') }}" class="block px-4 py-2 hover:bg-cream hover:text-gold transition-colors">Engagement Rings</a>
                        </div>
                    </div>

                    <a href="{{ route('lead.custom') }}" class="hover:text-gold transition-colors duration-200">Custom Order</a>
                </nav>

                <!-- Desktop CTA Buttons -->
                <div class="hidden md:flex items-center space-x-4">
                    <a href="https://wa.me/+923001234567" target="_blank" class="text-charcoal hover:text-gold text-lg px-2" title="Talk to Consultant">
                        <i class="fa-brands fa-whatsapp text-2xl text-green-500 hover:scale-110 transition-transform"></i>
                    </a>
                    <a href="{{ route('search.index') }}" class="border border-charcoal/30 hover:border-gold hover:text-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300">
                        Find a Jeweller
                    </a>
                    <a href="{{ route('lead.custom') }}" class="bg-gold hover:bg-gold-hover text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md shadow-gold/20">
                        Get a Quote
                    </a>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center gap-4">
                    <a href="https://wa.me/+923001234567" target="_blank">
                        <i class="fa-brands fa-whatsapp text-2xl text-green-500"></i>
                    </a>
                    <button id="mobile-menu-btn" class="text-charcoal hover:text-gold focus:outline-none">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>

            </div>
        </div>

        <!-- Mobile Dropdown Navigation -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-md animate-fade-in">
            <a href="{{ route('home') }}" class="block font-medium hover:text-gold">Home</a>
            <a href="{{ route('search.index') }}" class="block font-medium hover:text-gold">Verified Jewellers</a>
            <div class="border-t border-gray-100 my-2 pt-2">
                <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Cities</span>
                <a href="{{ route('city.show', 'lahore') }}" class="block pl-4 py-1 hover:text-gold">Lahore</a>
                <a href="{{ route('city.show', 'karachi') }}" class="block pl-4 py-1 hover:text-gold">Karachi</a>
                <a href="{{ route('city.show', 'islamabad') }}" class="block pl-4 py-1 hover:text-gold">Islamabad</a>
            </div>
            <div class="border-t border-gray-100 my-2 pt-2">
                <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Categories</span>
                <a href="{{ route('category.show', 'gold-jewellery') }}" class="block pl-4 py-1 hover:text-gold">Gold Jewellery</a>
                <a href="{{ route('category.show', 'diamond-jewellery') }}" class="block pl-4 py-1 hover:text-gold">Diamond Jewellery</a>
                <a href="{{ route('category.show', 'bridal-jewellery') }}" class="block pl-4 py-1 hover:text-gold">Bridal Sets</a>
                <a href="{{ route('category.show', 'engagement-rings') }}" class="block pl-4 py-1 hover:text-gold">Engagement Rings</a>
            </div>
            <a href="{{ route('lead.custom') }}" class="block font-medium hover:text-gold">Custom Order</a>
            <div class="pt-2 flex flex-col gap-2">
                <a href="{{ route('search.index') }}" class="text-center border border-charcoal/30 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm">
                    Find a Jeweller
                </a>
                <a href="{{ route('lead.custom') }}" class="text-center bg-gold text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
                    Get a Quote
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Premium Footer -->
    <footer class="bg-charcoal text-gray-400 pt-16 pb-24 md:pb-12 border-t border-gold/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                <!-- Logo & Brand Description -->
                <div>
                    <a href="{{ route('home') }}" class="flex flex-col mb-4">
                        <span class="font-luxury font-bold text-xl tracking-wide text-white">ONLINE JEWELRY</span>
                        <span class="text-xxs font-semibold tracking-widest text-gold uppercase -mt-1">SHOP</span>
                    </a>
                    <p class="text-sm text-gray-400 mb-6">
                        Connecting customers with certified and verified top-tier jewellers in Pakistan. Request quotes, browse inspirations and find physical shops with confidence.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-all"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-all"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-all"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Top Cities</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="{{ route('city.show', 'lahore') }}" class="hover:text-gold transition-colors">Lahore Jewellers</a></li>
                        <li><a href="{{ route('city.show', 'karachi') }}" class="hover:text-gold transition-colors">Karachi Jewellers</a></li>
                        <li><a href="{{ route('city.show', 'islamabad') }}" class="hover:text-gold transition-colors">Islamabad Jewellers</a></li>
                        <li><a href="{{ route('city.show', 'faisalabad') }}" class="hover:text-gold transition-colors">Faisalabad Jewellers</a></li>
                    </ul>
                </div>

                <!-- Categories -->
                <div>
                    <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Categories</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="{{ route('category.show', 'gold-jewellery') }}" class="hover:text-gold transition-colors">Gold Jewellery</a></li>
                        <li><a href="{{ route('category.show', 'diamond-jewellery') }}" class="hover:text-gold transition-colors">Diamond Jewellery</a></li>
                        <li><a href="{{ route('category.show', 'bridal-jewellery') }}" class="hover:text-gold transition-colors">Bridal Sets</a></li>
                        <li><a href="{{ route('category.show', 'engagement-rings') }}" class="hover:text-gold transition-colors">Engagement Rings</a></li>
                    </ul>
                </div>

                <!-- Trust Disclosure -->
                <div>
                    <h3 class="font-luxury text-white font-semibold text-lg mb-4 tracking-wider">Our Trust Guarantee</h3>
                    <p class="text-xs leading-relaxed text-gray-400 mb-2">
                        Online Jewelry Shop is a connection platform. All purchases, invoices, and product quality checks are the sole responsibility of the verified partner shop.
                    </p>
                    <div class="border-t border-white/10 pt-2 mt-2">
                        <span class="text-xs text-gold"><i class="fa-solid fa-shield-halved mr-1"></i> 100% Verified Sellers Only</span>
                    </div>
                </div>

            </div>

            <!-- Bottom legal bar -->
            <div class="border-t border-white/5 pt-8 text-center text-xs text-gray-500">
                <p>&copy; {{ date('Y') }} Online Jewelry Shop. All Rights Reserved. Powered by Pakistan Artisan Network.</p>
            </div>
        </div>
    </footer>

    <!-- Sticky Mobile Bottom Menu (Sticky Navigation requested by PDF) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl py-3 px-6 z-50 flex justify-between items-center text-center">
        <a href="{{ route('home') }}" class="flex flex-col items-center gap-1 text-charcoal/80 hover:text-gold">
            <i class="fa-solid fa-house text-lg"></i>
            <span class="text-[10px] font-bold">Home</span>
        </a>
        <a href="{{ route('search.index') }}" class="flex flex-col items-center gap-1 text-charcoal/80 hover:text-gold">
            <i class="fa-solid fa-list text-lg"></i>
            <span class="text-[10px] font-bold">Categories</span>
        </a>
        <a href="{{ route('search.index') }}" class="flex flex-col items-center gap-1 text-charcoal/80 hover:text-gold">
            <i class="fa-solid fa-location-dot text-lg"></i>
            <span class="text-[10px] font-bold">Cities</span>
        </a>
        <a href="https://wa.me/+923001234567" target="_blank" class="flex flex-col items-center gap-1 text-green-500 hover:scale-105 transition-transform">
            <i class="fa-brands fa-whatsapp text-xl"></i>
            <span class="text-[10px] font-bold">WhatsApp</span>
        </a>
        <a href="{{ route('lead.custom') }}" class="flex flex-col items-center gap-1 text-charcoal/80 hover:text-gold">
            <i class="fa-solid fa-gem text-lg"></i>
            <span class="text-[10px] font-bold">Get Quote</span>
        </a>
    </div>

    <!-- Script to toggle mobile menu -->
    <script>
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    </script>
</body>
</html>
