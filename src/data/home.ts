// Homepage — /
// Owner input: owner-content/00-clinic-facts/ and owner-content/01-photos/
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';
import { site } from '../config/site';

export const hero = {
  kicker: site.shortName,
  title: 'Ear, Nose, Throat, Head & Neck Centre in Gota, Ahmedabad',
  doctorLine: `${site.doctor.name} — ${site.doctor.credentials}`,
  // PLACEHOLDER: one real wide photo from owner-content/01-photos (reception or consultation room) works best here.
  image: { src: doctorOfficePortrait, alt: '', focus: 'center 38%' },
};

export const homeSections = {
  treatTitle: 'What we treat',
  doctorTitle: 'Meet the doctor',
  clinicTitle: 'The clinic',
  locationTitle: 'Location & timings',
  answersTitle: 'Quick answers',
  tipsTitle: 'Health tips',
};
