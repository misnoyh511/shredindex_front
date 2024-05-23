export const lifeStyles = [
  {
    'Ms Fancy': {
      id: 1,
      title: 'Ms Fancy',
      description: 'Michillin dining,  designer outfits and lamborghinis. Cost is no issue.',
      image: 'lambo',
    },
  },
  {
    'Digital Nomad': {
      id: 2,
      title: 'Digital Nomad',
      description: 'Good Wifi, cool cafes, co-working spaces and community vibe.',
      image: 'lambo',
    },
  },
  {
    'Drug Lord': {
      id: 3,
      title: 'Drug Lord',
      description: 'More drugs, more drinks, more parties, more threesomes.',
      image: 'lambo',
    },
  },
  {
    'Heli-Hansen': {
      id: 3,
      title: 'Heli-Hansen',
      description: 'Helicopter access only.',
      image: 'lambo',
    },
  },
];

const getLifestyle = (lifestyleName) => lifeStyles[lifestyleName] || null;

export default getLifestyle;
