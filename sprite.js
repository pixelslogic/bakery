const SVGSpriter = require('svg-sprite');
const fs = require('fs');
const path = require('path');
const iconsDir = path.join(__dirname, 'source', 'assets', 'images', 'icon');
const outputDir = path.join(__dirname, 'dist');

const config = {
  dest: outputDir,
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg',
      example: false,
    },
  },
};

const spriter = new SVGSpriter(config);

fs.readdirSync(iconsDir).forEach(file => {
  if (path.extname(file) === '.svg') {
    const filePath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(filePath, 'utf-8');
    spriter.add(filePath, null, svgContent);
  }
});

spriter.compile((error, result) => {
  if (error) {
    console.error('Ошибка при сборке спрайта:', error);
    return;
  }

  for (const mode in result) {
    for (const resource in result[mode]) {
      const outPath = path.join(outputDir, result[mode][resource].relative);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, result[mode][resource].contents);
      console.log(`Created: ${outPath}`);
    }
  }
});