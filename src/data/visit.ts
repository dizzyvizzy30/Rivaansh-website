// Visit Us — /pages/contact.html (first visit, what to bring and quick answers are also used on Home and Book)
// Owner input: owner-content/00-clinic-facts/ and owner-content/06-faq/
import centrePointBuilding from '../assets/images/locations/centre-point-building-gota.png';
import { site, formatSessions } from '../config/site';

export const visitPage = {
  title: 'Visit Us',
  intro: 'Timings, how to find us, what happens at your first visit, and answers to common questions.',
  building: {
    src: centrePointBuilding,
    alt: 'Centre Point building in Gota, Ahmedabad, with the Rivaansh ENT signboard',
    focus: 'center 40%',
  },
  // PLACEHOLDER: lift, parking and nearby landmarks from owner-content/00-clinic-facts.
  gettingThere: ['Opposite Vrundavan Heights, near Savvy Swaraj, on New S.G. Road (Vandematram – Gota).', 'The clinic is on the 4th floor of Centre Point.'],
  // PLACEHOLDER: consultation fee and payment methods — shown once confirmed.
  fees: null as string | null,
};

export const firstVisit = {
  title: 'Your first visit',
  // PLACEHOLDER: doctor to confirm the steps (walk-ins? same-day hearing test?).
  steps: [
    { title: 'Book', text: 'Call the clinic to choose a time.' },
    { title: 'Arrive', text: 'Come 10 minutes early. The clinic is on the 4th floor of Centre Point, Gota.' },
    { title: 'Examination', text: 'The doctor asks about your symptoms and examines your ear, nose or throat. Some problems need a camera (endoscopy) or hearing test.' },
    { title: 'Your plan', text: 'You are told what the problem is, the treatment options, and what happens next.' },
  ],
  bring: [
    'Previous reports, scans and prescriptions',
    'A list of the medicines you take',
    'Hearing aids, if you use them',
  ],
};

// PLACEHOLDER: replace with the receptionist's 10 most common phone questions (owner-content/06-faq).
export const quickAnswers = [
  { question: 'When is the clinic open?', answer: site.hours.map((h) => `${h.label}: ${formatSessions(h.sessions)}`).join('. ') + '.' },
  { question: 'Do I need a referral?', answer: 'No. You can book directly by calling the clinic.' },
  { question: 'Do you see children?', answer: 'Yes — children are seen for ear, nose and throat problems such as ear infections, tonsils and snoring.' },
  { question: 'What should I bring?', answer: 'Any previous reports, scans and prescriptions, and a list of the medicines you take.' },
  {
    question: 'What if it’s urgent outside clinic hours?',
    answer: 'If there is difficulty breathing, heavy bleeding that will not stop, or a serious injury, go to the nearest hospital emergency department.',
  },
];
