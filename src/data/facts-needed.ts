// Facts the owner still has to provide — listed on the preview-only /pages/photos-needed.html checklist.
// Each entry reads a field that stays null (hidden on the live site) until the owner answers.
import { site } from '../config/site';
import { doctor, doctorClinicPage } from './doctor-clinic';
import { visitPage } from './visit';
import { bookPage } from './book';
import { treatmentsPage } from './treatments';
import { metrics, googleReviews, liveTestimonials } from './proof';

export const factsNeeded = (): { what: string; folder: string }[] =>
  [
    { what: 'Medical council registration number', folder: '02-doctor-profile', missing: !site.doctor.registration },
    { what: 'Medical council name', folder: '02-doctor-profile', missing: !site.doctor.council },
    { what: 'Institute and year for each qualification', folder: '02-doctor-profile', missing: doctor.qualifications.some((q) => !q.institute) },
    { what: 'Languages spoken', folder: '02-doctor-profile', missing: !doctor.languages },
    { what: 'Areas of special interest', folder: '02-doctor-profile', missing: !doctor.interests },
    { what: 'Equipment at the clinic', folder: '00-clinic-facts', missing: !doctorClinicPage.equipment },
    { what: 'Hygiene and sterilisation facts', folder: '00-clinic-facts', missing: !doctorClinicPage.hygiene },
    { what: 'Where operations are done and who gives anaesthesia', folder: '00-clinic-facts', missing: !doctorClinicPage.surgery },
    { what: 'Tests done at the clinic', folder: '03-conditions-review', missing: !treatmentsPage.testsAtClinic },
    { what: 'Consultation fee', folder: '00-clinic-facts', missing: !visitPage.fees },
    { what: 'Payment methods', folder: '00-clinic-facts', missing: !visitPage.payment },
    { what: 'Mediclaim / insurance', folder: '00-clinic-facts', missing: !visitPage.mediclaim },
    { what: 'Lift', folder: '00-clinic-facts', missing: !visitPage.lift },
    { what: 'Wheelchair access', folder: '00-clinic-facts', missing: !visitPage.wheelchair },
    { what: 'Parking', folder: '00-clinic-facts', missing: !visitPage.parking },
    { what: 'Holidays when the clinic is closed', folder: '00-clinic-facts', missing: !visitPage.holidays },
    { what: 'What happens after you call', folder: '06-faq', missing: !bookPage.afterYouCall },
    { what: 'WhatsApp number and who answers it', folder: '00-clinic-facts', missing: !site.contact.whatsapp },
    ...metrics.map((m) => ({
      what: `Confirm "${m.value} ${m.label.toLowerCase()}" and how it was counted`,
      folder: '07-numbers-and-reviews',
      missing: !(m.confirmed && m.source),
    })),
    { what: 'Google reviews link, rating and count', folder: '07-numbers-and-reviews', missing: !googleReviews },
    { what: 'Patient quotes with written consent', folder: '07-numbers-and-reviews', missing: liveTestimonials().length === 0 },
  ]
    .filter((f) => f.missing)
    .map(({ what, folder }) => ({ what, folder }));
