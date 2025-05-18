import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {RecipeTypePipe} from "../../shared/pipes/recipe-type.pipe";
import {RecipeDifficultyPipe} from "../../shared/pipes/recipe-difficulty.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, MatCardModule,
    MatButtonModule, RecipeTypePipe,
    RecipeTypePipe, RecipeTypePipe,
    RecipeTypePipe, RecipeDifficultyPipe,
    MatFormFieldModule, MatOptionModule, FormsModule, MatSelectModule, MatInput, MatButtonToggleGroup, MatButtonToggle, RouterLink,],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  selectedType: string = '';
  selectedDifficulty: string = '';
  limitCount: number = 10;
  sortOrder: 'asc' | 'desc' = 'asc';

  expandedRecipeIds: Set<string> = new Set();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  async applyFilters() {
    this.recipeService.getFilteredRecipes({
      type: this.selectedType,
      difficulty: this.selectedDifficulty,
      sortOrder: this.sortOrder,
      limitCount: this.limitCount
    }).then(filteredRecipes => {
      this.recipes = filteredRecipes;
    });

  }

  toggleExpand(id: string) {
    this.expandedRecipeIds.has(id)
      ? this.expandedRecipeIds.delete(id)
      : this.expandedRecipeIds.add(id);
  }

  isExpanded(id: string): boolean {
    return this.expandedRecipeIds.has(id);
  }
}
