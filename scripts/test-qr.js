const QRCode = require('qrcode');

async function test() {
  const strings = [
    'upi://pay?pa=Q714679312@ybl&pn=Vikas%20Sweets',
    'upi://pay?pa=Q714679312@ybl',
    'upi://pay?pa=Q714679312@ybl&pn=Vikas%20Sweets&mc=5499',
    'upi://pay?pa=Q714679312@ybl&pn=Vikas%20Sweets&mode=02',
    'upi://pay?pa=Q714679312@ybl&pn=Vikas%20Sweets&mc=5499&mode=02&purpose=00',
    'https://phon.pe/ru?d=Q714679312'
  ];

  for (const s of strings) {
    const qr = QRCode.create(s, { errorCorrectionLevel: 'M' });
    console.log(s, 'version:', qr.version, 'size:', qr.modules.size);
  }
}

test();
