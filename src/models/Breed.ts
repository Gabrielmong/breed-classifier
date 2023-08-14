export type RatingType = {
  value: number;
  name: string;
};

export interface Breed {
  name?: string;
  description?: string;
  image_link?: string;
  max_height_male?: number;
  max_weight_male?: number;
  max_life_expectancy?: number;
  ratings?: RatingType[];
}
