// Numbers and patient reviews — shown on Home and Doctor & Clinic.
// Owner input: owner-content/07-numbers-and-reviews/
//
// Indian medical-ethics (NMC) safeguards, built in:
// - A number appears on the live site only when `confirmed` is true AND `source` says how it was counted.
// - A testimonial appears only with the patient's written consent (`consent.written`), in their own words.
// - No success rates or satisfaction percentages unless backed by a documented survey.
// Preview builds show every unconfirmed item with an "Info needed" marker so the owner can see where it goes.

export interface Metric {
  id: string;
  value: string;
  label: string;
  note?: string;
  /** How the number was counted, e.g. "clinic records, Jan 2026". Required before it can go live. */
  source: string | null;
  confirmed: boolean;
}

export interface Testimonial {
  quote: string;
  /** As the patient agreed to be named, e.g. "Priya S." or "Parent of a 7-year-old". */
  name: string;
  /** Optional context, e.g. "Tonsil surgery, 2025". */
  context?: string;
  /** Where the words came from. */
  source: 'google-review' | 'in-clinic' | 'whatsapp';
  consent: { written: boolean; date: string | null };
}

// PLACEHOLDER: numbers from the old website — owner to confirm each one and give its source.
export const metrics: Metric[] = [
  { id: 'years', value: '15+', label: 'Years of ENT practice', source: null, confirmed: false },
  { id: 'patients', value: '10,000+', label: 'Patients treated', note: 'including 300+ children', source: null, confirmed: false },
  { id: 'surgeries', value: '5,000+', label: 'ENT surgeries performed', source: null, confirmed: false },
];

// PLACEHOLDER: the clinic's Google Business Profile reviews link, rating and count (copied from Google; update monthly).
export const googleReviews = null as null | { url: string; rating: string; count: number; asOf: string };

// PLACEHOLDER: real patient comments with written consent (owner-content/07-numbers-and-reviews/consent-form.md).
export const testimonials: Testimonial[] = [];

export const proofSections = {
  metricsTitle: 'In numbers',
  reviewsTitle: 'What patients say',
  reviewsDisclaimer: 'Patients’ own words, shared with their written permission. Every patient’s experience is different.',
};

export const liveMetrics = () => metrics.filter((m) => m.confirmed && m.source);
export const liveTestimonials = () => testimonials.filter((t) => t.consent.written);
