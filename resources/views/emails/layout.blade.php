<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') — Jewellery Shop PK</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; color: #333; }
        .wrapper { max-width: 620px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 36px 40px; text-align: center; }
        .header img { width: 48px; margin-bottom: 12px; }
        .header h1 { color: #c9a227; font-size: 22px; font-weight: 700; letter-spacing: 1px; }
        .header p { color: #aaa; font-size: 13px; margin-top: 4px; }
        .badge { display: inline-block; background: #c9a227; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-top: 10px; letter-spacing: 1px; text-transform: uppercase; }
        .body { padding: 36px 40px; }
        .body h2 { font-size: 20px; color: #1a1a2e; margin-bottom: 8px; }
        .body p { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 16px; }
        .info-card { background: #f8f9fc; border-left: 4px solid #c9a227; border-radius: 8px; padding: 20px 24px; margin: 20px 0; }
        .info-card .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .info-card .row:last-child { border-bottom: none; }
        .info-card .row .label { color: #888; font-weight: 600; min-width: 160px; }
        .info-card .row .value { color: #1a1a2e; font-weight: 500; text-align: right; }
        .status-pill { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .status-new { background: #e3f2fd; color: #1565c0; }
        .status-assigned { background: #fff3e0; color: #e65100; }
        .status-completed { background: #e8f5e9; color: #2e7d32; }
        .status-cancelled { background: #ffebee; color: #c62828; }
        .status-confirmed { background: #e8f5e9; color: #2e7d32; }
        .status-pending { background: #fff3e0; color: #e65100; }
        .cta-btn { display: block; width: fit-content; margin: 24px auto 0; background: linear-gradient(135deg, #c9a227, #e6b800); color: #fff; text-decoration: none; padding: 13px 36px; border-radius: 8px; font-weight: 700; font-size: 15px; text-align: center; }
        .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
        .footer { background: #1a1a2e; padding: 24px 40px; text-align: center; }
        .footer p { color: #888; font-size: 12px; line-height: 1.8; }
        .footer a { color: #c9a227; text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>💎 Jewellery Shop PK</h1>
        <p>Pakistan's Premier Jewellery Platform</p>
        <span class="badge">@yield('badge', 'Notification')</span>
    </div>
    <div class="body">
        @yield('content')
    </div>
    <div class="footer">
        <p>
            © {{ date('Y') }} Jewellery Shop PK. All rights reserved.<br>
            <a href="{{ config('app.url') }}">Visit our website</a>
        </p>
    </div>
</div>
</body>
</html>
