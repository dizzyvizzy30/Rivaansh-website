// Clinic-wide facts shown on every page (header, action bar, footer, Visit Us, structured data).
// Owner input: owner-content/00-clinic-facts/
// Every value marked PLACEHOLDER is taken from the clinic flyer or the old site and still needs owner confirmation.

export interface Session {
  /** 24-hour "HH:MM" in India Standard Time. */
  open: string;
  close: string;
}

export interface OpeningHours {
  label: string;
  /** JavaScript day numbers: 0 = Sunday … 6 = Saturday. */
  days: number[];
  sessions: Session[];
}

const mapsQuery = 'Rivaansh ENT, Centre Point, Gota, Ahmedabad';

export const site = {
  // PLACEHOLDER: official name — the signboard and flyer read "Rivaansh ENT, Head & Neck Centre".
  name: 'Rivaansh ENT, Head & Neck Centre',
  shortName: 'Rivaansh ENT',
  subName: 'Head & Neck Centre',
  /** "Ear · nose · throat" in Gujarati (plain nouns; the flyer's "હોસ્પિટલ" wording is pending owner confirmation). */
  localTagline: 'કાન · નાક · ગળું',
  description:
    'ENT, head and neck centre in Gota, Ahmedabad — Dr. Tanay S Parikh, MS (ENT), Fellowship in Otology. Ear, nose, throat, thyroid and children’s ENT care.',

  doctor: {
    name: 'Dr. Tanay S Parikh',
    shortName: 'Dr. Parikh',
    // PLACEHOLDER: confirm exact qualifications (flyer: "MS ENT, Fellowship in Otology").
    credentials: 'MS (ENT), Fellowship in Otology',
    // PLACEHOLDER: medical council registration number and council — shown once provided (owner-content/02-doctor-profile).
    registration: null as string | null,
    council: null as string | null,
  },

  contact: {
    // PLACEHOLDER: the flyer's main number. The old site footer showed +91 96383 83060 — owner to choose ONE public number.
    phone: { display: '+91 90332 50621', tel: '+919033250621', label: 'Clinic mobile' },
    // PLACEHOLDER: flyer "For appointment" landline.
    landline: { display: '+91 79 4845 0005', tel: '+917948450005', label: 'Appointments (landline)' },
    // PLACEHOLDER: set once someone at the clinic answers WhatsApp during clinic hours, e.g. { number: '919033250621' }.
    whatsapp: null as { number: string } | null,
    email: 'info@rivaanshent.com',
    address: {
      line1: '406, 4th Floor, Centre Point',
      line2: 'Opp. Vrundavan Heights, Nr. Savvy Swaraj, New S.G. Road',
      line3: 'Vandematram – Gota, Ahmedabad, Gujarat 382470',
      short: '4th floor, Centre Point, Gota',
      street: '406, 4th Floor, Centre Point, Opp. Vrundavan Heights, Nr. Savvy Swaraj, New S.G. Road, Vandematram',
      locality: 'Gota, Ahmedabad',
      region: 'Gujarat',
      postalCode: '382470',
      country: 'IN',
    },
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  },

  // PLACEHOLDER: from the flyer — owner to confirm, plus public holidays.
  hours: [
    { label: 'Monday – Saturday', days: [1, 2, 3, 4, 5, 6], sessions: [{ open: '10:00', close: '13:00' }, { open: '17:30', close: '20:30' }] },
    { label: 'Sunday', days: [0], sessions: [{ open: '10:00', close: '13:00' }] },
  ] satisfies OpeningHours[],

  // PLACEHOLDER: social profile links not provided yet.
  social: [] as { label: string; href: string }[],
} as const;

/** "17:30" → "5:30 PM". */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export const formatSessions = (sessions: readonly Session[]) =>
  sessions.map((s) => `${formatTime(s.open)}–${formatTime(s.close)}`).join(', ');

export const whatsappHref = (text = 'Hello, I would like to book an appointment at Rivaansh ENT.') =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(text)}` : null;
