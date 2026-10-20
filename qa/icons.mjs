// Rasterise public/favicon.svg → public/apple-touch-icon.png (180px)
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
const svg = readFileSync('public/favicon.svg')
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(svg, { density: 384 }).resize(512, 512).png().toFile('public/icon-512.png')
console.log('icons written')
