// Clinic-wide facts shown on every page (header, footer, metadata).
// Owner input: owner-content/00-clinic-wide-details/

export const site = {
  // PLACEHOLDER: the signboard/flyer reads "Rivaansh ENT, Head & Neck Centre" — owner to confirm the official name.
  name: 'Rivaansh ENT Clinic',
  tagline: 'Empowering Better Lives Through Expert ENT Care',
  footerBlurb:
    'Empowering Better Lives Through Expert ENT Care. Providing comprehensive ear, nose, and throat services with compassion and expertise.',
  description:
    'Rivaansh ENT Clinic in Gota, Ahmedabad — diagnosis and treatment of ear, nose and throat conditions, ENT surgery, and hearing, allergy, voice and vertigo care.',
  contact: {
    address: '406, Centre Point, opp. Vrundavan Heights, Gota, Ahmedabad, Gujarat 382470, India',
    // PLACEHOLDER: differs from the contact page and the clinic flyer (91 90332 50621 / +91 079 4845 0005) — owner to confirm.
    phone: { display: '+91 96383 83060', tel: '+919638383060' },
    email: 'info@rivaanshent.com',
  },
  // PLACEHOLDER: social profile URLs not provided yet.
  social: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
  ],
  copyrightYear: 2024,
} as const;

export type Site = typeof site;
