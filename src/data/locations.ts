// Locations page — /pages/locations.html
// Owner input: owner-content/12-locations/
import type { ImageItem } from '../components/media/types';
import centrePointBuilding from '../assets/images/locations/centre-point-building-gota.png';
import operationTheatreTeam from '../assets/images/clinic/operation-theatre-team.jpeg';

export interface Location {
  name: string;
  addressLines: string[];
  image: ImageItem;
}

export const locationsPage = {
  title: 'Our Locations',
  locations: [
    {
      name: 'Ahmedabad',
      addressLines: [
        '406, 4th Floor, Centre Point,',
        'Opp. Vrundavan Heights, Nr. Savvy Swaraj,',
        'New S.G.Road, Vandematram - Gota, Ahmedabad.',
      ],
      image: {
        kind: 'image',
        src: centrePointBuilding,
        alt: 'Centre Point building in Gota, Ahmedabad, with the Rivaansh ENT signboard',
      },
    },
    {
      name: 'Unjha',
      // PLACEHOLDER: sample address and a stand-in photo — owner to confirm whether an Unjha branch exists.
      addressLines: ['101, 1st Floor, Shree Complex,', 'Near Bus Stand, Unjha, Gujarat.', '(Sample Unjha Address)'],
      image: { kind: 'image', src: operationTheatreTeam, alt: 'Rivaansh Unjha' },
    },
  ] satisfies Location[],
};
