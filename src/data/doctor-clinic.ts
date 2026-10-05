// Doctor & Clinic - /pages/about-us.html (also feeds the doctor facts on Home and the doctor card on condition pages)
// Owner input: owner-content/02-doctor-profile/, owner-content/00-clinic-facts/, photos in owner-content/01-photos/
// Missing facts stay null: hidden on the live site, shown as "Info needed" chips in preview builds.
import { site } from '../config/site';

export interface Qualification {
  degree: string;
  institute: string | null;
  year: string | null;
}

export const doctor = {
  name: site.doctor.name,
  role: 'ENT, Head & Neck Surgeon',
  /** Photo: slot `doctor-portrait` (src/data/photo-slots.ts). */
  portraitSlot: 'doctor-portrait',
  // PLACEHOLDER: wording from the clinic flyer; institute and year to be confirmed (02-doctor-profile).
  qualifications: [
    { degree: 'MS (ENT)', institute: null, year: null },
    { degree: 'Fellowship in Otology', institute: null, year: null },
  ] as Qualification[],
  // PLACEHOLDER: doctor to confirm the bio wording.
  bio: [
    'Dr. Tanay S Parikh is an ENT surgeon with a Master of Surgery (MS) in ENT and a fellowship in otology - the diagnosis and surgical treatment of ear, hearing and balance problems.',
    'At Rivaansh ENT, Dr. Parikh sees adults and children for ear, nose, throat, thyroid, head and neck problems, from routine ear and sinus complaints to conditions that need surgery.',
  ],
  languages: null as string | null,
  interests: null as string | null,
};

export const doctorClinicPage = {
  title: 'Doctor & Clinic',
  intro: 'Who will examine you, and what the clinic looks like before you arrive.',
  clinicHeading: 'The clinic',
  clinicIntro: 'In the order you will see it, from the 4th-floor door to the consultation room.',
  /** Clinic tour, in the order a patient meets things (photo slots). */
  tourSlots: ['clinic-door-4th-floor', 'reception-waiting-area', 'consultation-room-ent-unit', 'endoscope-unit', 'hearing-test-room', 'sterilisation-area'],
  equipmentHeading: 'Equipment',
  // PLACEHOLDER: equipment in plain words, e.g. "A camera (endoscope) to look inside the nose and throat during the visit".
  equipment: null as string[] | null,
  hygieneHeading: 'Hygiene',
  // PLACEHOLDER: sterilisation method, single-use items.
  hygiene: null as string[] | null,
  surgeryHeading: 'Where surgery is done',
  // PLACEHOLDER: owner decision 7 - where operations take place and who gives the anaesthesia. Section is live only once set.
  surgery: null as null | { where: string; anaesthesia: string },
  surgerySlots: ['operating-microscope', 'operation-theatre'],
};
