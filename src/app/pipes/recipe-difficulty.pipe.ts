import { Pipe, PipeTransform } from '@angular/core';
import { RECIPE_DIFFICULTY_MAP, RecipeDifficulty } from '../models/recipe-difficulty.model';

@Pipe({ name: 'recipeDifficulty' })
export class RecipeDifficultyPipe implements PipeTransform {
  transform(value: string): string {
    return RECIPE_DIFFICULTY_MAP[value as RecipeDifficulty] || value;
  }
}
