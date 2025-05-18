import { Pipe, PipeTransform } from '@angular/core';
import { RECIPE_TYPE_MAP, RecipeType } from '../models/recipe-type.model';

@Pipe({ name: 'recipeType' })
export class RecipeTypePipe implements PipeTransform {
  transform(value: string): string {
    return RECIPE_TYPE_MAP[value as RecipeType] || value;
  }
}
