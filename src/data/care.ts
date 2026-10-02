// Before & After Surgery — /pages/care.html
// Owner input: owner-content/04-surgery-guides/ (per-procedure sections are added in Phase 2)
// PLACEHOLDER: doctor to confirm all advice on this page.

export const carePage = {
  title: 'Before & After Surgery',
  intro:
    'If you are having a procedure, you will be given instructions for your specific operation. This page covers the general points — always follow the instructions you were given.',
  before: {
    heading: 'Before your procedure',
    items: [
      'Tell the doctor about every medicine you take, especially blood thinners, and about any allergies.',
      'Follow the eating and drinking instructions you are given for the day of the procedure.',
      'Bring your reports, prescriptions and a family member or friend to take you home.',
    ],
  },
  after: {
    heading: 'After your procedure',
    items: [
      'Take the medicines exactly as prescribed.',
      'Keep your follow-up appointment.',
      'If you have lost your instructions, call the clinic for another copy.',
    ],
  },
  warning: {
    heading: 'Call the clinic straight away if you have',
    items: [
      'Bleeding that does not stop',
      'Fever, or increasing pain, redness or swelling',
      'Difficulty breathing or swallowing',
      'Severe pain that the prescribed medicines do not control',
      'Difficulty drinking enough fluids',
    ],
    outOfHours: 'Outside clinic hours, or if breathing is affected, go to the nearest hospital emergency department.',
  },
};
