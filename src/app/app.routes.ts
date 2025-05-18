import { Routes } from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RecipesComponent} from "./pages/recipes/recipes.component";
import {ProfileComponent} from "./pages/profile/profile.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
