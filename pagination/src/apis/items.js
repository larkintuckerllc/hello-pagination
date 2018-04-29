const ITEMS = [
  {
    id: 0,
    name: 'A',
  },
  {
    id: 1,
    name: 'B',
  },
  {
    id: 2,
    name: 'C',
  },
  {
    id: 3,
    name: 'D',
  },
  {
    id: 4,
    name: 'E',
  },
  {
    id: 5,
    name: 'F',
  },
  {
    id: 6,
    name: 'G',
  },
  {
    id: 7,
    name: 'H',
  },
  {
    id: 8,
    name: 'I',
  },
  {
    id: 9,
    name: 'J',
  },
  {
    id: 10,
    name: 'K',
  },
  {
    id: 11,
    name: 'L',
  },
  {
    id: 12,
    name: 'M',
  },
  {
    id: 13,
    name: 'N',
  },
  {
    id: 14,
    name: 'O',
  },
  {
    id: 15,
    name: 'P',
  },
  {
    id: 16,
    name: 'Q',
  },
  {
    id: 17,
    name: 'R',
  },
  {
    id: 18,
    name: 'S',
  },
  {
    id: 19,
    name: 'T',
  },
  {
    id: 20,
    name: 'U',
  },
  {
    id: 21,
    name: 'V',
  },
  {
    id: 22,
    name: 'W',
  },
  {
    id: 23,
    name: 'X',
  },
  {
    id: 24,
    name: 'Y',
  },
  {
    id: 25,
    name: 'Z',
  },
];
/* eslint-disable-next-line */
export const fetchItems = () => {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(ITEMS), 1000);
  });
};
