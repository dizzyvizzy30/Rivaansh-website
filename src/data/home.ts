// Homepage - / (a short, problem-led front door; detail stays on the inner pages)
// Owner input: owner-content/01-home/ and owner-content/00-shared-site-details/

import type { IconName } from '../components/ui/Icon.astro';

export const hero = {
  title: 'ENT centre in Gota, Ahmedabad',
  subline: 'Ear pain or discharge? Hearing less? Feeling dizzy? Blocked nose? Is your child snoring or breathing through the mouth?',
  /** Photo slot for the top banner. */
  slot: 'doctor-consultation-room',
};

export interface HomeProblemGroup {
  id: string;
  title: string;
  icon: IconName;
  symptoms: { label: string; slug?: string }[];
}

/** Everyday phrases belong on Home; medical names stay on Treatments and condition pages. */
export const homeProblemGroups: HomeProblemGroup[] = [
  {
    id: 'ear',
    title: 'Ear, hearing & balance',
    icon: 'ear',
    symptoms: [
      { label: 'Ear pain or discharge', slug: 'ear-pain-ear-infections' },
      { label: 'Hearing less', slug: 'hearing-loss-hearing-aids' },
      { label: 'Feeling dizzy', slug: 'vertigo-dizziness' },
    ],
  },
  {
    id: 'nose',
    title: 'Nose & sleep',
    icon: 'nose',
    symptoms: [
      { label: 'Blocked or runny nose', slug: 'sinus-allergy-blocked-nose' },
      { label: 'Sneezing or allergy', slug: 'sinus-allergy-blocked-nose' },
      { label: 'Snoring', slug: 'snoring' },
    ],
  },
  {
    id: 'throat',
    title: 'Throat & voice',
    icon: 'throat',
    symptoms: [
      { label: 'Repeated sore throat', slug: 'tonsils-adenoids' },
      { label: 'Tonsils', slug: 'tonsils-adenoids' },
      { label: 'Hoarse voice or trouble swallowing' },
    ],
  },
  {
    id: 'head-neck',
    title: 'Neck & thyroid',
    icon: 'throat',
    symptoms: [
      { label: 'A lump or swelling in the neck', slug: 'thyroid-neck-swellings' },
      { label: 'Thyroid concerns', slug: 'thyroid-neck-swellings' },
    ],
  },
  {
    id: 'children',
    title: 'Children',
    icon: 'ear',
    symptoms: [
      { label: 'Ear pain', slug: 'ear-pain-ear-infections' },
      { label: 'Snoring or mouth breathing', slug: 'tonsils-adenoids' },
      { label: 'Something stuck in the ear or nose' },
    ],
  },
];

export const visitExpectations = [
  { title: 'Tell us what you have noticed', text: 'The visit starts with your symptoms, how long they have been there, and what is worrying you.' },
  { title: 'Be examined', text: 'The doctor examines the affected ear, nose or throat and explains whether any test may be useful.' },
  { title: 'Understand the next steps', text: 'The likely cause and available options are discussed before treatment starts.' },
];

export const homeSections = {
  treatTitle: 'What is troubling you?',
  visitTitle: 'What happens at your first visit?',
  doctorTitle: 'Who you will see',
  comingTitle: 'Plan your visit',
};
