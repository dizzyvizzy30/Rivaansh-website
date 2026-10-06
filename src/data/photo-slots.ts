// Named photo slots. Owner uploads are grouped by website page under owner-content/.
// The final photo file name still matches the slot id.
//
// To fill a slot: save the chosen photo as src/assets/images/slots/<id>.jpg (or .jpeg/.png/.webp).
// It is detected automatically at build time - no code change needed.
// Rendering rules: src/components/media/PhotoSlot.astro.
import type { ImageMetadata } from 'astro';
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';
import centrePointBuilding from '../assets/images/locations/centre-point-building-gota.png';
import microscopeEarSurgery from '../assets/images/clinic/microscope-ear-surgery.jpeg';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';

export type SlotLevel = 'required' | 'conditional' | 'optional';

export interface PhotoSlotDef {
  id: string;
  title: string;
  /** One-line brief for the photographer. */
  brief: string;
  usedOn: { label: string; href: string }[];
  /** CSS aspect ratio, e.g. '3 / 2'. */
  ratio: string;
  orientation: 'landscape' | 'portrait';
  minSize: string;
  level: SlotLevel;
  /** Alt text once the real photo is in place. */
  alt: string;
  focus?: string;
  /** Existing photo used during review. Only explicitly verified location images may appear on the live site. */
  standIn?: { src: ImageMetadata; alt: string; focus?: string; allowOnLive?: boolean };
}

const ownerPageBySlot: Record<string, string> = {
  'doctor-consultation-room': '01-home',
  'endoscope-unit': '02-treatments',
  'hearing-test-room': '02-treatments',
  'reception-waiting-area': '03-doctor-and-centre',
  'consultation-room-ent-unit': '03-doctor-and-centre',
  'doctor-portrait': '03-doctor-and-centre',
  'sterilisation-area': '03-doctor-and-centre',
  'operating-microscope': '03-doctor-and-centre',
  'operation-theatre': '03-doctor-and-centre',
  'building-street-view': '04-visit-us',
  'entrance-lift-lobby': '04-visit-us',
  'clinic-door-4th-floor': '04-visit-us',
};

export function ownerPhotoFolder(id: string): string {
  const page = ownerPageBySlot[id];
  if (!page) throw new Error(`No owner page folder is registered for photo slot "${id}"`);
  return `owner-content/${page}/photos/${id}/`;
}

const supplied = import.meta.glob<ImageMetadata>('../assets/images/slots/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});
const suppliedById = new Map(
  Object.entries(supplied).map(([path, image]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), image]),
);
const isPreview = import.meta.env.DEV || (import.meta.env.SHOW_DRAFTS ?? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.SHOW_DRAFTS) === 'true';

// Listed in shooting (walking) order: street → lobby → 4th-floor door → reception → consultation room →
// equipment → doctor, then the surgery photos that depend on owner decision 7.
export const photoSlots: PhotoSlotDef[] = [
  {
    id: 'building-street-view',
    title: 'Building from the street',
    brief: 'Centre Point from across New S.G. Road at eye level, in daylight - the entrance and the Rivaansh signboard readable.',
    usedOn: [
      { label: 'Home › Plan your visit', href: '/#coming' },
      { label: 'Visit Us › Getting here, step 1', href: '/pages/contact.html#getting-here' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1800×1200',
    level: 'required',
    alt: 'Centre Point building on New S.G. Road, Gota, with the Rivaansh ENT signboard',
    // PLACEHOLDER: low-angle photo where the signboard is small - replace with a street-level view.
    standIn: { src: centrePointBuilding, alt: 'Centre Point building in Gota, Ahmedabad, with the Rivaansh ENT signboard', focus: 'center 40%', allowOnLive: true },
  },
  {
    id: 'entrance-lift-lobby',
    title: 'Entrance and lift lobby',
    brief: 'The ground-floor entrance, the lift and the building directory board showing Rivaansh.',
    usedOn: [{ label: 'Visit Us › Getting here, step 2', href: '/pages/contact.html#getting-here' }],
    ratio: '4 / 5',
    orientation: 'portrait',
    minSize: '1200×1500',
    level: 'optional',
    alt: 'Ground-floor entrance and lift lobby of Centre Point',
  },
  {
    id: 'clinic-door-4th-floor',
    title: 'Centre door on the 4th floor',
    brief: 'What you see stepping out of the lift: the centre door and signboard.',
    usedOn: [
      { label: 'Visit Us › Getting here, step 3', href: '/pages/contact.html#getting-here' },
      { label: 'Doctor & Centre › Centre tour', href: '/pages/about-us.html#centre' },
    ],
    ratio: '4 / 5',
    orientation: 'portrait',
    minSize: '1200×1500',
    level: 'required',
    alt: 'Entrance door of Rivaansh ENT on the 4th floor of Centre Point',
  },
  {
    id: 'reception-waiting-area',
    title: 'Reception and waiting area',
    brief: 'Front desk and seating, shot wide from the door, lights on, no patients.',
    usedOn: [
      { label: 'Home › Your doctor and the centre', href: '/#doctor-centre' },
      { label: 'Doctor & Centre › Centre tour', href: '/pages/about-us.html#centre' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1800×1200',
    level: 'required',
    alt: 'Reception desk and waiting area at Rivaansh ENT',
  },
  {
    id: 'consultation-room-ent-unit',
    title: 'Consultation room',
    brief: 'The ENT examination chair and workstation, empty and tidy.',
    usedOn: [
      { label: 'Home › Your doctor and the centre', href: '/#doctor-centre' },
      { label: 'Doctor & Centre › Centre tour', href: '/pages/about-us.html#centre' },
      { label: 'Condition pages › See the doctor', href: '/pages/ent.html' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1800×1200',
    level: 'required',
    alt: 'ENT examination chair and workstation in the consultation room',
  },
  {
    id: 'endoscope-unit',
    title: 'Endoscope',
    brief: 'The endoscope and its monitor in the consultation room. No patient data on the screen. Only if endoscopy is available at the centre.',
    usedOn: [
      { label: 'Home › Your doctor and the centre', href: '/#doctor-centre' },
      { label: 'Doctor & Centre › Centre tour', href: '/pages/about-us.html#centre' },
      { label: 'Treatments › Tests available at the centre', href: '/pages/ent.html#tests' },
      { label: 'Sinus, allergy & blocked nose page', href: '/pages/ent/sinus-allergy-blocked-nose.html' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1600×1067',
    level: 'conditional',
    alt: 'Nasal endoscope and monitor in the consultation room',
  },
  {
    id: 'hearing-test-room',
    title: 'Hearing test',
    brief: 'The audiometer or hearing-test booth. Only if hearing tests are available at the centre.',
    usedOn: [
      { label: 'Doctor & Centre › Centre tour', href: '/pages/about-us.html#centre' },
      { label: 'Treatments › Tests available at the centre', href: '/pages/ent.html#tests' },
      { label: 'Hearing loss & hearing aids page', href: '/pages/ent/hearing-loss-hearing-aids.html' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1600×1067',
    level: 'conditional',
    alt: 'Hearing-test equipment at Rivaansh ENT',
  },
  {
    id: 'sterilisation-area',
    title: 'Sterilisation',
    brief: 'The autoclave and sealed instrument packs.',
    usedOn: [
      { label: 'Doctor & Centre › Hygiene', href: '/pages/about-us.html#centre' },
      { label: 'Home › Your doctor and the centre', href: '/#doctor-centre' },
    ],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1600×1067',
    level: 'optional',
    alt: 'Autoclave and sealed, sterilised instrument packs',
  },
  {
    id: 'doctor-consultation-room',
    title: 'Doctor in the consultation room',
    brief: 'The doctor standing beside the ENT chair, room and screen visible, lights on, no patient. Hold the phone sideways.',
    usedOn: [{ label: 'Home › Top banner', href: '/' }],
    ratio: '16 / 9',
    orientation: 'landscape',
    minSize: '2400×1350',
    level: 'required',
    alt: '',
    // PLACEHOLDER: stand-in until the photo session - owner to confirm the person is Dr. Tanay S Parikh.
    standIn: { src: doctorOfficePortrait, alt: '', focus: 'center 38%' },
  },
  {
    id: 'doctor-portrait',
    title: 'Doctor portrait',
    brief: 'Head and shoulders at eye level, plain light wall, daylight.',
    usedOn: [
      { label: 'Doctor & Centre › The doctor', href: '/pages/about-us.html#doctor' },
      { label: 'Condition pages › doctor card', href: '/pages/ent.html' },
    ],
    ratio: '4 / 5',
    orientation: 'portrait',
    minSize: '1200×1500',
    level: 'required',
    alt: 'Dr. Tanay S Parikh',
    // PLACEHOLDER: owner to confirm this centre photo shows Dr. Tanay S Parikh.
    standIn: { src: doctorOfficePortrait, alt: 'Dr. Tanay S Parikh in the consultation room', focus: 'center 25%' },
  },
  {
    id: 'operating-microscope',
    title: 'Operating microscope',
    brief: 'The microscope used for ear surgery, in the theatre where operations are done. Depends on owner decision 7.',
    usedOn: [{ label: 'Doctor & Centre › Where surgery is done', href: '/pages/about-us.html#surgery' }],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1600×1067',
    level: 'conditional',
    alt: 'Operating microscope used for ear surgery',
    standIn: { src: microscopeEarSurgery, alt: 'Surgeon operating through an ENT operating microscope' },
  },
  {
    id: 'operation-theatre',
    title: 'Operation theatre',
    brief: 'The theatre with staff only (with their consent), no surgical field visible. Depends on owner decisions 7 and 12.',
    usedOn: [{ label: 'Doctor & Centre › Where surgery is done', href: '/pages/about-us.html#surgery' }],
    ratio: '3 / 2',
    orientation: 'landscape',
    minSize: '1600×1067',
    level: 'conditional',
    alt: 'Operation theatre with the surgical team',
    standIn: { src: operationTheatreTeam, alt: 'Surgical team in an operation theatre under surgical lights' },
  },
];

const byId = new Map(photoSlots.map((slot) => [slot.id, slot]));

export function getSlot(id: string): PhotoSlotDef {
  const slot = byId.get(id);
  if (!slot) throw new Error(`Unknown photo slot "${id}" - add it to src/data/photo-slots.ts`);
  return slot;
}

export type SlotStatus = 'real' | 'stand-in' | 'missing';

export const slotStatus = (id: string): SlotStatus =>
  suppliedById.has(id) ? 'real' : getSlot(id).standIn ? 'stand-in' : 'missing';

export type SlotImage = { src: ImageMetadata; alt: string; focus?: string; isStandIn: boolean };

/** The image to show for a slot (supplied photo, else stand-in), or null when the slot is still empty. */
export function slotImage(id: string): SlotImage | null {
  const slot = getSlot(id);
  const real = suppliedById.get(id);
  if (real) return { src: real, alt: slot.alt, focus: slot.focus, isStandIn: false };
  if (slot.standIn && (isPreview || slot.standIn.allowOnLive)) return { ...slot.standIn, isStandIn: true };
  return null;
}

/** Slot ids from `ids` that have a supplied (not stand-in) photo. */
export const realSlots = (ids: string[]) => ids.filter((id) => slotStatus(id) === 'real');

export const slotRatio = (slot: PhotoSlotDef) => slot.ratio;

// Production builds log what is still missing (never fails the build).
const warned = globalThis as { __photoSlotWarning?: boolean };
if (!isPreview && !warned.__photoSlotWarning) {
  warned.__photoSlotWarning = true;
  const missingRequired = photoSlots.filter((s) => s.level === 'required' && slotStatus(s.id) !== 'real').map((s) => `${s.id} (${slotStatus(s.id)})`);
  if (missingRequired.length) console.warn(`[photo slots] Required photos not supplied yet: ${missingRequired.join(', ')}`);
}
