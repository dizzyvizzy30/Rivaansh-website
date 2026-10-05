// Site navigation - the only place menus are defined.
// Structure decided in docs/site-restructure-plan.md: four plain destinations, no dropdowns.

export const routes = {
  home: '/',
  treatments: '/pages/ent.html',
  problemFinder: '/pages/problem-finder.html',
  doctorClinic: '/pages/about-us.html',
  visit: '/pages/contact.html',
  book: '/pages/appointment.html',
  care: '/pages/care.html',
  tips: '/pages/blog.html',
} as const;

export const conditionHref = (id: string) => `/pages/ent/${id}.html`;
export const tipHref = (id: string) => `/pages/blog/${id}.html`;

export interface NavLink {
  label: string;
  href: string;
  /** One-line hint shown under the label in the mobile menu. */
  description?: string;
  /** Hidden until at least one health tip is published. */
  requiresTips?: boolean;
}

export const mainNav: NavLink[] = [
  { label: 'Treatments', href: routes.treatments, description: 'Ear, nose, throat, thyroid, children' },
  { label: 'Doctor & Centre', href: routes.doctorClinic, description: 'Dr. Tanay S Parikh, centre photos' },
  { label: 'Visit Us', href: routes.visit, description: 'Timings, directions, fees, FAQ' },
  { label: 'Health Tips', href: routes.tips, description: 'Ear, nose & throat care advice', requiresTips: true },
];

export const secondaryNav: NavLink[] = [
  { label: 'Book appointment', href: routes.book },
  { label: 'Before & after surgery', href: routes.care },
];

/** Which top-level section a path belongs to (for marking the current link). */
export function sectionOf(pathname: string): string | undefined {
  const path = pathname.replace(/\.html$/, '');
  if (path === routes.problemFinder.replace(/\.html$/, '')) return routes.treatments;
  if (path.startsWith('/pages/ent')) return routes.treatments;
  if (path.startsWith('/pages/blog')) return routes.tips;
  return [routes.doctorClinic, routes.visit, routes.book, routes.care].find((r) => r.replace(/\.html$/, '') === path);
}
