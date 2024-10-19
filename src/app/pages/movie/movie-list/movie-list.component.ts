import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Movie,
  ParamOnSearchMovie,
} from '../../../../interface/movie.interface';
import { Pagination } from '../../../../interface/pagination.interface';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { MovieService } from '../../../service/movie.service';
import { ToastService } from '../../../service/toast.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, PaginationComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies: Movie[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
  };
  filter: ParamOnSearchMovie = {
    title: 'Wolverine',
    type: '',
    page: 1,
  };

  constructor(
    private movieService: MovieService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSearchMovies(filter: ParamOnSearchMovie) {
    this.filter = filter;
    this.pagination.currentPage = filter.page ?? 1;

    this.movieService
      .searchMovies({
        s: filter.title ?? '',
        page: filter.page ?? 1,
        type: filter.type ?? 'movie',
      })
      .subscribe({
        next: (response) => {
          if(response.Response === 'False') {
            this.movies = [];
            this.toastService.show(`Nenhum resultado encontrado`, 'danger');
            return
          }
          this.movies = response.Search.map((movie) => {
            movie.Poster =
              !movie.Poster || movie.Poster === 'N/A'
                ? 'assets/404.png'
                : movie.Poster;
            return movie;
          });

          this.pagination = {
            ...this.pagination,
            totalResults: Number(response.totalResults),
          };
        },
        error: (error) => {
          this.toastService.show(`Algo deu errado ao buscar`, 'danger');
          console.error('Erro ao buscar filmes', error);
        },
      });
  }

  onPageChange(page: number) {
    this.onSearchMovies({ ...this.filter, page });
  }

  onSelectMovie(movieId: string) {
    this.router.navigate([`/movie/${movieId}`]);
  }

  onResetSearch() {
    this.movies = [];
  }
}
