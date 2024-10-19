import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent }, 
  { path: 'movie/:movieId', component: MovieDetailsComponent }, 
  { path: '**', redirectTo: '' }  
];
