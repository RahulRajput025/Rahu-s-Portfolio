import sharp from 'sharp'
const m = await sharp('public/rahul.png').metadata()
console.log({ width: m.width, height: m.height, channels: m.channels, hasAlpha: m.hasAlpha, format: m.format, size: m.size })
