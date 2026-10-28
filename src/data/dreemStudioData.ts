export interface LandmarkPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Inside' | 'By owner';
  locationTag: string;
}

export interface LandmarkProperty {
  id: string;
  index: string;
  title: string;
  category: 'Model City 1' | 'Orchard Homes' | 'Commercial Plots' | 'Turnkey Houses';
  location: string;
  plotSize: string;
  areaSqFt: number;
  pricePkr: string;
  priceNumericLakhs: number;
  status: string;
  leadAdvisor: string;
  verificationNote: string;
  summary: string;
  architecturalBrief: string;
  features: string[];
  imageUri: string;
  galleryPhotos: string[];
  rooms: {
    name: string;
    dimensions: string;
    sqft: number;
    level: string;
    note: string;
  }[];
}

export interface LandmarkReview {
  id: string;
  author: string;
  badge: string;
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
  photoUrl?: string;
  ownerResponse?: {
    timeAgo: string;
    text: string;
  };
  tags: string[];
}

export const UPLOADED_LANDMARK_PHOTOS: LandmarkPhoto[] = [
  {
    id: 'photo-gate',
    src: '/assets/aistudio/unnamed__6__d5c54346.jpg',
    title: 'Orchard Homes Grand Entrance Gate',
    caption: 'Monumental stone-clad security gate and carpeted dual-carriageway entrance on Chak 208 Rd, Faisalabad.',
    category: 'By owner',
    locationTag: 'Main Gate · Chak 208 Rd'
  },
  {
    id: 'photo-boulevard',
    src: '/assets/aistudio/unnamed_66aee140.jpg',
    title: 'Main Boulevard, Grand Mosque & Developed Villas',
    caption: 'Aerial view of carpeted dual carriageway with landscaped green belt, community mosque, and modern houses.',
    category: 'By owner',
    locationTag: 'Main Boulevard Aerial'
  },
  {
    id: 'photo-water-tank',
    src: '/assets/aistudio/unnamed__4__b2df806d.jpg',
    title: 'Orchard Homes Overhead Water Tank & Sector View',
    caption: 'Master-planned housing blocks with sweet water supply infrastructure and green parks.',
    category: 'By owner',
    locationTag: 'Orchard Homes Sector'
  },
  {
    id: 'photo-night-elevation',
    src: '/assets/aistudio/unnamed__3__49183241.jpg',
    title: 'Double-Story Residence Nocturnal Front Elevation',
    caption: 'Modern terracotta and stone-clad front elevation with LED exterior illumination and upper terrace.',
    category: 'By owner',
    locationTag: 'Model City 1 House'
  },
  {
    id: 'photo-bedroom',
    src: '/assets/aistudio/unnamed__7__b2965032.jpg',
    title: 'Master Bedroom Suite with Built-In Wardrobes',
    caption: 'Spacious tiled bedroom with full-height white wall wardrobes and seating area.',
    category: 'Inside',
    locationTag: 'Ground Floor Master Suite'
  },
  {
    id: 'photo-tv-lounge',
    src: '/assets/aistudio/unnamed__2__bf9a5104.jpg',
    title: 'Family TV Lounge & Living Hall',
    caption: 'Central family lounge with media cabinet, wide French windows, and warm lighting.',
    category: 'Inside',
    locationTag: 'Main TV Lounge'
  },
  {
    id: 'photo-kitchen',
    src: '/assets/aistudio/unnamed__8__93f63afe.jpg',
    title: 'Fitted Family Kitchen with Glass Cabinetry',
    caption: 'Complete kitchen featuring glass-front upper cabinets, range hood, marble counter, and dual sink.',
    category: 'Inside',
    locationTag: 'Ground Floor Kitchen'
  },
  {
    id: 'photo-porch',
    src: '/assets/aistudio/unnamed__9__181a0fb1.jpg',
    title: 'Private Car Porch & Landscaped Boundary Wall',
    caption: 'Secure gated porch with decorative ironwork inserts and climbing courtyard greenery.',
    category: 'Inside',
    locationTag: 'Entrance Car Porch'
  },
  {
    id: 'photo-upper-hall',
    src: '/assets/aistudio/unnamed__1__1ef2202b.jpg',
    title: 'High-Ceiling Upper Lobby & Bedrooms',
    caption: 'Bright upper-level hall with paneled wooden doors, ceiling fan, and smooth distemper finish.',
    category: 'Inside',
    locationTag: 'First Floor Hall'
  },
  {
    id: 'photo-staircase',
    src: '/assets/aistudio/unnamed__5__a831e357.jpg',
    title: 'Internal Staircase with Wrought-Iron Railing',
    caption: 'Custom wrought-iron balustrade connecting ground and first-floor living portions.',
    category: 'Inside',
    locationTag: 'Internal Stairwell'
  }
];

/**
 * Two-point perspective SVG recreation of the modern cantilevered wood-and-glass villa
 * from the user's reference design.
 */
export function getDreemHeroVillaSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 760" width="1100" height="760">
    <defs>
      <linearGradient id="skyFade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F4F4F2"/>
        <stop offset="55%" stop-color="#EFECE6"/>
        <stop offset="100%" stop-color="#E2DFD7"/>
      </linearGradient>
      <linearGradient id="cedarSoffit" x1="0%" y1="0%" x2="100%" y2="20%">
        <stop offset="0%" stop-color="#7A4928"/>
        <stop offset="50%" stop-color="#A5663B"/>
        <stop offset="100%" stop-color="#5E351B"/>
      </linearGradient>
      <linearGradient id="woodClad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6B4226"/>
        <stop offset="100%" stop-color="#4A2C18"/>
      </linearGradient>
      <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D8E6EE" stop-opacity="0.78"/>
        <stop offset="45%" stop-color="#9BB7C9" stop-opacity="0.52"/>
        <stop offset="100%" stop-color="#2A3740" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="warmRoom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F5D7B2"/>
        <stop offset="60%" stop-color="#CFA272"/>
        <stop offset="100%" stop-color="#523A24"/>
      </linearGradient>
      <linearGradient id="roofFascia" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#5A5D60"/>
        <stop offset="55%" stop-color="#373A3D"/>
        <stop offset="100%" stop-color="#222426"/>
      </linearGradient>
    </defs>

    <rect width="1100" height="760" fill="url(#skyFade)"/>
    <polygon points="160,625 790,560 1100,635 1100,745 480,720" fill="#D5D2CA"/>

    <g opacity="0.95">
      <path d="M295,550 C295,480 280,430 265,375 M290,460 L330,395 M282,435 L235,380" stroke="#5A4632" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="245" cy="310" r="68" fill="#6F7344"/>
      <circle cx="305" cy="275" r="74" fill="#848852"/>
      <circle cx="360" cy="305" r="58" fill="#65693D"/>
      <circle cx="215" cy="355" r="52" fill="#7D814E"/>
      <circle cx="285" cy="350" r="64" fill="#5B5F36"/>
      <circle cx="335" cy="235" r="46" fill="#959962"/>
    </g>

    <polygon points="315,242 465,192 465,412 315,432" fill="#EAE7E0" stroke="#C8C4BC" stroke-width="1"/>
    <polygon points="328,255 458,210 458,402 328,420" fill="#B9B4AA"/>
    <polygon points="415,195 755,68 1095,188 1095,222 755,108 415,222" fill="url(#roofFascia)"/>
    <polygon points="415,222 755,108 1095,222 1005,256 745,168 465,248" fill="url(#cedarSoffit)"/>
    <polygon points="710,132 752,118 785,134 743,148" fill="#E9F2F7" stroke="#2B2B2B" stroke-width="3"/>
    <polygon points="762,150 804,136 836,152 794,166" fill="#E9F2F7" stroke="#2B2B2B" stroke-width="3"/>

    <polygon points="465,235 645,176 645,358 465,392" fill="url(#woodClad)"/>
    <g stroke="#341E0F" stroke-width="2" opacity="0.65">
      <line x1="485" y1="229" x2="485" y2="388"/>
      <line x1="505" y1="222" x2="505" y2="385"/>
      <line x1="525" y1="215" x2="525" y2="381"/>
      <line x1="545" y1="209" x2="545" y2="377"/>
      <line x1="565" y1="202" x2="565" y2="373"/>
      <line x1="585" y1="196" x2="585" y2="369"/>
      <line x1="605" y1="189" x2="605" y2="365"/>
      <line x1="625" y1="183" x2="625" y2="361"/>
    </g>

    <polygon points="645,176 755,140 965,212 965,376 755,335 645,358" fill="url(#glassReflect)" stroke="#1E2022" stroke-width="6"/>
    <line x1="755" y1="140" x2="755" y2="335" stroke="#181A1C" stroke-width="8"/>
    <line x1="865" y1="178" x2="865" y2="355" stroke="#181A1C" stroke-width="5"/>
    <polygon points="965,212 1085,252 1085,398 965,376" fill="url(#woodClad)"/>

    <polygon points="555,318 755,272 955,318 955,365 755,332 555,368" fill="#DCEBF2" fill-opacity="0.42" stroke="#FFFFFF" stroke-width="1.5"/>
    <g>
      <circle cx="605" cy="348" r="14" fill="#3B5323"/>
      <circle cx="655" cy="338" r="11" fill="#4E6B31"/>
      <circle cx="725" cy="316" r="16" fill="#2E421B"/>
      <circle cx="815" cy="328" r="15" fill="#3E5726"/>
    </g>

    <polygon points="315,412 755,326 1085,396 1085,428 755,366 315,436" fill="url(#roofFascia)"/>
    <polygon points="340,436 755,366 1065,426 995,442 750,395 410,448" fill="url(#cedarSoffit)"/>

    <polygon points="365,440 555,412 555,585 365,595" fill="#DFDDD6"/>
    <polygon points="415,455 475,446 475,588 415,592" fill="#232629"/>
    <polygon points="485,432 565,418 565,585 485,589" fill="url(#woodClad)"/>

    <polygon points="565,412 755,380 955,420 955,605 755,592 565,585" fill="url(#warmRoom)" stroke="#1B1D1F" stroke-width="6"/>
    <polygon points="625,535 795,525 835,565 595,572" fill="#F4F2EE"/>
    <polygon points="595,565 835,558 835,582 595,585" fill="#3A3632"/>
    <polygon points="565,412 755,380 755,592 565,585" fill="#A8C6D8" fill-opacity="0.28"/>
    <line x1="755" y1="380" x2="755" y2="592" stroke="#16181A" stroke-width="9"/>
    <line x1="655" y1="397" x2="655" y2="588" stroke="#16181A" stroke-width="5"/>
    <line x1="865" y1="402" x2="865" y2="598" stroke="#16181A" stroke-width="5"/>

    <polygon points="955,420 1075,444 1075,612 955,605" fill="url(#woodClad)"/>
    <polygon points="285,592 755,588 1090,618 1090,655 710,645 245,622" fill="#ECEAE4" stroke="#CCC8BE" stroke-width="1.5"/>
    <polygon points="465,612 785,608 860,648 430,642" fill="#D8D4CA"/>

    <g>
      <ellipse cx="325" cy="592" rx="34" ry="18" fill="#4A632D"/>
      <ellipse cx="395" cy="596" rx="42" ry="20" fill="#5D783B"/>
      <ellipse cx="475" cy="602" rx="38" ry="18" fill="#3B5222"/>
      <ellipse cx="545" cy="608" rx="30" ry="15" fill="#678543"/>
      <ellipse cx="835" cy="624" rx="38" ry="22" fill="#465E2A"/>
      <ellipse cx="975" cy="632" rx="28" ry="16" fill="#587336"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const LANDMARK_PROPERTIES: LandmarkProperty[] = [
  {
    id: 'orchard-homes-main-gate-plots',
    index: '01',
    title: 'ORCHARD HOMES & MODEL CITY 1 — PRIME PLOTS & VILLAS',
    category: 'Orchard Homes',
    location: 'Chak 208 Rd, Model City 1 / Orchard Homes, Faisalabad',
    plotSize: '5, 7, 10 Marla & 1 Kanal',
    areaSqFt: 2722,
    pricePkr: 'PKR 14.5 Lakh / Marla',
    priceNumericLakhs: 145,
    status: 'Grand Entrance Gate · Immediate Possession',
    leadAdvisor: 'LandMark Senior Property Desk',
    verificationNote: 'Gated Security · Wide Carpeted Roads · Overhead Water Tank',
    summary:
      'Master-planned gated housing society with monumental stone entrance gate, carpeted dual-carriageway roads, grand mosque, and overhead water reservoir on Chak 208 Rd.',
    architecturalBrief:
      'Guided on actual grounds by LandMark Real Estate & Developers (154C, Chak 208 Rd). Features underground sewerage, dedicated green belts, and immediate construction permission.',
    features: [
      '24/7 Manned Monumental Security Gate & Boundary Wall',
      '80-Ft & 40-Ft Carpeted Dual-Carriageway Boulevards',
      'Dedicated Overhead Sweet-Water Reservoir Tank',
      'Grand Jamia Mosque & Landscaped Family Parks'
    ],
    imageUri: '/assets/aistudio/unnamed__6__d5c54346.jpg',
    galleryPhotos: [
      '/assets/aistudio/unnamed__6__d5c54346.jpg',
      '/assets/aistudio/unnamed_66aee140.jpg',
      '/assets/aistudio/unnamed__4__b2df806d.jpg'
    ],
    rooms: [
      {
        name: '5 Marla Residential Plot',
        dimensions: '25\' × 45\'',
        sqft: 1125,
        level: 'On-Ground Plot',
        note: 'Facing park & near Grand Mosque'
      },
      {
        name: '10 Marla Residential Plot',
        dimensions: '35\' × 65\'',
        sqft: 2275,
        level: 'Main Boulevard Approach',
        note: 'Ready for immediate house construction'
      }
    ]
  },
  {
    id: 'model-city-1-double-story-house',
    index: '02',
    title: 'DOUBLE-STORY FAMILY HOUSE — MODEL CITY 1',
    category: 'Turnkey Houses',
    location: '154C Approach, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town',
    plotSize: '7 Marla Double Story',
    areaSqFt: 2650,
    pricePkr: 'PKR 2.45 Crore',
    priceNumericLakhs: 245,
    status: 'Move-In Ready · Actual Photos Attached',
    leadAdvisor: 'LandMark Residential Team',
    verificationNote: 'Solid Brick Construction · Complete Woodwork & Wardrobes',
    summary:
      'Ready-to-move double-story family residence featuring warm LED exterior elevation lighting, spacious master bedrooms with full wardrobes, fitted glass-cabinet kitchen, and private car porch.',
    architecturalBrief:
      'Inspected and verified on actual grounds. Includes separate ground and first-floor access via internal wrought-iron staircase, ideal for a joint or growing family in Model City 1.',
    features: [
      'Modern Terracotta & Stone Front Elevation with LED Spotlights',
      'Spacious Master Bedrooms with Full-Wall Wooden Wardrobes',
      'Central Family TV Lounge & High-Ceiling Ventilation Lobby',
      'Fitted Kitchen with Glass Cabinets, Hood & Marble Countertop'
    ],
    imageUri: '/assets/aistudio/unnamed__3__49183241.jpg',
    galleryPhotos: [
      '/assets/aistudio/unnamed__3__49183241.jpg',
      '/assets/aistudio/unnamed__7__b2965032.jpg',
      '/assets/aistudio/unnamed__2__bf9a5104.jpg',
      '/assets/aistudio/unnamed__8__93f63afe.jpg',
      '/assets/aistudio/unnamed__9__181a0fb1.jpg',
      '/assets/aistudio/unnamed__1__1ef2202b.jpg',
      '/assets/aistudio/unnamed__5__a831e357.jpg'
    ],
    rooms: [
      {
        name: 'Master Bedroom Suite',
        dimensions: '16\' × 14\'',
        sqft: 224,
        level: 'Ground & First Floor',
        note: 'Full-height white wooden wardrobes & tiled flooring'
      },
      {
        name: 'Family TV Lounge & Living Hall',
        dimensions: '20\' × 15\'',
        sqft: 300,
        level: 'Ground Floor',
        note: 'Media console wall & French window ventilation'
      },
      {
        name: 'Fitted Family Kitchen',
        dimensions: '12\' × 10\'',
        sqft: 120,
        level: 'Ground Floor',
        note: 'Glass-front cabinets, range hood & marble slab'
      },
      {
        name: 'Gated Car Porch & Courtyard',
        dimensions: '16\' × 14\'',
        sqft: 224,
        level: 'Entrance Level',
        note: 'Decorative ironwork boundary wall & greenery'
      }
    ]
  },
  {
    id: 'main-boulevard-commercial-villas',
    index: '03',
    title: 'MAIN BOULEVARD COMMERCIAL & MOSQUE SECTOR',
    category: 'Commercial Plots',
    location: 'Chak 208 Rd, Model City 1 / Orchard Homes Boulevard, Faisalabad',
    plotSize: '4 & 8 Marla Commercial',
    areaSqFt: 3600,
    pricePkr: 'PKR 3.60 Crore',
    priceNumericLakhs: 360,
    status: 'Direct Main Road Frontage · High ROI',
    leadAdvisor: 'LandMark Dealer Network Desk',
    verificationNote: '80-Ft Dual Carriageway · Opposite Grand Jamia Mosque',
    summary:
      'Prime commercial and corner residential plots situated directly on the landscaped dual-carriageway main boulevard with palm median and active residential population.',
    architecturalBrief:
      'High-visibility commercial plots ideal for supermarkets, pharmacies, clinics, and real estate/corporate offices serving Model City 1 and Nasar Ullah Khan Town.',
    features: [
      'Direct Frontage on Carpeted Dual-Carriageway Boulevard',
      'Adjacent to Grand Community Mosque & Populated Houses',
      'Underground Sewerage, Street Lights & Transformer Installed',
      'Strong B2B Dealer Network Resale & Rental Demand'
    ],
    imageUri: '/assets/aistudio/unnamed_66aee140.jpg',
    galleryPhotos: [
      '/assets/aistudio/unnamed_66aee140.jpg',
      '/assets/aistudio/unnamed__6__d5c54346.jpg',
      '/assets/aistudio/unnamed__4__b2df806d.jpg'
    ],
    rooms: [
      {
        name: 'Main Boulevard Commercial Plot',
        dimensions: '30\' × 60\'',
        sqft: 1800,
        level: 'Commercial Zone',
        note: 'Dedicated service road & front parking apron'
      },
      {
        name: 'Corner Residential Villa Plot',
        dimensions: '35\' × 65\'',
        sqft: 2275,
        level: 'Boulevard Sector',
        note: 'Two-side open corner facing green median'
      }
    ]
  },
  {
    id: 'orchard-homes-sector-block',
    index: '04',
    title: 'ORCHARD HOMES DEVELOPED SECTOR PLOTS',
    category: 'Model City 1',
    location: 'Nasar Ullah Khan Town / Chak 208 Rd, Faisalabad',
    plotSize: '5 & 10 Marla On-Ground',
    areaSqFt: 2275,
    pricePkr: 'PKR 68 Lakh – 1.45 Crore',
    priceNumericLakhs: 95,
    status: '100% Developed · Registry / File Transfer',
    leadAdvisor: 'LandMark On-Ground Verification Team',
    verificationNote: 'Overhead Water Reservoir · Carpeted Streets & Parks',
    summary:
      'Fully developed on-ground residential plots surrounding the central Orchard Homes water reservoir with carpeted streets, boundary wall security, and rapid house construction.',
    architecturalBrief:
      'Our team guides buyers on actual grounds so you can inspect your exact plot number, street level, and surrounding constructed homes before token money.',
    features: [
      'Central Overhead Water Tank Ensuring 24/7 Water Pressure',
      'Carpeted 30-Ft & 40-Ft Internal Sector Streets',
      'Clear Physical Plot Demarcation on Actual Grounds',
      'Long-Term Investor & Dealer Network Trading Support'
    ],
    imageUri: '/assets/aistudio/unnamed__4__b2df806d.jpg',
    galleryPhotos: [
      '/assets/aistudio/unnamed__4__b2df806d.jpg',
      '/assets/aistudio/unnamed__6__d5c54346.jpg',
      '/assets/aistudio/unnamed_66aee140.jpg'
    ],
    rooms: [
      {
        name: '5 Marla On-Ground Plot',
        dimensions: '25\' × 45\'',
        sqft: 1125,
        level: 'Sector Block A & B',
        note: 'Immediate possession for house construction'
      },
      {
        name: '10 Marla Park-Facing Plot',
        dimensions: '35\' × 65\'',
        sqft: 2275,
        level: 'Main Sector Block',
        note: 'Near overhead water reservoir & central park'
      }
    ]
  }
];

export const FAISALABAD_ENCLAVES = [
  {
    id: 'model-city-1',
    name: 'MODEL CITY 1',
    sub: '154C Chak 208 Rd HQ',
    specialty: 'Our Head Office at 154C, Chak 208 Rd, Model City 1, Nasar Ullah Khan Town — 24/7 on-ground property dealing.'
  },
  {
    id: 'orchard-homes',
    name: 'ORCHARD HOMES',
    sub: 'Gated Housing Society',
    specialty: 'Monumental entrance gate, overhead water tank, carpeted boulevards, and ready 5 & 10 Marla plots.'
  },
  {
    id: 'dealer-network',
    name: 'DEALER NETWORK',
    sub: 'B2B Trading Desk',
    specialty: 'Trusted long-term investor & property dealer network across Faisalabad with transparent plot and house deals.'
  },
  {
    id: 'turnkey-homes',
    name: 'READY HOUSES',
    sub: 'Inspected Interiors',
    specialty: 'Double-story family homes with complete wardrobes, fitted kitchens, TV lounges, and clear title.'
  },
  {
    id: 'actual-grounds',
    name: 'ON-GROUND AUDIT',
    sub: '4.9★ Rated Team',
    specialty: 'Educated staff guiding every client on actual physical grounds with 50+ verified Google reviews.'
  }
];

export const VERIFIED_REVIEWS: LandmarkReview[] = [
  {
    id: 'rev-aitsam',
    author: 'Aitsam Ahmad',
    badge: '1 review · 1 photo',
    timeAgo: '5 years ago',
    rating: 5,
    text: 'Alhamdulillah. I bought a new home by help of the team of LandMark real estate. They are very good and professional team, their working style is different from other dealers. Good behaviour and educated staff.',
    likes: 2,
    photoUrl: '/assets/aistudio/unnamed__3__49183241.jpg',
    ownerResponse: {
      timeAgo: '5 years ago',
      text: 'Thanks for your Feedback...'
    },
    tags: ['professional team', 'working style', 'behaviour', 'real estate industry', 'work']
  },
  {
    id: 'rev-ali',
    author: 'Ali Sharafat',
    badge: '1 review · Dealer Network',
    timeAgo: '5 years ago',
    rating: 5,
    text: 'Working with landmark estates as a dealer network, done many deals. So far satisfied and looking for long terms business.',
    likes: 3,
    ownerResponse: {
      timeAgo: '4 years ago',
      text: 'Thanks'
    },
    tags: ['dealer network', 'real estate industry', 'work']
  },
  {
    id: 'rev-zubair',
    author: 'Zubair Ahmed',
    badge: '5 reviews · 4 photos',
    timeAgo: '5 years ago',
    rating: 5,
    text: 'I found them one of the loyal real estate company in area. They people are very professional and guided the client on actual grounds. Keep Glowing',
    likes: 1,
    photoUrl: '/assets/aistudio/unnamed__6__d5c54346.jpg',
    ownerResponse: {
      timeAgo: '5 years ago',
      text: 'Thanks'
    },
    tags: ['professional team', 'real estate industry', 'work', 'working style', 'behaviour']
  }
];

export const REVIEW_TOPICS = [
  { id: 'All', label: 'All', count: 50 },
  { id: 'real estate industry', label: 'real estate industry', count: 7 },
  { id: 'professional team', label: 'professional team', count: 5 },
  { id: 'work', label: 'work', count: 5 },
  { id: 'working style', label: 'working style', count: 2 },
  { id: 'dealer network', label: 'dealer network', count: 2 },
  { id: 'behaviour', label: 'behaviour', count: 2 }
];
