// Gallery page — /pages/gallery.html
// Owner input: owner-content/11-gallery/ (photos and short captions; videos go in public/media/video/)
import type { MediaItem } from '../components/media/types';
import endoscopyProcedure from '../assets/images/clinic/endoscopy-procedure.jpeg';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';
import microscopeEarSurgery from '../assets/images/clinic/microscope-ear-surgery.jpeg';
import doctorOfficePortrait from '../assets/images/clinic/doctor-office-portrait.jpeg';

export const galleryPage = {
  title: 'Gallery',
  items: [
    {
      kind: 'image',
      src: doctorOfficePortrait,
      alt: 'ENT specialist seated at a desk in the clinic consultation room',
      focus: 'center 30%',
    },
    {
      kind: 'image',
      src: endoscopyProcedure,
      alt: 'Doctors performing an endoscopic ENT procedure with the camera view on a monitor',
    },
    {
      kind: 'image',
      src: operationTheatreTeam,
      alt: 'Surgical team in the operation theatre under surgical lights',
    },
    {
      kind: 'image',
      src: microscopeEarSurgery,
      alt: 'Surgeon operating through an ENT operating microscope',
    },
  ] satisfies MediaItem[],
};
