import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import {RecipeService} from "../../shared/services/recipe.service";

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  name = '';
  shortDescription = '';
  longDescription = '';
  type = '';
  difficulty = '';
  duration = 0;

  constructor(private recipeService: RecipeService, private router: Router) {}

  async addRecipe() {
    if (!this.name || !this.shortDescription || !this.type) return;

    await this.recipeService.addRecipe({
      name: this.name,
      shortDescription: this.shortDescription,
      longDescription: this.longDescription,
      type: this.type,
      difficulty: this.difficulty,
      duration: this.duration
    });

    this.router.navigate(['/recipes']);
  }
}
