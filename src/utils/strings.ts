import { classesMap } from 'data';

export const formatName = (name: string) => {
  const words = name.split('_');
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return formattedWords.join(' ');
};

export const checkForAnimal = (breed: string) => {
  const breedLower = breed.toLowerCase();
  const classes = Object.keys(classesMap);
  for (let i = 0; i < classes.length; i++) {
    const classKey = classes[i];
    const classValues = classesMap[classKey as keyof typeof classesMap];
    for (let j = 0; j < classValues.length; j++) {
      const classValue = classValues[j];
      if (breedLower.includes(classValue)) {
        return classKey;
      }
    }
  }

  return null;
};

export const formatBreed = (breed: string) => {
  const split = breed.split(',');
  if (split.length > 1) {
    return split[1].trim();
  }

  if (breed.toLowerCase().includes('cat')) {
    return breed.replace('cat', '').trim();
  }

  return breed;
};
