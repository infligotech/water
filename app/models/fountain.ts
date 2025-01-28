export interface Fountain {
  id: string;
  latitude: number;
  longitude: number;
  overallRating: number;
  temperature: number;
  taste: number;
  hasBottleRefiller: boolean;
  pressure: number;
  createdAt: Date;
  updatedAt: Date;
}