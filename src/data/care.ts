// Before & After Surgery - /pages/care.html
// Owner input: owner-content/05-before-and-after-surgery/ (per-procedure sections are added in Phase 2)
// PLACEHOLDER: doctor to confirm all advice on this page.

export interface GuidePart {
  /** Filled from the clinic's own handout; null until then. */
  text: string | null;
  /** What the owner needs to provide (shown as an "Info needed" chip in preview builds). */
  need: string;
}

export interface ProcedureGuide {
  id: string;
  title: string;
  before: GuidePart;
  whereToReport: GuidePart;
  after: GuidePart;
  /** Unreviewed guides are shown only in preview builds. */
  draft: boolean;
}

const part = (need: string): GuidePart => ({ text: null, need });

// PLACEHOLDER: per-procedure guides from owner-content/05-before-and-after-surgery/handouts/ - preview only until reviewed.
export const procedureGuides: ProcedureGuide[] = [
  {
    id: 'tonsillectomy-adenoidectomy',
    title: 'Tonsillectomy & adenoidectomy',
    before: part('fasting time before the operation'),
    whereToReport: part('hospital name, entrance and reporting time'),
    after: part('diet, pain relief, return to school or work, follow-up visit'),
    draft: true,
  },
  {
    id: 'septoplasty',
    title: 'Septoplasty',
    before: part('fasting time before the operation'),
    whereToReport: part('hospital name, entrance and reporting time'),
    after: part('nasal packs or splints and when they are removed, nose blowing, follow-up visit'),
    draft: true,
  },
  {
    id: 'endoscopic-sinus-surgery',
    title: 'Endoscopic sinus surgery',
    before: part('fasting time before the operation'),
    whereToReport: part('hospital name, entrance and reporting time'),
    after: part('saline rinses, nasal sprays, follow-up cleaning visits'),
    draft: true,
  },
  {
    id: 'tympanoplasty',
    title: 'Tympanoplasty (eardrum repair)',
    before: part('fasting time before the operation'),
    whereToReport: part('hospital name, entrance and reporting time'),
    after: part('keeping the ear dry, ear packing and stitches, flying, follow-up visit'),
    draft: true,
  },
];

export const carePage = {
  title: 'Before & After Surgery',
  intro:
    'If you are having a procedure, you will be given instructions for your specific operation. This page covers the general points - always follow the instructions you were given.',
  before: {
    heading: 'Before your procedure',
    items: [
      'Tell the doctor about every medicine you take, especially blood thinners, and about any allergies.',
      'Follow the eating and drinking instructions you are given for the day of the procedure.',
      'Bring your reports, prescriptions and a family member or friend to take you home.',
    ],
  },
  after: {
    heading: 'After your procedure',
    items: [
      'Take the medicines exactly as prescribed.',
      'Keep your follow-up appointment.',
      'If you have lost your instructions, call the clinic for another copy.',
    ],
  },
  warning: {
    heading: 'Call the clinic straight away if you have',
    items: [
      'Bleeding that does not stop',
      'Fever, or increasing pain, redness or swelling',
      'Difficulty breathing or swallowing',
      'Severe pain that the prescribed medicines do not control',
      'Difficulty drinking enough fluids',
    ],
    outOfHours: 'Outside clinic hours, or if breathing is affected, go to the nearest hospital emergency department.',
  },
  guidesHeading: 'Guides for each operation',
};
