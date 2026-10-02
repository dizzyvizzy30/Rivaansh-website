// About Us page — /pages/about-us.html
// Owner input: owner-content/02-about-us/
import type { ImageItem } from '../components/media/types';
import placeholderDoctorPortrait from '../assets/images/team/placeholder-doctor-portrait.jpg';
import endoscopyProcedure from '../assets/images/clinic/endoscopy-procedure.jpeg';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';
import { clinicStats } from './stats';

export const doctor = {
  label: 'Meet Your Specialist',
  name: 'Dr. Tanay Parikh',
  title: 'Lead ENT Specialist & Founder',
  bio: 'Dr. Tanay Parikh is a highly skilled ENT specialist dedicated to providing exceptional care for disorders of the ear, nose, and throat. With a passion for patient wellness and a commitment to staying at the forefront of medical advancements, Dr. Parikh combines expertise with compassion.',
  // PLACEHOLDER: owner to confirm credentials (flyer reads "MS ENT, Fellowship in Otology").
  credentials: ['MBBS, MS (ENT)', 'Fellowship in Otology', 'Member, AOI', 'Advanced Surgical Training'],
  // PLACEHOLDER: stock photo, not the doctor — replace with a real portrait (owner-content/02-about-us/doctor-portrait/).
  portrait: { kind: 'image', src: placeholderDoctorPortrait, alt: 'Dr. Tanay Parikh' } satisfies ImageItem,
  badge: { value: '15+', label: 'Years Experience' },
  cta: { label: 'Book Consultation', href: '/pages/appointment.html' },
};

export const facility = {
  label: 'Our Facility',
  heading: 'State-of-the-Art Care Environment',
  text: 'Rivaansh ENT Clinic is equipped with the latest diagnostic and surgical technology, ensuring accurate diagnoses and effective treatments. Our facility is designed with patient comfort in mind — from our welcoming reception area to our modern consultation rooms.',
  images: [
    { kind: 'image', src: endoscopyProcedure, alt: 'Doctors performing an endoscopic ENT procedure with the camera view on a monitor' },
    { kind: 'image', src: operationTheatreTeam, alt: 'Surgical team in the operation theatre under surgical lights' },
    { kind: 'image', src: doctorOfficePortrait, alt: 'ENT specialist seated at a desk in the clinic consultation room', focus: 'center 30%' },
  ] satisfies ImageItem[],
  features: [
    { icon: 'clock', title: 'Advanced Diagnostics', text: 'Cutting-edge audiometry, endoscopy & imaging' },
    { icon: 'home', title: 'Comfortable Environment', text: 'Calming interiors designed for patient wellness' },
    { icon: 'shield', title: 'Strict Hygiene Standards', text: 'Hospital-grade sterilization protocols' },
  ],
} as const;

export const visionMission = [
  {
    icon: 'eye',
    title: 'Our Vision',
    text: 'To be the most trusted ENT care provider in the region — recognized for clinical excellence, innovation, and compassionate patient care. We envision a future where every individual has access to world-class ear, nose, and throat treatment, improving their quality of life.',
  },
  {
    icon: 'info',
    title: 'Our Mission',
    text: 'To deliver exceptional ENT care through advanced medical expertise, cutting-edge technology, and a patient-first approach. We are committed to treating every patient with dignity, ensuring personalized care in a warm, welcoming environment that promotes healing and well-being.',
  },
] as const;

export const stats = clinicStats;
