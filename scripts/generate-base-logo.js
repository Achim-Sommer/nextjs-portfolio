const sharp = require('sharp');
const path = require('path');

async function generateBaseLogo() {
  const width = 1024;
  const height = 1024;
  const padding = 100;
  
  // Erstelle ein SVG mit einem moderneren Design
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Hintergrund -->
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Hintergrund mit Gradient -->
      <rect width="100%" height="100%" fill="url(#grad1)"/>

      <!-- Code-Elemente im Hintergrund -->
      <text x="${padding}" y="${height/4}" font-family="monospace" font-size="32" fill="rgba(255,255,255,0.1)" transform="rotate(15)">
        const dev = new Developer('AS');</text>
      <text x="${padding}" y="${height/3}" font-family="monospace" font-size="32" fill="rgba(255,255,255,0.1)" transform="rotate(15)">
        dev.code('TypeScript');</text>
      <text x="${padding}" y="${height/2.5}" font-family="monospace" font-size="32" fill="rgba(255,255,255,0.1)" transform="rotate(15)">
        dev.create('NextJS');</text>

      <!-- Hauptlogo -->
      <g transform="translate(${width/2}, ${height/2})" filter="url(#shadow)">
        <!-- Code-Tag Hintergrund -->
        <path d="M-300,-150 L-320,-130 L-320,130 L-300,150 L300,150 L320,130 L320,-130 L300,-150 Z" 
              fill="rgba(255,255,255,0.1)" />
        
        <!-- Initialen -->
        <text x="0" y="30" 
              font-family="'Courier New', monospace" 
              font-size="280" 
              font-weight="bold" 
              fill="white" 
              text-anchor="middle" 
              dominant-baseline="middle"
              style="letter-spacing: -15px;">
          AS
        </text>

        <!-- Code-Klammern -->
        <text x="-340" y="30" 
              font-family="monospace" 
              font-size="200" 
              fill="white" 
              text-anchor="middle"
              dominant-baseline="middle">{</text>
        <text x="340" y="30" 
              font-family="monospace" 
              font-size="200" 
              fill="white" 
              text-anchor="middle"
              dominant-baseline="middle">}</text>
      </g>

      <!-- Untertitel -->
      <text x="50%" y="${height - padding}" 
            font-family="'Arial', sans-serif" 
            font-size="36" 
            fill="rgba(255,255,255,0.8)" 
            text-anchor="middle"
            dominant-baseline="middle">
        Full Stack Developer
      </text>
    </svg>
  `;

  // Konvertiere SVG zu PNG
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .toFile(path.join(process.cwd(), 'public', 'logo.png'));

  console.log('✓ Generated base logo');
}

generateBaseLogo().catch(console.error);
