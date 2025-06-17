// src/components/promotion-builder/store-selection/mockStores.ts

export interface Store {
  id: string;
  storeNumber: string;
  storeName: string;
  city: string;
  state: string;
}

const surnames = [
  'Anderson', 'Johnson', 'Williams', 'Brown', 'Jones',
  'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
  'Perez', 'Thompson', 'White', 'Harris', 'Sanchez',
  'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott',
  'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera',
  'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const cities = [
  { city: 'Austin', state: 'TX' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Houston', state: 'TX' },
  { city: 'Denver', state: 'CO' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Miami', state: 'FL' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Portland', state: 'OR' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Tampa', state: 'FL' },
  { city: 'Orlando', state: 'FL' },
  { city: 'Minneapolis', state: 'MN' },
  { city: 'Cleveland', state: 'OH' },
  { city: 'Pittsburgh', state: 'PA' },
  { city: 'Cincinnati', state: 'OH' },
  { city: 'Kansas City', state: 'MO' },
  { city: 'Louisville', state: 'KY' },
  { city: 'Memphis', state: 'TN' },
  { city: 'Richmond', state: 'VA' },
  { city: 'Norfolk', state: 'VA' },
  { city: 'Tucson', state: 'AZ' },
  { city: 'Albuquerque', state: 'NM' },
  { city: 'Fresno', state: 'CA' },
  { city: 'Sacramento', state: 'CA' },
  { city: 'Mesa', state: 'AZ' },
  { city: 'Virginia Beach', state: 'VA' },
  { city: 'Long Beach', state: 'CA' },
  { city: 'Oakland', state: 'CA' },
  { city: 'Omaha', state: 'NE' },
  { city: 'Tulsa', state: 'OK' },
  { city: 'Wichita', state: 'KS' },
  { city: 'Colorado Springs', state: 'CO' },
  { city: 'Arlington', state: 'TX' },
  { city: 'Raleigh', state: 'NC' },
  { city: 'St. Louis', state: 'MO' },
  { city: 'Santa Ana', state: 'CA' },
  { city: 'Anaheim', state: 'CA' },
  { city: 'Riverside', state: 'CA' },
  { city: 'Corpus Christi', state: 'TX' },
  { city: 'Lexington', state: 'KY' },
  { city: 'Stockton', state: 'CA' },
  { city: 'Henderson', state: 'NV' },
  { city: 'Saint Paul', state: 'MN' },
  { city: 'Buffalo', state: 'NY' },
  { city: 'Fort Wayne', state: 'IN' },
  { city: 'Plano', state: 'TX' }
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateMockStores(count: number): Store[] {
  const stores: Store[] = [];
  
  for (let i = 0; i < count; i++) {
    const numberPart = Math.floor(10000 + Math.random() * 90000);
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const loc = cities[Math.floor(Math.random() * cities.length)];
    
    stores.push({
      id: `store-${numberPart}-${letter}`,
      storeNumber: `${numberPart}-${letter}`,
      storeName: `${surname} Ace Hardware`,
      city: loc.city,
      state: loc.state,
    });
  }
  
  return stores;
}

// A central, ready-to-use list of mock stores:
export const storeList: Store[] = generateMockStores(200);