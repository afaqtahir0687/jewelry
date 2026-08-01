<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
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
</body>
</html>
