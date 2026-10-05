// Clinic-owned problem finder. This is navigation, not diagnosis.
// Keep every label, alias and destination aligned with the doctor-reviewed Treatments page.

export type ProblemCategory = 'Ear' | 'Nose & sleep' | 'Throat & voice' | 'Neck & thyroid' | 'Children';

export interface ProblemFinderItem {
  id: string;
  title: string;
  /** Doctor/native-speaker review remains required before launch. */
  gujarati?: string;
  category: ProblemCategory;
  summary: string;
  aliases: string[];
  href: string;
  featured?: boolean;
  /** Position in the 3 × 2 generated illustration sheet. */
  image?: { column: 0 | 1 | 2; row: 0 | 1 };
}

export const problemCategories: Array<'All' | ProblemCategory> = [
  'All',
  'Ear',
  'Nose & sleep',
  'Throat & voice',
  'Neck & thyroid',
  'Children',
];

export const problemFinderItems: ProblemFinderItem[] = [
  {
    id: 'ear-pain-discharge',
    title: 'Ear pain or discharge',
    gujarati: 'કાનમાં દુખાવો · કાન વહેવું',
    category: 'Ear',
    summary: 'Pain, repeated ear infections, fluid or discharge from the ear.',
    aliases: ['earache', 'ear infection', 'ear leaking', 'ear fluid', 'ear pus', 'water from ear'],
    href: '/pages/ent.html#ear',
    featured: true,
    image: { column: 0, row: 0 },
  },
  {
    id: 'hearing-less',
    title: 'Hearing less',
    gujarati: 'ઓછું સંભળાવું',
    category: 'Ear',
    summary: 'Sounds seem softer, speech is difficult to follow, or hearing has changed.',
    aliases: ['hearing loss', 'cannot hear', 'hard of hearing', 'reduced hearing', 'hearing aid'],
    href: '/pages/ent.html#ear',
    featured: true,
    image: { column: 1, row: 0 },
  },
  {
    id: 'dizziness-balance',
    title: 'Dizziness or balance trouble',
    gujarati: 'ચક્કર આવવા · સંતુલનમાં તકલીફ',
    category: 'Ear',
    summary: 'Spinning, unsteadiness or a feeling that the surroundings are moving.',
    aliases: ['dizzy', 'vertigo', 'spinning', 'giddiness', 'imbalance', 'unsteady'],
    href: '/pages/ent.html#ear',
    featured: true,
    image: { column: 2, row: 0 },
  },
  {
    id: 'blocked-runny-nose',
    title: 'Blocked or runny nose',
    gujarati: 'નાક બંધ થવું · શરદી',
    category: 'Nose & sleep',
    summary: 'Nasal blockage, repeated sneezing, allergy symptoms or a runny nose.',
    aliases: ['blocked nose', 'stuffy nose', 'runny nose', 'sinus', 'sneezing', 'nasal allergy', 'cold'],
    href: '/pages/ent.html#nose',
    featured: true,
    image: { column: 0, row: 1 },
  },
  {
    id: 'snoring-mouth-breathing',
    title: 'Snoring or mouth breathing',
    gujarati: 'નસકોરાં · મોઢેથી શ્વાસ',
    category: 'Nose & sleep',
    summary: 'Snoring, noisy sleep or breathing through the mouth, including in children.',
    aliases: ['snore', 'mouth breathing', 'child snoring', 'adenoids', 'noisy sleep'],
    href: '/pages/ent.html#nose',
    featured: true,
    image: { column: 1, row: 1 },
  },
  {
    id: 'sore-throat-voice',
    title: 'Sore throat or voice change',
    gujarati: 'ગળામાં દુખાવો · અવાજમાં ફેરફાર',
    category: 'Throat & voice',
    summary: 'Repeated sore throat, tonsil trouble, hoarseness or a change in voice.',
    aliases: ['throat pain', 'tonsils', 'tonsillitis', 'hoarse', 'voice change', 'lost voice'],
    href: '/pages/ent.html#throat',
    featured: true,
    image: { column: 2, row: 1 },
  },
  {
    id: 'trouble-swallowing',
    title: 'Trouble swallowing',
    gujarati: 'ગળવામાં તકલીફ',
    category: 'Throat & voice',
    summary: 'Food, drink or saliva feels difficult or uncomfortable to swallow.',
    aliases: ['difficulty swallowing', 'pain swallowing', 'food stuck', 'swallowing problem'],
    href: '/pages/ent.html#throat',
  },
  {
    id: 'neck-lump-thyroid',
    title: 'A lump or swelling in the neck',
    gujarati: 'ગળામાં ગાંઠ · સોજો',
    category: 'Neck & thyroid',
    summary: 'A new or changing neck lump, swelling or thyroid concern.',
    aliases: ['neck lump', 'neck swelling', 'thyroid', 'goitre', 'gland swelling'],
    href: '/pages/ent.html#head-neck',
  },
  {
    id: 'child-ear-pain',
    title: 'A child with ear pain',
    gujarati: 'બાળકના કાનમાં દુખાવો',
    category: 'Children',
    summary: 'Ear pain, pulling at the ear, discharge or repeated ear infections in a child.',
    aliases: ['child ear infection', 'baby ear pain', 'kid ear pain', 'pulling ear'],
    href: '/pages/ent.html#children',
  },
  {
    id: 'something-stuck',
    title: 'Something stuck in the ear or nose',
    gujarati: 'કાન કે નાકમાં વસ્તુ ફસાવવી',
    category: 'Children',
    summary: 'An object may be lodged in the ear or nose. Batteries, magnets and sharp objects need urgent care.',
    aliases: ['foreign body', 'bead in nose', 'object in ear', 'object in nose', 'battery in ear', 'battery in nose'],
    href: '/pages/ent.html#urgent',
  },
];

export const featuredProblems = problemFinderItems.filter((item) => item.featured);
