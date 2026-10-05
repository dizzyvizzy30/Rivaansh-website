// Visit Us - /pages/contact.html (owns the full timings table, getting here, fees, first visit and FAQ)
// Owner input: owner-content/00-clinic-facts/, owner-content/06-faq/, photos in owner-content/01-photos/
// Missing facts stay null: hidden on the live site, shown as "Info needed" chips in preview builds.

export const visitPage = {
  title: 'Visit Us',
  intro: 'Timings, how to find us, fees, what happens at your first visit, and answers to common questions.',
  landmark: 'Opposite Vrundavan Heights, near Savvy Swaraj, on New S.G. Road (Vandematram – Gota).',
  gettingHere: [
    { slot: 'building-street-view', title: 'Find Centre Point', text: 'Centre Point is on New S.G. Road, opposite Vrundavan Heights and near Savvy Swaraj.' },
    { slot: 'entrance-lift-lobby', title: 'Go up to the 4th floor', text: 'Enter Centre Point and go up to the 4th floor.' },
    { slot: 'clinic-door-4th-floor', title: 'Office 406', text: 'Rivaansh ENT is office 406 on the 4th floor.' },
  ],
  lift: null as string | null,
  wheelchair: null as string | null,
  parking: null as string | null,
  holidays: null as string | null,
  fees: null as string | null,
  payment: null as string | null,
  mediclaim: null as string | null,
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
  bring: ['Previous reports, scans and prescriptions', 'A list of the medicines you take', 'Hearing aids, if you use them'],
};

// PLACEHOLDER: add the receptionist's most common phone questions (owner-content/06-faq).
// Questions already answered elsewhere on Visit Us (opening hours, what to bring) are deliberately left out.
export const quickAnswers = [
  { question: 'Do I need a referral?', answer: 'No. You can book directly by calling the clinic.' },
  { question: 'Do you see children?', answer: 'Yes - children are seen for ear, nose and throat problems such as ear infections, tonsils and snoring.' },
  {
    question: 'What if it’s urgent outside clinic hours?',
    answer: 'If there is difficulty breathing, heavy bleeding that will not stop, or a serious injury, go to the nearest hospital emergency department.',
  },
];
