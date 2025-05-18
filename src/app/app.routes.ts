import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RecipesComponent} from "./pages/recipes/recipes.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent},
  {
    path: 'recipes/new',
    loadComponent: () => import('./pages/add-recipe/add-recipe.component').then(m => m.AddRecipeComponent),
    canActivate: [authGuard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
