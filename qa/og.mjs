import sharp from 'sharp'
await sharp('qa/screenshots/probe-dark-1.png').extract({ left: 0, top: 60, width: 1440, height: 758 }).resize(1200, 630).jpeg({ quality: 82 }).toFile('public/og.jpg')
console.log('og.jpg written')
