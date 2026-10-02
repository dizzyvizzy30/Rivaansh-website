// Header menu and footer link groups — the only place navigation is defined.
// URLs are frozen (see .claude/skills/rivaansh-component-architecture/SKILL.md → URL rules).

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export const isNavGroup = (item: NavItem): item is NavGroup => 'children' in item;

export const routes = {
  home: '/',
  aboutUs: '/pages/about-us.html',
  aboutClinic: '/pages/about.html',
  ent: '/pages/ent.html',
  specialities: '/pages/specialities.html',
  surgeries: '/pages/surgeries.html',
  care: '/pages/care.html',
  appointment: '/pages/appointment.html',
  onlineConsultation: '/pages/online-consultation.html',
  blog: '/pages/blog.html',
  gallery: '/pages/gallery.html',
  locations: '/pages/locations.html',
  contact: '/pages/contact.html',
  faq: '/pages/faq.html',
} as const;

export const blogPostHref = (id: string) => `/pages/blog/${id}.html`;

export const mainNav: NavItem[] = [
  { label: 'Home', href: routes.home },
  { label: 'About Us', href: routes.aboutUs },
  {
    label: 'Services',
    children: [
      { label: 'ENT', href: routes.ent },
      { label: 'Specialities', href: routes.specialities },
      { label: 'Surgeries', href: routes.surgeries },
      { label: 'Care', href: routes.care },
    ],
  },
  {
    label: 'Appointment',
    children: [
      { label: 'Book an Appointment', href: routes.appointment },
      { label: 'Online Consultation', href: routes.onlineConsultation },
    ],
  },
  { label: 'Blog', href: routes.blog },
  { label: 'Gallery', href: routes.gallery },
  { label: 'Locations', href: routes.locations },
  { label: 'Contact', href: routes.contact },
  { label: 'FAQ', href: routes.faq },
];

export const footerNav: NavGroup[] = [
  {
    label: 'Quick Links',
    children: [
      { label: 'Home', href: routes.home },
      { label: 'About Us', href: routes.aboutUs },
      { label: 'Book Appointment', href: routes.appointment },
      { label: 'Blog', href: routes.blog },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'ENT Care', href: routes.ent },
      { label: 'Specialities', href: routes.specialities },
      { label: 'Surgeries', href: routes.surgeries },
      { label: 'Patient Care', href: routes.care },
    ],
  },
];
