// Homepage — /
// Owner input: owner-content/01-home/
import type { ImageItem } from '../components/media/types';
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';
import endoscopyProcedure from '../assets/images/clinic/endoscopy-procedure.jpeg';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';
import placeholderSpecialist1 from '../assets/images/team/placeholder-specialist-1.svg';
import placeholderSpecialist2 from '../assets/images/team/placeholder-specialist-2.svg';
import placeholderSpecialist3 from '../assets/images/team/placeholder-specialist-3.svg';
import { clinicStats } from './stats';

export const heroSlides: ImageItem[] = [
  { kind: 'image', src: doctorOfficePortrait, alt: 'ENT specialist seated at a desk in the clinic consultation room', focus: 'center 30%' },
  { kind: 'image', src: endoscopyProcedure, alt: 'Doctors performing an endoscopic ENT procedure with the camera view on a monitor', focus: 'center 30%' },
  { kind: 'image', src: operationTheatreTeam, alt: 'Surgical team in the operation theatre under surgical lights', focus: 'center 30%' },
];

export const hero = {
  titleLines: ['Empowering Better Lives', 'Through Expert ENT Care'],
  subtitle: 'Comprehensive ear, nose, and throat services with compassion, expertise, and cutting-edge technology.',
  primaryCta: { label: 'READ MORE', href: '/pages/about.html' },
  secondaryCta: { label: 'CONTACT US', href: '/pages/contact.html' },
};

export const stats = clinicStats.map((stat) =>
  stat.label === 'Patients Treated' ? { ...stat, note: '(300+ kids)' } : stat,
);

export const serviceColumns = [
  {
    icon: 'ear',
    title: 'Ear',
    items: [
      'Micro Ear Surgery',
      'Cochlear Implant',
      'Vertigo Clinic',
      'Ear infection & hearing assessment',
      'Tinnitus Clinic',
      'Hearing Aid Clinic',
    ],
  },
  {
    icon: 'nose',
    title: 'Nose',
    items: [
      'Endoscopic Sinus Surgery',
      'Septoplasty & Turbinate Surgery',
      'Allergy Clinic',
      'Sinus and allergy treatment',
      'Nasal Polyps Treatment',
      'Smell and Taste Disorders',
    ],
  },
  {
    icon: 'throat',
    title: 'Throat',
    items: [
      'Voice Surgery',
      'Speech Therapy',
      'Sleep Apnea Clinic',
      'Throat disorders',
      'Voice & swallowing therapy',
      'Tonsils and Adenoids',
    ],
  },
] as const;

// PLACEHOLDER: sample testimonials with stand-in names. Replace only with real, consented patient feedback
// (or remove the section — patient testimonials are restricted for doctors in India).
export const testimonials = {
  title: 'What Our Patients Say',
  items: [
    {
      quote:
        "I had been suffering from chronic sinusitis for years, and Dr. Tanay Parikh's treatment has been a game-changer. I can finally breathe freely again!",
      author: 'John Doe',
    },
    {
      quote:
        'The staff at Rivaansh ENT Clinic are incredibly professional and caring. They made my daughter feel comfortable during her tonsillectomy.',
      author: 'Jane Smith',
    },
    {
      quote:
        "I was nervous about my hearing test, but the audiologist was so patient and explained everything clearly. I'm very happy with my new hearing aids.",
      author: 'Robert Brown',
    },
    {
      quote:
        'Finding a good ENT for my son was a challenge. Dr. Parikh was amazing with him and made the whole experience so much better.',
      author: 'Sarah L.',
    },
    {
      quote:
        "I had a complex sinus surgery, and the care I received at Rivaansh ENT Clinic was exceptional. I'm so grateful to the entire team.",
      author: 'Michael P.',
    },
  ],
};

// PLACEHOLDER: cartoon avatars; Dr. Emily Carter and Dr. Ben Hanson look like template names — owner to confirm the real team.
export const specialists = {
  title: 'Meet Our Specialists',
  members: [
    { name: 'Dr. Tanay Parikh', lines: ['ENT Specialist'], image: placeholderSpecialist1 },
    { name: 'Dr. Emily Carter', lines: ['Audiologist'], image: placeholderSpecialist2 },
    { name: 'Dr. Ben Hanson', lines: ['Speech Therapist'], image: placeholderSpecialist3 },
  ],
};
