export interface Recipe {
  id?: string; // Firestore dokumentum azonosítója
  name: string;
  type: string;
  difficulty: string;
  duration: number;
  shortDescription: string;
  longDescription: string;
}
