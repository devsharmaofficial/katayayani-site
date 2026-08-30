const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ICO file format builder
function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + numImages * dirEntrySize;

  let dataOffset = dirSize;
  const entries = [];

  for (let i = 0; i < numImages; i++) {
    entries.push({
      size: sizes[i],
      dataSize: pngBuffers[i].length,
      offset: dataOffset,
    });
    dataOffset += pngBuffers[i].length;
  }

  const totalSize = dataOffset;
  const buf = Buffer.alloc(totalSize);

  // ICONDIR header
  buf.writeUInt16LE(0, 0);       // Reserved
  buf.writeUInt16LE(1, 2);       // Type: 1 = ICO
  buf.writeUInt16LE(numImages, 4); // Number of images

  // ICONDIRENTRY for each image
  for (let i = 0; i < numImages; i++) {
    const offset = headerSize + i * dirEntrySize;
    const sz = entries[i].size;
    buf.writeUInt8(sz >= 256 ? 0 : sz, offset);      // Width (0 = 256)
    buf.writeUInt8(sz >= 256 ? 0 : sz, offset + 1);  // Height (0 = 256)
    buf.writeUInt8(0, offset + 2);                    // ColorCount
    buf.writeUInt8(0, offset + 3);                    // Reserved
    buf.writeUInt16LE(1, offset + 4);                 // Planes
    buf.writeUInt16LE(32, offset + 6);                // BitCount
    buf.writeUInt32LE(entries[i].dataSize, offset + 8); // SizeInBytes
    buf.writeUInt32LE(entries[i].offset, offset + 12);  // ImageOffset
  }

  // Write PNG data
  for (let i = 0; i < numImages; i++) {
    pngBuffers[i].copy(buf, entries[i].offset);
  }

  return buf;
}

async function main() {
  const logoPath = path.join(__dirname, '../public/katayayani-enterprises-logo.png');
  const input = fs.readFileSync(logoPath);

  const sizes = [16, 32, 48, 64];
  const pngBuffers = await Promise.all(
    sizes.map(sz =>
      sharp(input)
        .resize(sz, sz, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .png()
        .toBuffer()
    )
  );

  const icoBuffer = createIco(pngBuffers, sizes);
  const outPath = path.join(__dirname, '../public/favicon.ico');
  fs.writeFileSync(outPath, icoBuffer);
  console.log('✅ favicon.ico generated with sizes:', sizes.join(', '));
}

main().catch(console.error);
