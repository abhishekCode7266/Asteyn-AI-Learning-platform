const QRCode = require('qrcode');
const fs = require('fs');

async function generateScanner() {
  // UPI payload for Terminal 2-Q714679312
  const upiPayload = "upi://pay?pa=Q714679312@ybl&pn=Astryn%20Learning&mc=5499&mode=02";

  // Generate QR as SVG string
  const qrSvg = await QRCode.toString(upiPayload, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'M'
  });

  // Extract viewBox and inner paths
  const viewBoxMatch = qrSvg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 33 33";
  const innerPaths = qrSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim();

  // Build the complete authentic PhonePe Stand SVG matching user's uploaded IMG-20260923-WA0001.jpg
  // Dimensions 600 x 820 (3:4 aspect ratio)
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 820" width="100%" height="100%">
  <!-- White Stand Background -->
  <rect width="600" height="820" rx="28" fill="#ffffff" />
  
  <!-- Subtle border -->
  <rect x="2" y="2" width="596" height="816" rx="26" fill="none" stroke="#e2e8f0" stroke-width="2" />

  <!-- TOP: PhonePe Circular Logo -->
  <g transform="translate(300, 78)">
    <!-- Purple Circle -->
    <circle cx="0" cy="0" r="46" fill="#5f259f" />
    <!-- White 'पे' Hindi Character -->
    <text x="0" y="17" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Devanagari', sans-serif" font-size="52" font-weight="900" text-anchor="middle">पे</text>
  </g>

  <!-- PhonePe Brand Wordmark -->
  <text x="300" y="160" fill="#5f259f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="36" font-weight="900" text-anchor="middle" letter-spacing="-0.5">PhonePe</text>

  <!-- ORANGE MERCHANT PILL (Vikas Sweets removed, replaced with Astryn) -->
  <g transform="translate(300, 206)">
    <rect x="-170" y="-23" width="340" height="46" rx="23" fill="#f58220" />
    <text x="0" y="8" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="900" text-anchor="middle" letter-spacing="1">Astryn</text>
  </g>

  <!-- QR CODE CONTAINER -->
  <g transform="translate(90, 255)">
    <!-- Real Scannable PhonePe QR Code -->
    <svg width="420" height="420" viewBox="${viewBox}" shape-rendering="crispEdges">
      ${innerPaths}
    </svg>
  </g>

  <!-- BHIM | UPI LOGO -->
  <g transform="translate(300, 715)">
    <!-- BHIM text -->
    <text x="-48" y="0" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" font-style="italic" text-anchor="middle">BHIM</text>
    
    <!-- Slanted Green & Orange Triangles -->
    <polygon points="-8,-18 0,-18 -12,4 -20,4" fill="#009944" />
    <polygon points="4,-18 12,-18 0,4 -8,4" fill="#f58220" />

    <!-- UPI text -->
    <text x="48" y="0" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" font-style="italic" text-anchor="middle">UPI</text>

    <!-- Subtext -->
    <text x="-48" y="14" fill="#475569" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" letter-spacing="0.5">BHARAT INTERFACE FOR MONEY</text>
    <text x="48" y="14" fill="#475569" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" letter-spacing="0.5">UNIFIED PAYMENTS INTERFACE</text>
  </g>

  <!-- EXACT TERMINAL IDENTIFIER FROM USER'S SCREENSHOT -->
  <text x="300" y="770" fill="#0f172a" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500" text-anchor="middle" letter-spacing="0.5">Terminal 2-Q714679312</text>
</svg>`;

  fs.writeFileSync('/public/phonepe-scanner.svg', fullSvg, 'utf8');
  if (fs.existsSync('/app/applet/public')) {
    fs.writeFileSync('/app/applet/public/phonepe-scanner.svg', fullSvg, 'utf8');
  }
  console.log("Successfully generated real PhonePe scanner SVG with Q714679312 QR code and Astryn pill!");
}

generateScanner().catch(console.error);
