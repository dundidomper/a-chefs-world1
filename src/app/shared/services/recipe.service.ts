import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  QueryConstraint, addDoc
} from '@angular/fire/firestore';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private firestore = inject(Firestore);

  getRecipes(): Observable<Recipe[]> {
    const recipeRef = collection(this.firestore, 'recipes');
    return collectionData(recipeRef, { idField: 'id' }) as Observable<Recipe[]>;
  }

  addRecipe(recipe: Partial<Recipe>) {
    const recipeRef = collection(this.firestore, 'recipes');
    return addDoc(recipeRef, recipe);
  }

  async getFilteredRecipes(
    filters: {
      type?: string;
      difficulty?: string;
      sortOrder?: 'asc' | 'desc';
      limitCount?: number;
    }
  ): Promise<Recipe[]> {
    const recipeRef = collection(this.firestore, 'recipes');
    const constraints: QueryConstraint[] = [];

    if (filters.type) {
      constraints.push(where('type', '==', filters.type));
    }

    if (filters.difficulty) {
      constraints.push(where('difficulty', '==', filters.difficulty));
    }

    if (filters.sortOrder) {
      constraints.push(orderBy('duration', filters.sortOrder));
    }

    if (filters.limitCount) {
      constraints.push(limit(filters.limitCount));
    }

    const recipeQuery = query(recipeRef, ...constraints);
    const snapshot = await getDocs(recipeQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Recipe[];
  }

  async getRandomRecipeByType(type: string): Promise<Recipe | undefined> {
    const recipeRef = collection(this.firestore, 'recipes');
    const q = query(recipeRef, where('type', '==', type));
    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Recipe[];

    if (recipes.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  }

}
