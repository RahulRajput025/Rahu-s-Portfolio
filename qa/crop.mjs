import sharp from 'sharp'
const [,, src, out, top = '0', height = '900'] = process.argv
const m = await sharp(src).metadata()
await sharp(src).extract({ left: 0, top: Number(top), width: m.width, height: Math.min(Number(height), m.height - Number(top)) }).toFile(out)
console.log('cropped', out)
