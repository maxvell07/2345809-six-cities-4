
import { City } from '../src/types/city';

export const cities: City[] = [
  {
    name: 'Paris',
    lat: 48.8534,
    lng: 2.3479
  },
  {
    name: 'Amsterdam',
    lat: 52.37022,
    lng: 4.89521
  },
  {
    name: 'Cologne',
    lat: 50.93333,
    lng: 6.95
  },
  {
    name: 'Brussels',
    lat: 50.85036,
    lng: 4.35173
  },
  {
    name: 'Hamburg',
    lat: 53.5753,
    lng: 10.015
  },
  {
    name: 'Dusseldorf',
    lat: 51.2217,
    lng: 6.77617
  }
];

const Settings = {
  placesCount: 90,
} as const;
export default Settings;
