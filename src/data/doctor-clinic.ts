// Doctor & Clinic — /pages/about-us.html (also feeds the doctor card on Home and condition pages)
// Owner input: owner-content/02-doctor-profile/ and owner-content/01-photos/
import type { MediaItem } from '../components/media/types';
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';
import centrePointBuilding from '../assets/images/locations/centre-point-building-gota.png';
import endoscopyProcedure from '../assets/images/clinic/endoscopy-procedure.jpeg';
import microscopeEarSurgery from '../assets/images/clinic/microscope-ear-surgery.jpeg';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';
import { site } from '../config/site';

export const doctor = {
  name: site.doctor.name,
  role: 'ENT, Head & Neck Surgeon',
  // PLACEHOLDER: confirm this clinic photo shows Dr. Tanay S Parikh, or replace with a professional portrait.
  portrait: {
    src: doctorOfficePortrait,
    alt: 'Dr. Tanay S Parikh in the consultation room',
    focus: 'center 25%',
  },
  // PLACEHOLDER: add institution and year for each qualification (owner-content/02-doctor-profile).
  qualifications: ['MBBS, MS (ENT)', 'Fellowship in Otology'],
  // PLACEHOLDER: doctor to confirm the bio wording.
  bio: [
    'Dr. Tanay S Parikh is an ENT surgeon with a Master of Surgery (MS) in ENT and a fellowship in otology — the diagnosis and surgical treatment of ear, hearing and balance problems.',
    'At Rivaansh ENT, Dr. Parikh sees adults and children for ear, nose, throat, thyroid, head and neck problems, from routine ear and sinus complaints to conditions that need surgery.',
  ],
  // PLACEHOLDER: languages spoken (e.g. Gujarati, Hindi, English).
  languages: null as string | null,
};

export const doctorClinicPage = {
  title: 'Doctor & Clinic',
  intro: 'Who will examine you, and what the clinic looks like before you arrive.',
  clinicHeading: 'The clinic',
  clinicIntro: 'The clinic is on the 4th floor of Centre Point, Gota. Select a photo to view it full screen.',
  // PLACEHOLDER: equipment and hygiene facts (sterilisation method, single-use items) from owner-content/00-clinic-facts.
  // PLACEHOLDER: where operations take place and who gives the anaesthesia — the #surgery section appears once provided.
  surgery: null as null | { heading: string; text: string },
};

// PLACEHOLDER: replace/extend with the owner's photo session (owner-content/01-photos). Signboard and exterior first.
export const clinicPhotos: MediaItem[] = [
  {
    kind: 'image',
    src: centrePointBuilding,
    alt: 'Centre Point building in Gota, Ahmedabad, with the Rivaansh ENT signboard',
    caption: 'Centre Point, Gota — look for the Rivaansh signboard.',
  },
  {
    kind: 'image',
    src: doctorOfficePortrait,
    alt: 'Dr. Tanay S Parikh seated at a desk in the consultation room',
    caption: 'The consultation room.',
    focus: 'center 25%',
  },
  {
    kind: 'image',
    src: endoscopyProcedure,
    alt: 'Doctors performing an endoscopic examination with the camera view shown on a monitor',
    caption: 'An endoscopic examination — the camera view is shown on the screen.',
  },
  {
    kind: 'image',
    src: microscopeEarSurgery,
    alt: 'Surgeon operating through an ENT operating microscope',
    caption: 'Ear surgery under an operating microscope.',
  },
  {
    kind: 'image',
    src: operationTheatreTeam,
    alt: 'Surgical team in an operation theatre under surgical lights',
    caption: 'The surgical team in the operation theatre.',
  },
];
