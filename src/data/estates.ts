export interface RoomDimension {
  id: string;
  name: string;
  level: string;
  dimensions: string;
  sqft: number;
  ceilingHeight: string;
  materialNote: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GalleryPerspective {
  id: string;
  label: string;
  caption: string;
  exposureMeta: string;
  imageUri: string;
}

export interface EstateProperty {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  typology: 'Cantilevered Pavilion' | 'Penthouse Trophy' | 'Coastal Sanctuary' | 'Alpine Monolith';
  status: 'Off-Market' | 'Private Treaty' | 'Pocket Mandate';
  price: number;
  priceFormatted: string;
  pricePerSqFt: number;
  beds: number;
  baths: number;
  sqft: number;
  exteriorSqft: number;
  lotSize: string;
  architect: string;
  completionYear: number;
  glazingSystem: string;
  structuralMaterial: string;
  acousticRating: string;
  aviationAccess: string;
  annualAppreciationProj: string;
  editorialSummary: string;
  architecturalThesis: string;
  featuredHighlights: string[];
  heroImage: string;
  gallery: GalleryPerspective[];
  rooms: RoomDimension[];
  ndaRequired?: boolean;
}

function createArchitecturalSvgUri(config: {
  variant: 'pavilion' | 'penthouse' | 'coastal' | 'alpine' | 'villa' | 'courtyard' | 'interior' | 'terrace';
  skyTop: string;
  skyBottom: string;
  glowColor: string;
  waterTint: string;
  warmLight: string;
  accentLight: string;
  label: string;
}): string {
  const { variant, skyTop, skyBottom, glowColor, waterTint, warmLight, accentLight } = config;

  let structureMarkup = '';

  if (variant === 'pavilion') {
    structureMarkup = `
      <!-- Distant Hills -->
      <path d="M0 440 Q280 350 620 400 T1200 370 L1200 750 L0 750 Z" fill="#070D21" opacity="0.95"/>
      <!-- City Lights on Horizon -->
      <g opacity="0.55">
        <circle cx="180" cy="432" r="1.5" fill="${warmLight}"/>
        <circle cx="210" cy="435" r="1" fill="#FFFFFF"/>
        <circle cx="245" cy="430" r="1.5" fill="${accentLight}"/>
        <circle cx="290" cy="434" r="1.2" fill="${warmLight}"/>
        <circle cx="940" cy="418" r="1.5" fill="${warmLight}"/>
        <circle cx="980" cy="422" r="1.2" fill="#FFFFFF"/>
        <circle cx="1020" cy="420" r="1.8" fill="${accentLight}"/>
        <circle cx="1065" cy="424" r="1" fill="${warmLight}"/>
      </g>
      <!-- Lower Basalt Podium -->
      <rect x="170" y="365" width="760" height="85" fill="#0E1733" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      <!-- Warm Lit Lower Gallery -->
      <rect x="220" y="380" width="380" height="58" fill="url(#warmInterior)" opacity="0.9"/>
      <line x1="310" y1="380" x2="310" y2="438" stroke="#0A1128" stroke-width="3"/>
      <line x1="415" y1="380" x2="415" y2="438" stroke="#0A1128" stroke-width="3"/>
      <line x1="510" y1="380" x2="510" y2="438" stroke="#0A1128" stroke-width="3"/>
      <!-- Dramatic Cantilevered Upper Volume -->
      <polygon points="110,225 990,225 960,248 110,248" fill="#1E294B"/>
      <rect x="130" y="248" width="820" height="118" fill="#0B132B" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
      <!-- Floor-to-ceiling Glazing with Warm Nocturnal Glow -->
      <rect x="155" y="260" width="690" height="96" fill="url(#warmInterior)"/>
      <!-- Interior Architectural Columns & Chandelier Silhouette -->
      <rect x="285" y="260" width="8" height="96" fill="#0D152E"/>
      <rect x="465" y="260" width="8" height="96" fill="#0D152E"/>
      <rect x="645" y="260" width="8" height="96" fill="#0D152E"/>
      <rect x="765" y="260" width="8" height="96" fill="#0D152E"/>
      <!-- Warm Linear Cove Lighting -->
      <line x1="140" y1="252" x2="860" y2="252" stroke="#FFE4B5" stroke-width="2.5" opacity="0.85"/>
      <line x1="110" y1="226" x2="985" y2="226" stroke="#FFFFFF" stroke-width="1" opacity="0.35"/>
      <!-- Crimson Architectural Beacon Line -->
      <line x1="870" y1="248" x2="945" y2="248" stroke="#C8102E" stroke-width="3"/>
      <!-- Infinity Pool Foreground -->
      <polygon points="80,455 1120,455 1200,660 0,660" fill="url(#poolGrad)"/>
      <line x1="80" y1="455" x2="1120" y2="455" stroke="#82D1ED" stroke-width="1.5" opacity="0.5"/>
      <!-- Water Reflections -->
      <rect x="160" y="465" width="660" height="175" fill="url(#reflectionGrad)" opacity="0.42"/>
      <line x1="210" y1="495" x2="780" y2="495" stroke="#0A1128" stroke-width="2" opacity="0.6"/>
      <line x1="180" y1="535" x2="820" y2="535" stroke="#0A1128" stroke-width="3" opacity="0.6"/>
      <line x1="240" y1="580" x2="740" y2="580" stroke="#0A1128" stroke-width="2.5" opacity="0.6"/>
    `;
  } else if (variant === 'penthouse') {
    structureMarkup = `
      <!-- Distant Manhattan / Metropolis Skyline Silhouette -->
      <rect x="40" y="260" width="65" height="390" fill="#070E24"/>
      <rect x="120" y="210" width="80" height="440" fill="#09122C"/>
      <rect x="220" y="300" width="55" height="350" fill="#070E24"/>
      <rect x="920" y="240" width="75" height="410" fill="#081028"/>
      <rect x="1015" y="190" width="90" height="460" fill="#070D21"/>
      <!-- Double-Height Penthouse Crown -->
      <rect x="290" y="120" width="600" height="530" fill="#0D1634" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
      <!-- Recessed Sky Loggia -->
      <rect x="320" y="150" width="540" height="170" fill="url(#warmInterior)"/>
      <!-- Double-Height Mullions -->
      <line x1="410" y1="150" x2="410" y2="320" stroke="#0B1229" stroke-width="4"/>
      <line x1="500" y1="150" x2="500" y2="320" stroke="#0B1229" stroke-width="4"/>
      <line x1="590" y1="150" x2="590" y2="320" stroke="#0B1229" stroke-width="4"/>
      <line x1="680" y1="150" x2="680" y2="320" stroke="#0B1229" stroke-width="4"/>
      <line x1="770" y1="150" x2="770" y2="320" stroke="#0B1229" stroke-width="4"/>
      <!-- Wraparound Private Terrace -->
      <rect x="260" y="320" width="660" height="18" fill="#1E294B" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      <line x1="265" y1="304" x2="915" y2="304" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
      <!-- Lower Penthouse Gallery Level -->
      <rect x="320" y="355" width="540" height="135" fill="url(#warmInterior)" opacity="0.85"/>
      <line x1="455" y1="355" x2="455" y2="490" stroke="#0B1229" stroke-width="5"/>
      <line x1="590" y1="355" x2="590" y2="490" stroke="#0B1229" stroke-width="5"/>
      <line x1="725" y1="355" x2="725" y2="490" stroke="#0B1229" stroke-width="5"/>
      <!-- Crimson Crown Fin -->
      <line x1="290" y1="120" x2="890" y2="120" stroke="#C8102E" stroke-width="3"/>
    `;
  } else if (variant === 'coastal') {
    structureMarkup = `
      <!-- Jagged Coastal Cliff -->
      <polygon points="0,330 480,330 560,480 620,660 0,660" fill="#081026"/>
      <polygon points="60,330 520,330 585,460 0,460" fill="#0D1736"/>
      <!-- Multi-Tiered Cliffside Sanctuary -->
      <rect x="110" y="210" width="460" height="75" fill="#131E42" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      <rect x="135" y="222" width="415" height="52" fill="url(#warmInterior)"/>
      <!-- Suspended Lower Cantilever over Ocean -->
      <rect x="180" y="285" width="490" height="68" fill="#0E1734" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
      <rect x="205" y="295" width="440" height="48" fill="url(#warmInterior)"/>
      <line x1="315" y1="295" x2="315" y2="343" stroke="#0A1128" stroke-width="3"/>
      <line x1="435" y1="295" x2="435" y2="343" stroke="#0A1128" stroke-width="3"/>
      <line x1="555" y1="295" x2="555" y2="343" stroke="#0A1128" stroke-width="3"/>
      <!-- Nocturnal Ocean Horizon -->
      <rect x="0" y="460" width="1200" height="240" fill="url(#poolGrad)"/>
      <line x1="480" y1="460" x2="1200" y2="460" stroke="#82D1ED" stroke-width="1" opacity="0.4"/>
      <!-- Shimmering Ocean Reflection -->
      <ellipse cx="440" cy="535" rx="220" ry="45" fill="url(#reflectionGrad)" opacity="0.35"/>
      <line x1="580" y1="285" x2="670" y2="285" stroke="#C8102E" stroke-width="3"/>
    `;
  } else if (variant === 'alpine') {
    structureMarkup = `
      <!-- High Alpine Peaks -->
      <polygon points="0,460 280,140 560,460" fill="#0B1430"/>
      <polygon points="360,460 740,110 1120,460" fill="#0E193B"/>
      <polygon points="740,110 890,260 690,310" fill="#182552" opacity="0.6"/>
      <!-- Monolithic Concrete & Glass Chalet -->
      <polygon points="310,270 650,210 890,270 890,440 310,440" fill="#101A3B" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
      <rect x="350" y="285" width="500" height="125" fill="url(#warmInterior)"/>
      <line x1="475" y1="285" x2="475" y2="410" stroke="#0A1128" stroke-width="5"/>
      <line x1="600" y1="285" x2="600" y2="410" stroke="#0A1128" stroke-width="5"/>
      <line x1="725" y1="285" x2="725" y2="410" stroke="#0A1128" stroke-width="5"/>
      <!-- Heated Snow Terrace & Thermal Lap Pool -->
      <polygon points="180,440 1020,440 1160,650 40,650" fill="url(#poolGrad)"/>
      <rect x="350" y="450" width="500" height="140" fill="url(#reflectionGrad)" opacity="0.4"/>
      <line x1="310" y1="270" x2="650" y2="210" stroke="#C8102E" stroke-width="2.5"/>
    `;
  } else if (variant === 'interior') {
    structureMarkup = `
      <!-- Double Height Interior Perspective -->
      <polygon points="0,0 1200,0 980,140 220,140" fill="#0D1632" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <polygon points="0,700 1200,700 980,520 220,520" fill="#091026" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <!-- Panoramic Window Frame -->
      <rect x="220" y="140" width="760" height="380" fill="url(#skyGrad)" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
      <!-- Distant City Horizon Twinkle -->
      <line x1="220" y1="390" x2="980" y2="390" stroke="#82D1ED" stroke-width="1" opacity="0.45"/>
      <rect x="220" y="390" width="760" height="130" fill="url(#poolGrad)" opacity="0.8"/>
      <!-- Mullions -->
      <line x1="410" y1="140" x2="410" y2="520" stroke="#0A1128" stroke-width="6"/>
      <line x1="600" y1="140" x2="600" y2="520" stroke="#0A1128" stroke-width="6"/>
      <line x1="790" y1="140" x2="790" y2="520" stroke="#0A1128" stroke-width="6"/>
      <!-- Sculptural Chandelier Glow -->
      <line x1="600" y1="0" x2="600" y2="230" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <circle cx="600" cy="240" r="26" fill="${warmLight}" opacity="0.85"/>
      <circle cx="600" cy="240" r="65" fill="${warmLight}" opacity="0.18"/>
      <!-- Low-Profile Minotti-Style Architectural Sofa Silhouette -->
      <rect x="330" y="485" width="540" height="55" rx="8" fill="#162146" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
      <rect x="380" y="555" width="440" height="22" rx="4" fill="#C8102E" opacity="0.65"/>
    `;
  } else {
    structureMarkup = `
      <!-- Courtyard Monolith & Reflecting Basin -->
      <rect x="140" y="190" width="920" height="240" fill="#0E1736" stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>
      <rect x="180" y="220" width="380" height="190" fill="url(#warmInterior)"/>
      <rect x="610" y="220" width="410" height="190" fill="url(#warmInterior)"/>
      <line x1="305" y1="220" x2="305" y2="410" stroke="#0A1128" stroke-width="4"/>
      <line x1="435" y1="220" x2="435" y2="410" stroke="#0A1128" stroke-width="4"/>
      <line x1="745" y1="220" x2="745" y2="410" stroke="#0A1128" stroke-width="4"/>
      <line x1="885" y1="220" x2="885" y2="410" stroke="#0A1128" stroke-width="4"/>
      <!-- Reflecting Pool -->
      <polygon points="60,435 1140,435 1200,680 0,680" fill="url(#poolGrad)"/>
      <rect x="180" y="445" width="840" height="180" fill="url(#reflectionGrad)" opacity="0.38"/>
      <line x1="140" y1="190" x2="1060" y2="190" stroke="#C8102E" stroke-width="2.5"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${skyTop}"/>
        <stop offset="65%" stop-color="${skyBottom}"/>
        <stop offset="100%" stop-color="#060B1B"/>
      </linearGradient>
      <radialGradient id="ambientGlow" cx="75%" cy="22%" r="55%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.34"/>
        <stop offset="60%" stop-color="#1A2754" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#0A1128" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="warmInterior" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${warmLight}" stop-opacity="0.92"/>
        <stop offset="50%" stop-color="#E5A965" stop-opacity="0.72"/>
        <stop offset="100%" stop-color="#9A5B25" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="poolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${waterTint}"/>
        <stop offset="100%" stop-color="#040817"/>
      </linearGradient>
      <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${warmLight}" stop-opacity="0.8"/>
        <stop offset="60%" stop-color="${accentLight}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0A1128" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Nocturnal Sky -->
    <rect width="1200" height="700" fill="url(#skyGrad)"/>
    <rect width="1200" height="700" fill="url(#ambientGlow)"/>
    <!-- Subtle Architectural Grid Lines -->
    <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
      <line x1="0" y1="175" x2="1200" y2="175"/>
      <line x1="0" y1="350" x2="1200" y2="350"/>
      <line x1="300" y1="0" x2="300" y2="700"/>
      <line x1="600" y1="0" x2="600" y2="700"/>
      <line x1="900" y1="0" x2="900" y2="700"/>
    </g>
    ${structureMarkup}
    <!-- Subtle Vignette Scrim -->
    <rect width="1200" height="700" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ESTATES_PORTFOLIO: EstateProperty[] = [
  {
    id: 'obsidian-pavilion-beverly-hills',
    title: 'The Obsidian Pavilion',
    subtitle: 'Cantilevered basalt, steel, and zero-edge twilight horizon over Los Angeles',
    location: 'Trousdale Estates, Beverly Hills',
    coordinates: '34.0983° N · 118.4116° W',
    typology: 'Cantilevered Pavilion',
    status: 'Off-Market',
    price: 38500000,
    priceFormatted: '$38,500,000',
    pricePerSqFt: 2673,
    beds: 6,
    baths: 9,
    sqft: 14400,
    exteriorSqft: 6800,
    lotSize: '1.15 Acres',
    architect: 'Atelier Kengo & Olson Studio',
    completionYear: 2025,
    glazingSystem: 'Motorized 18-ft Vitrocsa Low-Iron Hurricane Glass',
    structuralMaterial: 'Honed Nero Assoluto Basalt & Board-Formed Architectural Concrete',
    acousticRating: 'STC-64 Museum-Grade Acoustic Isolation',
    aviationAccess: '14 mins to Van Nuys Private Aviation (KVNY)',
    annualAppreciationProj: '+7.8% 5-Yr Compound Architectural Trophy Index',
    editorialSummary:
      'Engineered across a 270-degree promontory in Trousdale Estates, The Obsidian Pavilion suspends a 94-foot post-tensioned limestone and basalt volume above a zero-edge black granite infinity basin.',
    architecturalThesis:
      'Designed specifically for nocturnal art illumination and effortless indoor-outdoor entertaining, every glazing panel retracts into subterranean pockets within 22 seconds. An subterranean 8-car gallery and Dolby Atmos screening vault anchor the lower podium.',
    featuredHighlights: [
      '94-foot zero-edge black granite infinity pool with nocturnal fiber-optic starfield',
      'Subterranean 8-automobile museum gallery with hydraulic turntable',
      'Climate-controlled 1,800-bottle sommelier vault & private tasting salon',
      'Biometric security perimeter with dedicated on-site security suite'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'pavilion',
      skyTop: '#060B1E',
      skyBottom: '#111C3D',
      glowColor: '#C8102E',
      waterTint: '#0C1B3A',
      warmLight: '#FFD29D',
      accentLight: '#C8102E',
      label: 'The Obsidian Pavilion'
    }),
    gallery: [
      {
        id: 'west-elevation',
        label: 'West Twilight Elevation',
        caption: '94-foot cantilevered upper gallery suspended above the black granite infinity basin at blue hour.',
        exposureMeta: 'Leica S3 · 24mm Shift · f/8 · ISO 100',
        imageUri: createArchitecturalSvgUri({
          variant: 'pavilion',
          skyTop: '#060B1E',
          skyBottom: '#111C3D',
          glowColor: '#C8102E',
          waterTint: '#0C1B3A',
          warmLight: '#FFD29D',
          accentLight: '#C8102E',
          label: 'West Twilight Elevation'
        })
      },
      {
        id: 'great-room-salon',
        label: 'Double-Height Great Salon',
        caption: '18-foot motorized Vitrocsa glass walls framing unbroken skyline views from Downtown LA to the Pacific Ocean.',
        exposureMeta: 'Leica S3 · 35mm · f/5.6 · Ambient Cove',
        imageUri: createArchitecturalSvgUri({
          variant: 'interior',
          skyTop: '#081029',
          skyBottom: '#15224A',
          glowColor: '#82D1ED',
          waterTint: '#0D1C3E',
          warmLight: '#FFE0B2',
          accentLight: '#C8102E',
          label: 'Double-Height Great Salon'
        })
      },
      {
        id: 'reflecting-courtyard',
        label: 'East Basalt Courtyard',
        caption: 'Private arrival court with monolithic basalt water mirror and museum-grade sculpture lighting.',
        exposureMeta: 'Leica S3 · 28mm · f/8 · Nocturnal Balance',
        imageUri: createArchitecturalSvgUri({
          variant: 'courtyard',
          skyTop: '#050A1B',
          skyBottom: '#0F1836',
          glowColor: '#C8102E',
          waterTint: '#09142E',
          warmLight: '#FFC98B',
          accentLight: '#82D1ED',
          label: 'East Basalt Courtyard'
        })
      }
    ],
    rooms: [
      {
        id: 'great-salon',
        name: 'Great Architectural Salon',
        level: 'Main Pavilion Level',
        dimensions: '54\' × 28\'',
        sqft: 1512,
        ceilingHeight: '18\' 0"',
        materialNote: 'Pietra Grey limestone slabs, pocketed Vitrocsa glass',
        x: 60,
        y: 50,
        w: 280,
        h: 150
      },
      {
        id: 'primary-suite',
        name: 'Primary Sovereign Wing',
        level: 'Upper Cantilever',
        dimensions: '42\' × 30\'',
        sqft: 1260,
        ceilingHeight: '14\' 6"',
        materialNote: 'Smoked European oak, dual onyx baths & dressing vaults',
        x: 355,
        y: 50,
        w: 225,
        h: 150
      },
      {
        id: 'culinary-atelier',
        name: 'Gaggenau 400 Culinary Atelier',
        level: 'Main Pavilion Level',
        dimensions: '32\' × 24\'',
        sqft: 768,
        ceilingHeight: '14\' 0"',
        materialNote: 'Brushed titanium Boffi monolith island + chef scullery',
        x: 60,
        y: 215,
        w: 185,
        h: 125
      },
      {
        id: 'auto-gallery',
        name: 'Subterranean 8-Car Collector Vault',
        level: 'Lower Podium',
        dimensions: '68\' × 34\'',
        sqft: 2312,
        ceilingHeight: '13\' 6"',
        materialNote: 'Museum light ceiling baffle, hydraulic turntable',
        x: 260,
        y: 215,
        w: 320,
        h: 125
      }
    ]
  },
  {
    id: 'sovereign-sky-penthouse-nyc',
    title: 'The Sovereign Triplex Penthouse',
    subtitle: 'Full-floor 82nd-to-84th crown residence overlooking Central Park & Midtown',
    location: 'Billionaires’ Row, Manhattan',
    coordinates: '40.7648° N · 73.9762° W',
    typology: 'Penthouse Trophy',
    status: 'Private Treaty',
    price: 54000000,
    priceFormatted: '$54,000,000',
    pricePerSqFt: 4821,
    beds: 5,
    baths: 7,
    sqft: 11200,
    exteriorSqft: 3400,
    lotSize: '3,400 Sq Ft Sky Loggia',
    architect: 'Herzog & Studio Vervoordt',
    completionYear: 2026,
    glazingSystem: 'Triple-Glazed Acoustic Structural Curtain Wall (24-ft Bays)',
    structuralMaterial: 'Hand-Troweled Belgian Lime Plaster & Bronze Mullions',
    acousticRating: 'STC-68 High-Altitude Wind & Acoustic Damping',
    aviationAccess: '9 mins to West 30th St Heliport (JRA)',
    annualAppreciationProj: '+6.9% 5-Yr Compound Trophy Penthouse Index',
    editorialSummary:
      'Crowning the top three levels of an ultra-slender architectural tower on 57th Street, The Sovereign Triplex commands 360-degree vistas spanning Central Park, the Hudson River, and the Atlantic horizon.',
    architecturalThesis:
      'A private high-speed elevator opens directly into a 24-foot double-height gallery framed in patinated bronze and hand-selected French limestone. The upper observatory level includes a heated outdoor lap pool sheltered within a wind-baffled sky loggia.',
    featuredHighlights: [
      '360-degree Central Park to Harbor exposures across three full floors',
      'Wind-engineered sky loggia with heated stainless-steel lap pool & fireplace',
      'Private internal glass-and-bronze sculptural elevator + staff service core',
      'Direct private porte-cochère entrance with 24-hour armed concierge'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'penthouse',
      skyTop: '#050918',
      skyBottom: '#131D42',
      glowColor: '#C8102E',
      waterTint: '#0A1530',
      warmLight: '#FFE0B5',
      accentLight: '#82D1ED',
      label: 'The Sovereign Triplex Penthouse'
    }),
    gallery: [
      {
        id: 'crown-loggia',
        label: '84th Floor Sky Crown',
        caption: 'Illuminated double-height penthouse crown rising 1,180 feet above Central Park South.',
        exposureMeta: 'Hasselblad H6D · 50mm · f/11 · Aerial Twilight',
        imageUri: createArchitecturalSvgUri({
          variant: 'penthouse',
          skyTop: '#050918',
          skyBottom: '#131D42',
          glowColor: '#C8102E',
          waterTint: '#0A1530',
          warmLight: '#FFE0B5',
          accentLight: '#82D1ED',
          label: '84th Floor Sky Crown'
        })
      },
      {
        id: 'north-park-salon',
        label: 'Central Park North Salon',
        caption: '24-foot floor-to-ceiling structural glass bays overlooking the entirety of Central Park at dusk.',
        exposureMeta: 'Hasselblad H6D · 28mm · f/8 · Interior Balance',
        imageUri: createArchitecturalSvgUri({
          variant: 'interior',
          skyTop: '#060C20',
          skyBottom: '#142048',
          glowColor: '#C8102E',
          waterTint: '#09142E',
          warmLight: '#FFD8A8',
          accentLight: '#C8102E',
          label: 'Central Park North Salon'
        })
      }
    ],
    rooms: [
      {
        id: 'north-gallery',
        name: 'Central Park Grand Gallery',
        level: '82nd Floor',
        dimensions: '62\' × 26\'',
        sqft: 1612,
        ceilingHeight: '24\' 0"',
        materialNote: 'Monolithic French limestone, bronze curtain wall',
        x: 60,
        y: 50,
        w: 310,
        h: 145
      },
      {
        id: 'sky-observatory',
        name: 'Private Sky Loggia & Lap Pool',
        level: '84th Observatory',
        dimensions: '58\' × 22\'',
        sqft: 1276,
        ceilingHeight: '16\' 0"',
        materialNote: 'Acoustic wind-baffle glazing, heated stainless basin',
        x: 385,
        y: 50,
        w: 195,
        h: 145
      },
      {
        id: 'primary-sanctuary',
        name: 'Full-Floor Primary Sanctuary',
        level: '83rd Floor',
        dimensions: '54\' × 32\'',
        sqft: 1728,
        ceilingHeight: '13\' 6"',
        materialNote: 'Calacatta Viola marble hammam & dual dressing rooms',
        x: 60,
        y: 210,
        w: 520,
        h: 130
      }
    ]
  },
  {
    id: 'villa-maris-big-sur',
    title: 'Villa Maris Promontory',
    subtitle: 'Cliffside glass and weathered titanium sanctuary above the Pacific swell',
    location: 'Coastlands Headland, Big Sur',
    coordinates: '36.2297° N · 121.7714° W',
    typology: 'Coastal Sanctuary',
    status: 'Off-Market',
    price: 29800000,
    priceFormatted: '$29,800,000',
    pricePerSqFt: 3040,
    beds: 5,
    baths: 6,
    sqft: 9800,
    exteriorSqft: 5200,
    lotSize: '14.6 Coastal Acres',
    architect: 'Olson Kundig & Studio Pacifica',
    completionYear: 2025,
    glazingSystem: 'Marine-Grade Triple Laminated Low-Iron Structural Glass',
    structuralMaterial: 'Anchored Bedrock Steel Caissons, Titanium & Charred Cedar',
    acousticRating: 'STC-62 Marine Storm & Thermal Envelope',
    aviationAccess: 'Private CAA-Approved Estate Helipad On-Site',
    annualAppreciationProj: '+8.4% 5-Yr Irreplaceable Coastal Permit Scarcity',
    editorialSummary:
      'Anchored directly into granite sea cliffs 340 feet above the Pacific Ocean, Villa Maris Promontory is an irreplaceable coastal sanctuary permitted under historic California headland grandfathering.',
    architecturalThesis:
      'Two cantilevered pavilions step down the natural topography, connected by a subterranean basalt art tunnel and a cliff-edge geothermal infinity basin. Includes a private on-site helipad and self-sustaining solar-microgrid with deep-aquifer filtration.',
    featuredHighlights: [
      'Private on-site FAA-registered helipad for direct Monterey or Silicon Valley arrival',
      'Geothermal cliff-edge infinity pool suspended 340 feet over the Pacific surf',
      '100% off-grid capable microgrid with Tesla Megapack vault & private spring water',
      'Subterranean basalt art gallery and acoustic listening room'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'coastal',
      skyTop: '#04091A',
      skyBottom: '#0E1C3F',
      glowColor: '#82D1ED',
      waterTint: '#091B3A',
      warmLight: '#FFD59E',
      accentLight: '#82D1ED',
      label: 'Villa Maris Promontory'
    }),
    gallery: [
      {
        id: 'pacific-cantilever',
        label: 'Pacific Headland Cantilever',
        caption: 'Dual marine-grade titanium and glass pavilions anchored into the granite cliff face.',
        exposureMeta: 'Phase One IQ4 · 35mm · f/8 · Marine Twilight',
        imageUri: createArchitecturalSvgUri({
          variant: 'coastal',
          skyTop: '#04091A',
          skyBottom: '#0E1C3F',
          glowColor: '#82D1ED',
          waterTint: '#091B3A',
          warmLight: '#FFD59E',
          accentLight: '#82D1ED',
          label: 'Pacific Headland Cantilever'
        })
      },
      {
        id: 'horizon-salon',
        label: 'Oceanic Listening Room',
        caption: 'Custom cedar acoustic ribs and panoramic ocean glass in the main living pavilion.',
        exposureMeta: 'Phase One IQ4 · 28mm · f/5.6 · Warm Dusk',
        imageUri: createArchitecturalSvgUri({
          variant: 'interior',
          skyTop: '#050C22',
          skyBottom: '#10214B',
          glowColor: '#82D1ED',
          waterTint: '#081836',
          warmLight: '#FFDBAD',
          accentLight: '#C8102E',
          label: 'Oceanic Listening Room'
        })
      }
    ],
    rooms: [
      {
        id: 'ocean-pavilion',
        name: 'Cantilevered Ocean Pavilion',
        level: 'Upper Headland',
        dimensions: '48\' × 26\'',
        sqft: 1248,
        ceilingHeight: '15\' 0"',
        materialNote: 'Charred cedar acoustic ceiling, marine-grade glass',
        x: 60,
        y: 50,
        w: 270,
        h: 145
      },
      {
        id: 'cliff-primary',
        name: 'Headland Primary Sanctuary',
        level: 'Lower Cantilever',
        dimensions: '38\' × 28\'',
        sqft: 1064,
        ceilingHeight: '13\' 0"',
        materialNote: 'Cantilevered ocean deck, private basalt soaking tub',
        x: 345,
        y: 50,
        w: 235,
        h: 145
      },
      {
        id: 'art-tunnel',
        name: 'Subterranean Basalt Art Tunnel',
        level: 'Bedrock Level',
        dimensions: '64\' × 18\'',
        sqft: 1152,
        ceilingHeight: '12\' 0"',
        materialNote: 'Exposed granite bedrock & museum track illumination',
        x: 60,
        y: 210,
        w: 520,
        h: 130
      }
    ]
  },
  {
    id: 'kronos-alpine-monolith-aspen',
    title: 'Kronos Alpine Monolith',
    subtitle: 'Ski-in/ski-out architectural concrete and bronze sanctuary on Red Mountain',
    location: 'Red Mountain, Aspen',
    coordinates: '39.2084° N · 106.8175° W',
    typology: 'Alpine Monolith',
    status: 'Pocket Mandate',
    price: 44200000,
    priceFormatted: '$44,200,000',
    pricePerSqFt: 3250,
    beds: 7,
    baths: 10,
    sqft: 13600,
    exteriorSqft: 4900,
    lotSize: '2.8 Alpine Acres',
    architect: 'Peter Zumthor Inspired / Studio Alpine',
    completionYear: 2025,
    glazingSystem: 'Quad-Pane Heated Argon-Filled Structural Alpine Glass',
    structuralMaterial: 'Insulated Thermal Quartzite & Patinated Architectural Bronze',
    acousticRating: 'STC-66 Sub-Zero Thermal & Acoustic Sanctuary',
    aviationAccess: '11 mins to Aspen-Pitkin Private FBO (KASE)',
    annualAppreciationProj: '+8.1% 5-Yr Red Mountain Trophy Scarcity',
    editorialSummary:
      'Carved into the southern slope of Red Mountain, Kronos Alpine Monolith frames unobstructed nocturnal views of Aspen Mountain and the Continental Divide through 32-foot heated structural glass bays.',
    architecturalThesis:
      'Constructed from stacked Valser quartzite and insulated board-formed concrete, the residence features an indoor-outdoor geothermal ozone lap pool, a private hypoxic altitude wellness spa, and heated granite motor courts.',
    featuredHighlights: [
      'Unobstructed nocturnal views over Downtown Aspen and Ajax Mountain',
      'Indoor-to-outdoor heated geothermal lap pool with motorized glass water-wall',
      'Medical-grade hyperbaric & cryo recovery spa with Finnish smoke sauna',
      'Geothermal snow-melt driveway, terraces, and heated 6-car subterranean garage'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'alpine',
      skyTop: '#060A1C',
      skyBottom: '#141E46',
      glowColor: '#C8102E',
      waterTint: '#0B1838',
      warmLight: '#FFD9A6',
      accentLight: '#C8102E',
      label: 'Kronos Alpine Monolith'
    }),
    gallery: [
      {
        id: 'alpine-south',
        label: 'South Red Mountain Elevation',
        caption: 'Patinated bronze and quartzite monolith glowing against the twilight snowfield.',
        exposureMeta: 'Leica SL3 · 28mm · f/8 · Alpine Blue Hour',
        imageUri: createArchitecturalSvgUri({
          variant: 'alpine',
          skyTop: '#060A1C',
          skyBottom: '#141E46',
          glowColor: '#C8102E',
          waterTint: '#0B1838',
          warmLight: '#FFD9A6',
          accentLight: '#C8102E',
          label: 'South Red Mountain Elevation'
        })
      },
      {
        id: 'thermal-courtyard',
        label: 'Geothermal Reflecting Basin',
        caption: 'Steaming indoor-outdoor lap pool and heated quartzite fire terrace.',
        exposureMeta: 'Leica SL3 · 35mm · f/5.6 · Nocturnal Steam',
        imageUri: createArchitecturalSvgUri({
          variant: 'courtyard',
          skyTop: '#050A1D',
          skyBottom: '#121C40',
          glowColor: '#82D1ED',
          waterTint: '#0B1A3C',
          warmLight: '#FFE2B8',
          accentLight: '#82D1ED',
          label: 'Geothermal Reflecting Basin'
        })
      }
    ],
    rooms: [
      {
        id: 'alpine-great-hall',
        name: 'Continental Divide Great Hall',
        level: 'Main Ridge Level',
        dimensions: '56\' × 30\'',
        sqft: 1680,
        ceilingHeight: '20\' 0"',
        materialNote: 'Valser quartzite hearth, quad-pane heated glass',
        x: 60,
        y: 50,
        w: 295,
        h: 145
      },
      {
        id: 'thermal-spa',
        name: 'Geothermal Natatorium & Cryo Spa',
        level: 'Wellness Wing',
        dimensions: '48\' × 26\'',
        sqft: 1248,
        ceilingHeight: '14\' 0"',
        materialNote: 'Black slate thermal basin, cedar sauna, hyperbaric chamber',
        x: 370,
        y: 50,
        w: 210,
        h: 145
      },
      {
        id: 'ski-lounge',
        name: 'Private Apres-Ski & Wine Vault',
        level: 'Lower Slope Level',
        dimensions: '44\' × 28\'',
        sqft: 1232,
        ceilingHeight: '12\' 6"',
        materialNote: 'Heated boot lockers, 2,400-bottle Bordeaux cellar',
        x: 60,
        y: 210,
        w: 520,
        h: 130
      }
    ],
    ndaRequired: true
  },
  {
    id: 'house-of-vesper-geneva',
    title: 'La Maison Vesper',
    subtitle: 'Lakefront minimalist glass pavilion with private boat dock on Lake Geneva',
    location: 'Cologny, Geneva',
    coordinates: '46.2181° N · 6.1833° E',
    typology: 'Cantilevered Pavilion',
    status: 'Private Treaty',
    price: 49500000,
    priceFormatted: '$49,500,000',
    pricePerSqFt: 3867,
    beds: 6,
    baths: 8,
    sqft: 12800,
    exteriorSqft: 7400,
    lotSize: '1.9 Lakefront Acres',
    architect: 'Herzog & de Meuron Alumni Studio',
    completionYear: 2026,
    glazingSystem: 'Ballistic-Rated BR6 Low-Iron Panorama Glass',
    structuralMaterial: 'Swiss Jura Limestone & Anodized Champagne Aluminum',
    acousticRating: 'STC-67 Diplomatic-Grade Security & Acoustic Shielding',
    aviationAccess: '16 mins to Geneva Private Aviation Terminal (LSGG)',
    annualAppreciationProj: '+6.5% CHF-Hedged Sovereign Asset Preservation',
    editorialSummary:
      'Set behind mature cedars on Cologny’s most prestigious lakefront enclave, La Maison Vesper pairs diplomatic-grade security with serene horizontal architecture and a private covered Riva boat house.',
    architecturalThesis:
      'Designed for sovereign principals and art collectors, the residence incorporates a bank-grade subterranean freeport vault alongside luminous, museum-proportioned living galleries overlooking the Jet d’Eau.',
    featuredHighlights: [
      'Private 180-foot Lake Geneva shoreline with covered hydraulic Riva yacht slip',
      'Subterranean Class-10 bank-grade art & horology vault with biometric airlock',
      'Ballistic BR6 architectural glazing indistinguishable from museum crystal',
      'Separate 2,200 sq ft guest pavilion and staff quarters'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'courtyard',
      skyTop: '#05091B',
      skyBottom: '#101A3B',
      glowColor: '#C8102E',
      waterTint: '#0A1734',
      warmLight: '#FFE1B5',
      accentLight: '#C8102E',
      label: 'La Maison Vesper'
    }),
    gallery: [
      {
        id: 'lakefront-facade',
        label: 'Lake Geneva Nocturnal Facade',
        caption: 'Jura limestone horizontals reflected across the calm waters of Lake Geneva.',
        exposureMeta: 'Leica M11 · 35mm APO · f/5.6 · Blue Hour',
        imageUri: createArchitecturalSvgUri({
          variant: 'courtyard',
          skyTop: '#05091B',
          skyBottom: '#101A3B',
          glowColor: '#C8102E',
          waterTint: '#0A1734',
          warmLight: '#FFE1B5',
          accentLight: '#C8102E',
          label: 'Lake Geneva Nocturnal Facade'
        })
      }
    ],
    rooms: [
      {
        id: 'lake-salon',
        name: 'Lakefront Diplomatic Salon',
        level: 'Ground Pavilion',
        dimensions: '58\' × 28\'',
        sqft: 1624,
        ceilingHeight: '16\' 6"',
        materialNote: 'Swiss Jura limestone, BR6 panoramic glazing',
        x: 60,
        y: 50,
        w: 310,
        h: 145
      },
      {
        id: 'horology-vault',
        name: 'Subterranean Freeport & Horology Vault',
        level: 'Vault Level -2',
        dimensions: '36\' × 24\'',
        sqft: 864,
        ceilingHeight: '11\' 0"',
        materialNote: 'Class-10 steel envelope,museum humidity control',
        x: 385,
        y: 50,
        w: 195,
        h: 145
      },
      {
        id: 'riva-boathouse',
        name: 'Private Hydraulic Boathouse',
        level: 'Waterline Level',
        dimensions: '48\' × 22\'',
        sqft: 1056,
        ceilingHeight: '14\' 0"',
        materialNote: 'Direct Lake Geneva launch & teak lounge deck',
        x: 60,
        y: 210,
        w: 520,
        h: 130
      }
    ],
    ndaRequired: true
  },
  {
    id: 'solaris-key-private-peninsula-miami',
    title: 'Solaris Key Private Peninsula',
    subtitle: '280 feet of deep-water Biscayne Bay frontage with private superyacht berth',
    location: 'Indian Creek Enclave, Miami',
    coordinates: '25.8756° N · 80.1389° W',
    typology: 'Coastal Sanctuary',
    status: 'Off-Market',
    price: 62000000,
    priceFormatted: '$62,000,000',
    pricePerSqFt: 3690,
    beds: 8,
    baths: 12,
    sqft: 16800,
    exteriorSqft: 9200,
    lotSize: '1.84 Bayfront Acres',
    architect: 'Marcio Kogan / Studio MK27',
    completionYear: 2026,
    glazingSystem: 'Impact-Rated Miami-Dade HVHZ 20-ft Motorized Glass',
    structuralMaterial: 'Roman Travertine, Brazilian Cumaru Teak & White Architectural Concrete',
    acousticRating: 'STC-65 Tropical Acoustic & Hurricane Shield',
    aviationAccess: '18 mins to Miami-Opa Locka Executive (KOPF)',
    annualAppreciationProj: '+9.2% 5-Yr Ultra-Prime Bayfront Compound Index',
    editorialSummary:
      'Commanding a private point lot with 280 feet of unobstructed Biscayne Bay water frontage, Solaris Key pairs tropical modernist horizontality with a deep-water berth capable of mooring a 165-foot superyacht.',
    architecturalThesis:
      'Perforated brise-soleil teak screens filter twilight across Roman travertine colonnades, leading to a 110-foot saltwater lap basin that merges visually with Biscayne Bay.',
    featuredHighlights: [
      '280 feet of protected deep-water frontage with private 165-ft superyacht dock',
      '110-foot saltwater zero-edge pool with sunken travertine fire lounge',
      '24/7 private island marine & land security patrol',
      'Rooftop astronomical observatory deck and private padel court'
    ],
    heroImage: createArchitecturalSvgUri({
      variant: 'pavilion',
      skyTop: '#04091B',
      skyBottom: '#102149',
      glowColor: '#82D1ED',
      waterTint: '#081D3D',
      warmLight: '#FFE4B8',
      accentLight: '#C8102E',
      label: 'Solaris Key Private Peninsula'
    }),
    gallery: [
      {
        id: 'bayfront-twilight',
        label: 'Biscayne Bay Twilight Perspective',
        caption: 'Roman travertine colonnade and 110-foot zero-edge pool overlooking the Miami skyline.',
        exposureMeta: 'Phase One IQ4 · 24mm · f/8 · Tropical Nocturne',
        imageUri: createArchitecturalSvgUri({
          variant: 'pavilion',
          skyTop: '#04091B',
          skyBottom: '#102149',
          glowColor: '#82D1ED',
          waterTint: '#081D3D',
          warmLight: '#FFE4B8',
          accentLight: '#C8102E',
          label: 'Biscayne Bay Twilight Perspective'
        })
      }
    ],
    rooms: [
      {
        id: 'bay-lanai',
        name: 'Roman Travertine Loggia & Salon',
        level: 'Main Bay Level',
        dimensions: '68\' × 32\'',
        sqft: 2176,
        ceilingHeight: '19\' 0"',
        materialNote: 'Vein-cut Roman travertine, retractable Cumaru louvers',
        x: 60,
        y: 50,
        w: 320,
        h: 145
      },
      {
        id: 'yacht-promenade',
        name: 'Deep-Water SuperyachtQuay',
        level: 'Bayfront Perimeter',
        dimensions: '280\' Linear Dock',
        sqft: 3400,
        ceilingHeight: 'Open Sky',
        materialNote: 'Shore power pedestal for up to 165-ft vessel',
        x: 395,
        y: 50,
        w: 185,
        h: 145
      },
      {
        id: 'primary-peninsula-wing',
        name: 'Peninsula Primary Wing',
        level: 'Upper Canopy Level',
        dimensions: '52\' × 34\'',
        sqft: 1768,
        ceilingHeight: '14\' 0"',
        materialNote: '270-degree water exposure, private plunge terrace',
        x: 60,
        y: 210,
        w: 520,
        h: 130
      }
    ]
  }
];
