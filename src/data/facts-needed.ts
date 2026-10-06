// Facts the owner still has to provide - listed on the preview-only /pages/photos-needed.html checklist.
// Each entry reads a field that stays null (hidden on the live site) until the owner answers.
import { site } from '../config/site';
import { doctor, doctorClinicPage } from './doctor-clinic';
import { visitPage } from './visit';
import { bookPage } from './book';
import { treatmentsPage } from './treatments';

export const factsNeeded = (): { what: string; folder: string }[] =>
  [
    { what: 'Medical council registration number', folder: '03-doctor-and-centre', missing: !site.doctor.registration },
    { what: 'Medical council name', folder: '03-doctor-and-centre', missing: !site.doctor.council },
    { what: 'Institute and year for each qualification', folder: '03-doctor-and-centre', missing: doctor.qualifications.some((q) => !q.institute) },
    { what: 'Languages spoken', folder: '03-doctor-and-centre', missing: !doctor.languages },
    { what: 'Areas of special interest', folder: '03-doctor-and-centre', missing: !doctor.interests },
    { what: 'Equipment at the centre', folder: '03-doctor-and-centre', missing: !doctorClinicPage.equipment },
    { what: 'Hygiene and sterilisation facts', folder: '03-doctor-and-centre', missing: !doctorClinicPage.hygiene },
    { what: 'Where operations are done and who gives anaesthesia', folder: '03-doctor-and-centre', missing: !doctorClinicPage.surgery },
    { what: 'Tests done at the centre', folder: '02-treatments', missing: !treatmentsPage.testsAtClinic },
    { what: 'Consultation fee', folder: '04-visit-us', missing: !visitPage.fees },
    { what: 'Payment methods', folder: '04-visit-us', missing: !visitPage.payment },
    { what: 'Mediclaim / insurance', folder: '04-visit-us', missing: !visitPage.mediclaim },
    { what: 'Lift', folder: '04-visit-us', missing: !visitPage.lift },
    { what: 'Wheelchair access', folder: '04-visit-us', missing: !visitPage.wheelchair },
    { what: 'Parking', folder: '04-visit-us', missing: !visitPage.parking },
    { what: 'Holidays when the centre is closed', folder: '04-visit-us', missing: !visitPage.holidays },
    { what: 'Appointment request response time and confirmation method', folder: '07-book-appointment', missing: !bookPage.confirmationProcess },
    { what: 'WhatsApp number and who answers it', folder: '00-shared-site-details', missing: !site.contact.whatsapp },
  ]
    .filter((f) => f.missing)
    .map(({ what, folder }) => ({ what, folder }));
