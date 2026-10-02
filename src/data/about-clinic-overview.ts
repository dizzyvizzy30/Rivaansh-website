// Clinic overview page — /pages/about.html (linked from the homepage "Read more" button)
// Owner input: owner-content/03-about-clinic-overview/
// PLACEHOLDER: this older page overlaps with About Us and names a different doctor ("Dr. Rivaansh Kumar").
//              Owner to confirm the doctor details, or merge this page into About Us.
import placeholderDoctorPortrait from '../assets/images/team/placeholder-doctor-portrait.jpg';

export const aboutClinicOverview = {
  title: 'About Rivaansh ENT Clinic',
  intro:
    'Welcome to Rivaansh ENT Clinic, dedicated to providing expert care for ear, nose, and throat conditions. Our clinic offers comprehensive diagnosis, treatment, and preventive care for patients of all ages.',
  servicesHeading: 'Our ENT Services',
  services: [
    'Vertigo',
    'Perforated Eardrum',
    'Hearing Aid',
    'Snoring',
    'Ear Lobe Repair',
    'Head & Neck Cancer',
    'Tonsil',
    'Thyroid',
    'Post Covid Mucormycosis',
    'Nasal Endoscopic Follow Up',
    'Allergy',
    'Voice Change',
    'Ear Pain',
    'Foreign Body',
    'Routine ENT Problems',
  ],
  doctorsHeading: 'Our Doctors',
  doctors: [
    {
      name: 'Dr. Rivaansh Kumar',
      lines: ['MBBS, MS (ENT)', 'Senior ENT Specialist', '15+ years experience'],
      image: placeholderDoctorPortrait,
    },
  ],
};
