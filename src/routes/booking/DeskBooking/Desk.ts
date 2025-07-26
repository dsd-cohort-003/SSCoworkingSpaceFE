export interface Desk {
  deskId: string;
  name: string;
  dimensions: string;
  count: string;
  image: string;
}

export const desksMock: Desk[] = [
  {
    deskId: '01',
    name: 'Office Desk (Small)',
    dimensions: '5 X 5 ft',
    count: '3',
    image: 'image',
  },
  {
    deskId: '02',
    name: 'Office Desk (Large)',
    dimensions: '6 x 6 ft',
    count: '2',
    image: 'image',
  },
  {
    deskId: '03',
    name: 'Writing Desk',
    dimensions: '7 x 7 ft',
    count: '6',
    image: 'image',
  },
];
