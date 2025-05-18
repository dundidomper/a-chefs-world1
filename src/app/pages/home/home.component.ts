import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService} from "../../shared/services/recipe.service";
import { Recipe } from '../../shared/models/recipe.model';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RecipeTypePipe } from '../../shared/pipes/recipe-type.pipe';
import { RecipeDifficultyPipe } from '../../shared/pipes/recipe-difficulty.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    RecipeTypePipe,
    RecipeDifficultyPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private recipeService = inject(RecipeService);

  randomSoup?: Recipe;
  randomMain?: Recipe;
  randomDessert?: Recipe;

  ngOnInit(): void {
    this.loadRandomRecipes();
  }

  async loadRandomRecipes() {
    const soups = await this.recipeService.getRandomRecipeByType('soup');
    const mains = await this.recipeService.getRandomRecipeByType('main');
    const desserts = await this.recipeService.getRandomRecipeByType('dessert');

    this.randomSoup = soups;
    this.randomMain = mains;
    this.randomDessert = desserts;
  }
}
