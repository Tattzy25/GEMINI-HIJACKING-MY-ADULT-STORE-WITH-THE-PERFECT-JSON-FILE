import type { CinemaFilm, RealProduct } from '../types';
import rawPupulikProducts from './pupulikProducts.json';

const exactOrderHeadlines = [
  "adam & eve eve's ravishing rose rainbow rose vibrator",
  "adam & eve eve's ravishing suction rose vibrator",
  "adam & eve eve's realistic torso",
  "adam & eve finger wag g-spot vibrator",
  "adam & eve finger waves led bullet vibrator",
  "adam & eve flexi lexi wand vibrator",
  "adam & eve gee oh my flexible g-spot vibe",
  "glow-in-the-dark peek-a-booty",
  "crystal trio",
  "adam & eve lilac licks clitoral tongue teaser",
  "adam & eve lilac love wand vibrator",
  "rechargeable magic massager",
  "peek-a-body",
  "pleasure panties",
  "pouty pucker",
  "rose gold clit tickler",
  "rose gold revolving rabbit",
  "violet vixen",
  "thrust bunny",
  "wanda lust",
];

const sortedProducts: RealProduct[] = [...rawPupulikProducts]
  .sort((a, b) => {
    const aLower = a.title.toLowerCase();
    const bLower = b.title.toLowerCase();
    const aIndex = exactOrderHeadlines.findIndex((headline) => aLower.includes(headline));
    const bIndex = exactOrderHeadlines.findIndex((headline) => bLower.includes(headline));

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Adam & eve items first
    const aIsAdam = aLower.includes('adam');
    const bIsAdam = bLower.includes('adam');
    if (aIsAdam && !bIsAdam) return -1;
    if (!aIsAdam && bIsAdam) return 1;

    return 0;
  })
  .map((p, idx) => {
    const isSpecialSale = p.title.toLowerCase().includes('magic massager') || idx === 10;
    return {
      ...p,
      isSale: isSpecialSale || Boolean(p.isSale),
      comparePrice: isSpecialSale ? Math.round(p.price * 1.25) : p.comparePrice,
      rating: +(4.85 + ((idx * 7) % 15) * 0.01).toFixed(2),
      reviewsCount: 42 + ((idx * 17) % 280),
    };
  });

export const PUPULIK_PRODUCTS: RealProduct[] = sortedProducts;
export const FEATURED_PRODUCTS: RealProduct[] = sortedProducts;

export const VR_CINEMA_FILMS: CinemaFilm[] = [
  {
    id: 'vr-film-01',
    title: 'Obsidian Velvet: Tokyo Midnight',
    studio: 'Pupulik Spatial Studios',
    durationMin: 52,
    resolution: '8K 60FPS',
    povModes: ['Director', 'Partner A', 'Partner B', '360 Ambient'],
    category: 'Spatial 180° VR',
    pupulikUrl: 'https://pupulik.com/collections/all',
    synopsis: 'Shot on 8K RED V-Raptor 180° stereoscopic rigs with spatial binaural audio in a rain-drenched Shinjuku penthouse. Experience an authentic, unfiltered night of passionate intimacy with synchronized dual-motor haptics.',
    cast: ['Yuki Tanaka', 'Elena Vance'],
    priceDigitalUsd: 34.00,
    hapticTrackAvailable: true,
    hapticIntensityDefault: 85,
    rating: 4.96,
    viewsCount: '48.2k',
    previewColorGradient: 'from-rose-950 via-neutral-900 to-black',
  },
  {
    id: 'vr-film-02',
    title: 'Neural Nexus: The Cyber Suite',
    studio: 'Pupulik XR Cinema',
    durationMin: 64,
    resolution: '12K Spatial',
    povModes: ['Director', 'Partner A', '360 Ambient'],
    category: 'Cyber Noir',
    pupulikUrl: 'https://pupulik.com/collections/all',
    synopsis: 'A high-contrast cinematic exploration of futuristic desire in a neo-noir metropolis. Featuring reactive haptic tracks that pulse with the deep synth score and actors’ proximity.',
    cast: ['Sloan Rivera', 'Dante Cruz'],
    priceDigitalUsd: 39.00,
    hapticTrackAvailable: true,
    hapticIntensityDefault: 90,
    rating: 4.91,
    viewsCount: '36.5k',
    previewColorGradient: 'from-indigo-950 via-neutral-900 to-black',
  },
  {
    id: 'vr-film-03',
    title: 'Raw Intimacy: The Uncut Session',
    studio: 'Authentic 21 Studio',
    durationMin: 46,
    resolution: '8K 60FPS',
    povModes: ['Partner A', 'Partner B', 'Director'],
    category: 'Raw Intimacy',
    pupulikUrl: 'https://pupulik.com/collections/all',
    synopsis: 'Completely unscripted and raw. Natural lighting, genuine connection, and uninhibited pleasure captured in 8K high dynamic range. No stage makeup, no filter—just visceral human intimacy.',
    cast: ['Maya Chen', 'Leo Sterling'],
    priceDigitalUsd: 29.00,
    hapticTrackAvailable: true,
    hapticIntensityDefault: 75,
    rating: 4.98,
    viewsCount: '62.1k',
    previewColorGradient: 'from-amber-950 via-neutral-900 to-black',
  },
  {
    id: 'vr-film-04',
    title: 'Sensory Solitude: Touch & Breath',
    studio: 'Pupulik Haptic Lab',
    durationMin: 42,
    resolution: '8K 60FPS',
    povModes: ['Director', '360 Ambient'],
    category: 'Sensory ASMR',
    pupulikUrl: 'https://pupulik.com/collections/all',
    synopsis: 'An audio-tactile meditation on sensuality. Ultra-macro 8K stereoscopic lenses capture the subtlest skin goosebumps, paired with 3D binaural whispers and whisper-soft haptic pulses.',
    cast: ['Chloe Delacroix'],
    priceDigitalUsd: 28.00,
    hapticTrackAvailable: true,
    hapticIntensityDefault: 60,
    rating: 4.87,
    viewsCount: '29.3k',
    previewColorGradient: 'from-emerald-950 via-neutral-900 to-black',
  },
];
