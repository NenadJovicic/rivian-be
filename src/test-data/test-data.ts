import { ChargingSpot } from '../entities/charging-spot.entity';
import { Office } from '../entities/office.entity';
import { User } from '../entities/user.entity';

export const USERS: Partial<User>[] = [
  {
    id: '77573564-1286-4e61-b661-91533d31fa25',
    firstName: 'Vuk',
    lastName: 'Stankovic',
    email: 'vuk@gmail.com',
    password: '$2b$10$i34DWqEqO31l1gqN12FSH.n9LxFD3dzpNZznhHCx7P4tD7Oaftl/a',
    defaultOfficeId: '042895e6-1f70-46c3-91b0-f2458e40aba5',
  },
  {
    id: 'e429ac17-4ec5-47be-bd57-ef71973fad5f',
    firstName: 'Marko',
    lastName: 'Peric',
    email: 'marko@gmail.com',
    password: '$2b$10$BfKDcCUPx9pppNPmcKsGVOacVsKtSNtSydy8KOHutD9jWiySCIgnK',
    defaultOfficeId: '042895e6-1f70-46c3-91b0-f2458e40aba5',
  },
  {
    id: 'f20e59f6-594e-424c-a728-ba120b82613a',
    firstName: 'Nenad',
    lastName: 'Jovicic',
    email: 'nenad@gmail.com',
    password: '$2b$10$xN5eqdhuXCrxuqU16jnPKOIAsVoi9e3mW0xHM/qWs4TrhqliqgY0W',
    defaultOfficeId: '042895e6-1f70-46c3-91b0-f2458e40aba5',
  },
];

export const CHARGING_SPOTS: Partial<ChargingSpot>[] = [
  {
    id: '2db165b1-2baf-4ee9-bf4e-849cae15ac59',
    spotName: 'B1',
    officeId: '042895e6-1f70-46c3-91b0-f2458e40aba5',
  },
  {
    id: '2db165b1-2baf-4ee9-bf4e-849cae15ac19',
    spotName: 'A1',
    officeId: '042895e6-1f70-46c3-91b0-f2458e40aba5',
  },
  {
    id: '2db165b1-2baf-4ee9-bf4e-849cae11af44',
    spotName: 'Z1',
    officeId: 'af11bfd6-f9f6-4ac4-a0f5-074e999b1016',
  },
];

export const OFFICES: Partial<Office>[] = [
  {
    id: '042895e6-1f70-46c3-91b0-f2458e40aba5',
    address: 'Pere Velimirovica 23',
    zipCode: 11010,
    name: 'Belgrade office',
  },
  {
    id: 'af11bfd6-f9f6-4ac4-a0f5-074e999b1016',
    address: 'Mozzartstrasse 112',
    zipCode: 3213,
    name: 'Munich office',
  },
];
