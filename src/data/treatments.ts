// Treatments hub - /pages/ent.html
// Owner input: owner-content/03-conditions-review/
// Each item links to its condition page once that page is published (src/content/conditions/<slug>.md);
// until then it is listed as plain text, never as a dead link.
import type { IconName } from '../components/ui/Icon.astro';

export interface TreatmentItem {
  name: string;
  /** Condition page slug, if this item has (or will have) its own page. */
  slug?: string;
}

export interface TreatmentGroup {
  id: string;
  title: string;
  gujarati?: string;
  /** Plain-language scan cue shown before the full list is opened. */
  cue?: string;
  icon: IconName;
  items: TreatmentItem[];
}

export const treatmentsPage = {
  title: 'Treatments',
  intro:
    'Ear, nose, throat, head and neck problems in adults and children. Choose a condition to read what it is, when to see a doctor, and how it is treated here.',
  notListed: 'Don’t see your problem? Call us - routine ENT problems are seen too.',
  testsHeading: 'Tests done at the clinic',
  // PLACEHOLDER: doctor to confirm (03-conditions-review), e.g. [{ name: 'Nasal endoscopy', slot: 'endoscope-unit' }].
  testsAtClinic: null as null | { name: string; slot?: string }[],
};

// PLACEHOLDER: list taken from the clinic flyer - doctor to confirm every item.
export const treatmentGroups: TreatmentGroup[] = [
  {
    id: 'ear',
    title: 'Ear & balance',
    gujarati: 'કાન · સાંભળવું · ચક્કર',
    cue: 'Pain · discharge · hearing less · dizziness',
    icon: 'ear',
    items: [
      { name: 'Vertigo & dizziness', slug: 'vertigo-dizziness' },
      { name: 'Hearing loss & hearing aids', slug: 'hearing-loss-hearing-aids' },
      { name: 'Perforated eardrum', slug: 'perforated-eardrum' },
      { name: 'Ear pain & ear infections', slug: 'ear-pain-ear-infections' },
      { name: 'Ear lobe repair' },
      { name: 'Something stuck in the ear' },
    ],
  },
  {
    id: 'nose',
    title: 'Nose, sinus & allergy',
    gujarati: 'નાક · સાઇનસ · એલર્જી',
    cue: 'Blocked nose · sneezing · snoring',
    icon: 'nose',
    items: [
      { name: 'Sinus, allergy & blocked nose', slug: 'sinus-allergy-blocked-nose' },
      { name: 'Snoring', slug: 'snoring' },
      { name: 'Nasal endoscopic follow-up (including after mucormycosis)' },
      { name: 'Something stuck in the nose' },
    ],
  },
  {
    id: 'throat',
    title: 'Throat & voice',
    gujarati: 'ગળું · અવાજ',
    cue: 'Tonsils · swallowing · voice change',
    icon: 'throat',
    items: [
      { name: 'Tonsils & adenoids', slug: 'tonsils-adenoids' },
      { name: 'Voice change & hoarseness' },
    ],
  },
  {
    id: 'head-neck',
    title: 'Head, neck & thyroid',
    gujarati: 'ગળામાં ગાંઠ · થાઇરોઇડ',
    cue: 'Neck lump · thyroid concern',
    icon: 'throat',
    items: [
      { name: 'Thyroid & neck swellings', slug: 'thyroid-neck-swellings' },
      { name: 'Head & neck cancer - evaluation' },
    ],
  },
  {
    id: 'children',
    title: 'Children',
    gujarati: 'બાળકો',
    cue: 'Ear pain · snoring · mouth breathing',
    icon: 'ear',
    items: [
      { name: 'Ear pain & ear infections', slug: 'ear-pain-ear-infections' },
      { name: 'Tonsils & adenoids', slug: 'tonsils-adenoids' },
      { name: 'Snoring in children', slug: 'snoring' },
      { name: 'Something stuck in the ear or nose' },
    ],
  },
];

// PLACEHOLDER: procedures the old site listed (plus ear lobe repair from the flyer) - doctor to confirm.
export const procedures: { name: string; slug?: string; anchor?: string; careId?: string }[] = [
  { name: 'Tympanoplasty / myringoplasty (eardrum repair)', slug: 'perforated-eardrum', anchor: 'eardrum-repair-surgery', careId: 'tympanoplasty' },
  { name: 'Endoscopic sinus surgery', slug: 'sinus-allergy-blocked-nose', anchor: 'endoscopic-sinus-surgery', careId: 'endoscopic-sinus-surgery' },
  { name: 'Septoplasty (straightening the nasal septum)', slug: 'sinus-allergy-blocked-nose', anchor: 'septoplasty', careId: 'septoplasty' },
  { name: 'Tonsillectomy & adenoidectomy', slug: 'tonsils-adenoids', anchor: 'tonsil-and-adenoid-surgery', careId: 'tonsillectomy-adenoidectomy' },
  { name: 'Microlaryngeal surgery (voice box)' },
  { name: 'Ear lobe repair' },
];

export const urgentProblems = {
  title: 'Urgent problems',
  tileTitle: 'Need urgent help?',
  tileSummary: 'Breathing difficulty · bleeding that won’t stop · sudden hearing loss',
  emergencyHeading: 'Go to an emergency department now',
  emergencyAdvice: 'Do not wait for the clinic to call back when breathing is affected or bleeding will not stop.',
  emergencyItems: [
    'Difficulty breathing, noisy breathing, or being unable to swallow saliva',
    'A nosebleed that does not stop after 15 minutes of firmly pinching the soft part of the nose',
  ],
  sameDayHeading: 'Get urgent same-day medical advice',
  sameDayAdvice: 'Call the clinic immediately if it is open. If you cannot be seen promptly, go to the nearest hospital emergency department.',
  sameDayItems: [
    'Sudden loss of hearing in one ear',
    'A button battery, magnet or sharp object in the ear or nose',
    'Swelling behind the ear or around the eye, with fever',
  ],
};
