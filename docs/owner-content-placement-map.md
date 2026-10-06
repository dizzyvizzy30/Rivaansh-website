# Website placement map

This is the technical map used after the owner returns the folder.

## Page content

| Owner folder | Website page or area | Main implementation location |
|---|---|---|
| `00-shared-site-details` | Header, footer, structured data, shared contact information | `src/config/site.ts` |
| `01-home` | Home | `src/data/home.ts`, `src/pages/index.astro` |
| `02-treatments` | Treatments and individual condition pages | `src/data/treatments.ts`, `src/content/conditions/` |
| `03-doctor-and-centre` | Doctor & Centre and reusable doctor information | `src/data/doctor-clinic.ts`, `src/config/site.ts` |
| `04-visit-us` | Visit Us, directions, timings, and FAQ | `src/data/visit.ts` |
| `05-before-and-after-surgery` | Before & After Surgery | `src/data/care.ts` |
| `06-health-tips` | Health Tips and individual articles | `src/content/blog/` |
| `07-book-appointment` | Book Appointment | `src/data/book.ts`, `src/pages/pages/appointment.astro` |

## Photos

Each final photo folder name is also its website slot identifier. After review, place the selected image at:

`src/assets/images/slots/<photo-folder-name>.jpg`

| Owner upload folder | Main website use |
|---|---|
| `01-home/photos/doctor-consultation-room/` | Home hero |
| `02-treatments/photos/endoscope-unit/` | Treatments and sinus information |
| `02-treatments/photos/hearing-test-room/` | Treatments and hearing information |
| `03-doctor-and-centre/photos/doctor-portrait/` | Doctor profile and doctor cards |
| `03-doctor-and-centre/photos/reception-waiting-area/` | Centre tour and Home |
| `03-doctor-and-centre/photos/consultation-room-ent-unit/` | Centre tour, Home, and condition pages |
| `03-doctor-and-centre/photos/sterilisation-area/` | Centre hygiene section |
| `03-doctor-and-centre/photos/operating-microscope/` | Surgery facilities section |
| `03-doctor-and-centre/photos/operation-theatre/` | Surgery facilities section |
| `04-visit-us/photos/building-street-view/` | Visit Us and Home plan-your-visit section |
| `04-visit-us/photos/entrance-lift-lobby/` | Visit Us directions |
| `04-visit-us/photos/clinic-door-4th-floor/` | Visit Us directions and centre tour |

Do not publish every uploaded photo automatically. Inspect each file, reject anything containing private information, and preserve the original in the restricted Google Drive folder.

