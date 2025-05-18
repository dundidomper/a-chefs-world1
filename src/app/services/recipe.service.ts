import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  QueryConstraint
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
}
