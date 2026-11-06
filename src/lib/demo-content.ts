import type {
  About,
  JournalPost,
  Media,
  PortfolioCategory,
  PortfolioProject,
  Service,
  Testimonial,
} from '@/payload-types'

const now = '2026-11-06T00:00:00.000Z'

const media = (id: number, alt: string, url: string, width = 1600, height = 2400): Media => ({
  id,
  alt,
  createdAt: now,
  updatedAt: now,
  url,
  width,
  height,
  mimeType: 'image/jpeg',
})

const textNode = (text: string) => ({
  type: 'text',
  text,
  version: 1,
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const headingNode = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  tag,
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const quoteNode = (text: string) => ({
  type: 'quote',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const richText = (...nodes: Array<ReturnType<typeof paragraphNode> | ReturnType<typeof headingNode> | ReturnType<typeof quoteNode>>) => ({
  root: {
    type: 'root',
    children: nodes,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const demoImages = {
  hero: media(
    -101,
    'Editorial bridal beauty portrait with refined makeup and jewelry',
    'https://images.pexels.com/photos/29352013/pexels-photo-29352013/free-photo-of-elegant-bridal-portrait-with-glamorous-makeup.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  bridal: media(
    -102,
    'Bride with elegant makeup and ornate jewelry',
    'https://images.pexels.com/photos/10954271/pexels-photo-10954271.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  editorial: media(
    -103,
    'Editorial beauty portrait with glossy modern makeup',
    'https://images.pexels.com/photos/15579920/pexels-photo-15579920/free-photo-of-model-posing-in-glossy-makeup.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  modern: media(
    -104,
    'Modern beauty portrait with bold makeup and soft studio light',
    'https://images.pexels.com/photos/4927364/pexels-photo-4927364.jpeg?auto=compress&cs=tinysrgb&w=1800',
    1600,
    2240,
  ),
  artistAtWork: media(
    -105,
    'Makeup artist applying cosmetics to a model during a studio session',
    'https://images.pexels.com/photos/6044654/pexels-photo-6044654.jpeg?auto=compress&cs=tinysrgb&w=1800',
    1800,
    1192,
  ),
  eyeDetail: media(
    -106,
    'Close-up of professional eye makeup application',
    'https://images.pexels.com/photos/6954217/pexels-photo-6954217.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  bridalProcess: media(
    -107,
    'Close-up bridal makeup application focused on the eyes',
    'https://images.pexels.com/photos/34025162/pexels-photo-34025162/free-photo-of-bridal-makeup-application-close-up.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  gettingReady: media(
    -108,
    'Bride getting ready with a professional makeup artist',
    'https://images.pexels.com/photos/34037599/pexels-photo-34037599/free-photo-of-bride-getting-ready-with-professional-makeup-artist.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  artistic: media(
    -109,
    'Artistic bridal fashion makeup portrait',
    'https://images.pexels.com/photos/30825631/pexels-photo-30825631/free-photo-of-stunning-artistic-bridal-fashion-makeup-portrait.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  softBride: media(
    -110,
    'Bride in a glamorous wedding look with soft polished makeup',
    'https://images.pexels.com/photos/19730652/pexels-photo-19730652/free-photo-of-makeup-of-bride.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ),
  warmBride: media(
    -111,
    'Warm close-up bridal portrait with elegant accessories',
    'https://images.pexels.com/photos/18478116/pexels-photo-18478116/free-photo-of-face-of-bride.jpeg?auto=compress&cs=tinysrgb&w=1800',
    1800,
    1200,
  ),
} as const

export const demoHeroImage = demoImages.hero

export const demoPortfolioCategories: PortfolioCategory[] = [
  { id: -201, title: 'Bridal', slug: 'bridal', sortOrder: 1, createdAt: now, updatedAt: now },
  { id: -202, title: 'Editorial', slug: 'editorial', sortOrder: 2, createdAt: now, updatedAt: now },
  { id: -203, title: 'Occasion', slug: 'occasion', sortOrder: 3, createdAt: now, updatedAt: now },
]

const category = (slug: string) =>
  demoPortfolioCategories.find((item) => item.slug === slug) || demoPortfolioCategories[0]

export const demoPortfolioProjects: PortfolioProject[] = [
  {
    id: -301,
    title: 'Soft Ceremony Light',
    slug: 'soft-ceremony-light',
    category: category('bridal'),
    clientName: 'Bridal Study I',
    excerpt: 'Luminous skin, softly defined eyes, and a finish designed to remain effortless in daylight.',
    heroImage: demoImages.hero,
    story: richText(
      headingNode('A bridal look built around light, not coverage.'),
      paragraphNode('The complexion stays fresh and dimensional while the eyes are softly structured. The intention is polish without losing the small details that make the face recognisable.'),
      quoteNode('The best bridal makeup should still feel like your own face when the photographs come back.'),
    ),
    gallery: [
      { image: demoImages.bridalProcess, caption: 'Preparation / eye detail', presentation: 'portrait', id: 'd1' },
      { image: demoImages.gettingReady, caption: 'The getting-ready atmosphere', presentation: 'landscape', id: 'd2' },
      { image: demoImages.bridal, caption: 'Finished bridal portrait', presentation: 'wide', id: 'd3' },
      { image: demoImages.eyeDetail, caption: 'Soft definition and texture', presentation: 'portrait', id: 'd4' },
    ],
    eventDate: '2026-02-14T00:00:00.000Z',
    location: 'Colombo',
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -302,
    title: 'Modern Restraint',
    slug: 'modern-restraint',
    category: category('editorial'),
    clientName: 'Beauty Editorial',
    excerpt: 'Clean skin, graphic focus, and a quiet editorial finish shaped for close camera work.',
    heroImage: demoImages.editorial,
    story: richText(
      headingNode('A study in skin, shape, and restraint.'),
      paragraphNode('Editorial makeup can be expressive without becoming loud. Here the finish is deliberate, glossy in the right places, and controlled enough for a close beauty frame.'),
    ),
    gallery: [
      { image: demoImages.modern, caption: 'Modern beauty portrait', presentation: 'portrait', id: 'e1' },
      { image: demoImages.artistAtWork, caption: 'Backstage preparation', presentation: 'wide', id: 'e2' },
      { image: demoImages.artistic, caption: 'An expressive beauty frame', presentation: 'portrait', id: 'e3' },
    ],
    eventDate: '2026-05-08T00:00:00.000Z',
    location: 'Studio',
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -303,
    title: 'Pearl & Veil',
    slug: 'pearl-and-veil',
    category: category('bridal'),
    clientName: 'Bridal Study II',
    excerpt: 'A polished bridal direction with softly sculpted skin, refined eyes, and a graceful classic finish.',
    heroImage: demoImages.softBride,
    story: richText(
      headingNode('Classic bridal beauty, edited down.'),
      paragraphNode('The focus is not on trend-driven detail. It is on balance: soft structure, calm skin, and enough definition to hold beautifully throughout a long wedding day.'),
    ),
    gallery: [
      { image: demoImages.warmBride, caption: 'Warm bridal detail', presentation: 'landscape', id: 'p1' },
      { image: demoImages.bridalProcess, caption: 'Finishing touches', presentation: 'portrait', id: 'p2' },
      { image: demoImages.hero, caption: 'Final portrait', presentation: 'wide', id: 'p3' },
    ],
    eventDate: '2026-06-20T00:00:00.000Z',
    location: 'Galle',
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -304,
    title: 'After Dark',
    slug: 'after-dark',
    category: category('occasion'),
    clientName: 'Evening Study',
    excerpt: 'Defined eyes, luminous complexion, and a confident finish for an evening occasion.',
    heroImage: demoImages.artistic,
    story: richText(
      headingNode('A little more definition, never more noise.'),
      paragraphNode('Evening makeup can carry stronger contrast while keeping the skin believable. The look is built to feel polished under both warm room light and flash photography.'),
    ),
    gallery: [
      { image: demoImages.modern, caption: 'Beauty portrait', presentation: 'portrait', id: 'a1' },
      { image: demoImages.editorial, caption: 'Gloss and definition', presentation: 'portrait', id: 'a2' },
      { image: demoImages.artistAtWork, caption: 'Studio preparation', presentation: 'wide', id: 'a3' },
    ],
    eventDate: '2026-08-09T00:00:00.000Z',
    location: 'Colombo',
    featured: false,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoServices: Service[] = [
  {
    id: -401,
    title: 'Bridal Artistry',
    slug: 'bridal-artistry',
    shortDescription: 'A calm, personal bridal experience built around skin, light, longevity, and how you want to feel.',
    description: richText(
      paragraphNode('From the first conversation to the final touch, the bridal service is designed to feel considered rather than rushed.'),
      headingNode('Designed for the whole day', 'h3'),
      paragraphNode('Skin preparation, complexion balance, eye definition, and finish are planned for real light, photography, and long wear.'),
    ),
    image: demoImages.gettingReady,
    priceLabel: 'Custom quote',
    durationLabel: 'Bridal morning',
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -402,
    title: 'Editorial & Campaign',
    slug: 'editorial-campaign',
    shortDescription: 'Beauty direction for portraits, fashion, campaigns, content, and creative image-making.',
    description: richText(
      paragraphNode('A collaborative service for photographers, brands, stylists, and creatives who need makeup with a clear visual point of view.'),
    ),
    image: demoImages.editorial,
    priceLabel: 'Half / full day',
    durationLabel: 'By brief',
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -403,
    title: 'Occasion Makeup',
    slug: 'occasion-makeup',
    shortDescription: 'Refined makeup for engagements, celebrations, dinners, portraits, and important evenings.',
    description: richText(
      paragraphNode('A polished look tailored to the event, outfit, light, and personal comfort level—never a one-look-fits-all appointment.'),
    ),
    image: demoImages.modern,
    priceLabel: 'By enquiry',
    durationLabel: '90–120 min',
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoTestimonials: Testimonial[] = [
  {
    id: -501,
    clientName: 'Amaya',
    quote: 'I still looked like myself, just calmer, brighter, and somehow more photographed than I thought possible.',
    location: 'Colombo',
    portrait: demoImages.softBride,
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -502,
    clientName: 'Nethmi',
    quote: 'The makeup lasted through the entire day and never felt heavy. The whole morning felt beautifully unhurried.',
    location: 'Galle',
    portrait: demoImages.bridal,
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -503,
    clientName: 'Maya',
    quote: 'She understood the brief immediately and gave the shoot exactly the polished editorial finish we needed.',
    location: 'Studio client',
    portrait: demoImages.editorial,
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoAbout: About = {
  id: -601,
  eyebrow: 'Behind the work',
  heading: 'Beauty with a personal point of view.',
  lead: 'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.',
  portrait: demoImages.artistAtWork,
  story: richText(
    headingNode('Technique matters. So does the way the experience feels.'),
    paragraphNode('My approach begins with the person, not a fixed makeup map. I pay attention to skin, facial structure, wardrobe, photography, the pace of the day, and the level of polish that feels natural to you.'),
    paragraphNode('The goal is never to hide the face. It is to edit, balance, and bring intention to what is already there.'),
    quoteNode('Luxury, to me, is thoughtful attention and enough restraint to know when the look is finished.'),
  ),
  credentials: [
    { id: 'c1', title: 'Bridal & occasion', detail: 'Personal makeup experiences designed around photography, comfort, and long wear.' },
    { id: 'c2', title: 'Editorial direction', detail: 'Beauty work for portraits, fashion stories, campaigns, and creative teams.' },
    { id: 'c3', title: 'Skin-first approach', detail: 'Preparation and complexion work treated as the foundation of every finished look.' },
  ],
  cta: { label: 'Start an enquiry', url: '/contact' },
  updatedAt: now,
  createdAt: now,
}

export const demoJournalPosts: JournalPost[] = [
  {
    id: -701,
    title: 'How to make bridal makeup feel like you',
    slug: 'bridal-makeup-that-feels-like-you',
    excerpt: 'A practical way to think about references, skin, coverage, and the difference between looking polished and looking unfamiliar.',
    featuredImage: demoImages.bridalProcess,
    content: richText(
      paragraphNode('The most useful bridal reference is not always the most dramatic image in your saved folder. It is the one that helps explain how you want to feel when you look in the mirror.'),
      headingNode('Start with the feeling, not the trend'),
      paragraphNode('Bring references for finish, softness, eye definition, lip tone, and skin texture separately. That gives your artist more useful information than trying to copy one complete face.'),
      headingNode('Let skin still look like skin'),
      paragraphNode('Coverage can be strategic. The goal is usually evenness and longevity without removing every natural detail from the complexion.'),
      quoteNode('The best result is polished enough for the photograph and familiar enough for the person wearing it.'),
    ),
    publishedAt: '2026-10-24T08:00:00.000Z',
    featured: true,
    tags: [{ id: 'jt1', label: 'Bridal' }, { id: 'jt2', label: 'Preparation' }],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -702,
    title: 'What good skin preparation actually changes',
    slug: 'what-skin-preparation-changes',
    excerpt: 'Why texture, hydration, timing, and restraint matter more than adding another layer of makeup.',
    featuredImage: demoImages.eyeDetail,
    content: richText(
      paragraphNode('Beautiful complexion makeup starts before foundation. Preparation changes how product sits, how it moves, and how much coverage is needed later.'),
      headingNode('Hydration is not the same as shine'),
      paragraphNode('The right preparation supports flexibility and comfort while still allowing the final finish to be controlled for photography.'),
      headingNode('More product is rarely the answer'),
      paragraphNode('When texture looks heavy, adding coverage can make the problem more visible. Good preparation gives the artist room to use less.'),
    ),
    publishedAt: '2026-10-08T08:00:00.000Z',
    featured: false,
    tags: [{ id: 'js1', label: 'Skin' }, { id: 'js2', label: 'Beauty' }],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -703,
    title: 'Inside an editorial beauty morning',
    slug: 'inside-an-editorial-beauty-morning',
    excerpt: 'A quieter look at references, lighting, testing texture, and the small decisions behind a finished beauty frame.',
    featuredImage: demoImages.artistAtWork,
    content: richText(
      paragraphNode('Editorial beauty work is often less about adding more and more about deciding what the image actually needs.'),
      headingNode('The camera changes the conversation'),
      paragraphNode('Lighting, lens choice, framing, wardrobe, and retouching direction all influence how makeup should be built.'),
      quoteNode('A strong beauty image usually has one clear idea, not ten competing ones.'),
    ),
    publishedAt: '2026-09-18T08:00:00.000Z',
    featured: false,
    tags: [{ id: 'je1', label: 'Editorial' }, { id: 'je2', label: 'Behind the scenes' }],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
]

export const demoPortfolioCards = demoPortfolioProjects.map((project) => {
  const projectCategory =
    typeof project.category === 'object' ? project.category : demoPortfolioCategories[0]
  const image = typeof project.heroImage === 'object' ? project.heroImage : null

  return {
    categorySlug: projectCategory.slug,
    categoryTitle: projectCategory.title,
    excerpt: project.excerpt || null,
    id: project.id,
    image,
    location: project.location || null,
    slug: project.slug,
    title: project.title,
  }
})
