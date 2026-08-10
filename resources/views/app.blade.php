<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/images/gehna-logo.svg">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#5c1a1b">
    
    <!-- iOS meta tags & icons -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Gehna">
    <link rel="apple-touch-icon" href="/images/pwa-icon-192.png">


    @if(($page['component'] ?? null) === 'Home')
        <link rel="preload" as="image" href="/images/banner1.webp" fetchpriority="high">
    @endif

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">

    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    @php
        $seoMeta = $page['props']['seo_meta'] ?? null;
    @endphp

    @if($seoMeta)
        <title inertia>{{ $seoMeta['title'] }}</title>
        @if(!empty($seoMeta['description']))
            <meta name="description" content="{{ $seoMeta['description'] }}" inertia>
        @endif
        @if(!empty($seoMeta['keywords']))
            <meta name="keywords" content="{{ $seoMeta['keywords'] }}" inertia>
        @endif
        @if(!empty($seoMeta['og_image']))
            <meta property="og:image" content="{{ $seoMeta['og_image'] }}" inertia>
        @endif
    @else
        <title inertia>Online Jewelry Shop</title>
    @endif

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="bg-cream font-sans antialiased text-charcoal">
    @inertia
    
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    </script>
</body>
</html>
