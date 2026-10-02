// Headline numbers shown on the homepage and About Us.
// Owner input: owner-content/01-home/text.md → "Numbers"
// PLACEHOLDER: owner to confirm every figure (and that "98% patient satisfaction" can be substantiated).

export interface Stat {
  value: string;
  label: string;
  note?: string;
}

export const clinicStats: Stat[] = [
  { value: '15+', label: 'Years Experience' },
  { value: '10,000+', label: 'Patients Treated' },
  { value: '5,000+', label: 'Surgeries Performed' },
  { value: '98%', label: 'Patient Satisfaction' },
];
