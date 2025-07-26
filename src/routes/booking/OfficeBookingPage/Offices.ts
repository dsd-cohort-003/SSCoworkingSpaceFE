export interface Office {
  officeId: string;
  name: string;
  price: string;
  size: string;
}

export const officesMock: Office[] = [
  {
    officeId: '01',
    name: 'Suite 100',
    price: '$1000',
    size: '2000 sq ft',
  },
  {
    officeId: '02',
    name: 'Suite 175',
    price: '$2000',
    size: '6000 sq ft',
  },
  {
    officeId: '03',
    name: 'Suite 200',
    price: '$3000',
    size: '1500 sq ft',
  },
];
