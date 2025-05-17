export interface Review {
  id: string;
  recipeId: string;
  authorId: string;
  rating: number; // 1–5
  text: string;
  createdAt: Date;
}
