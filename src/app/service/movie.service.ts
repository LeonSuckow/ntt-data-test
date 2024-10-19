import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import {
  Movie,
  PaginationMovie,
  ParamMovieDetails,
  ParamSearchMovie,
} from '../../interface/movie.interface';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '4228e035'; // TODO: mudar para uma variavel de ambiente para não ficar exposto
  private apiUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService
  ) {}

  searchMovies(params: ParamSearchMovie): Observable<PaginationMovie> {
    this.loadingService.show();
    return this.httpClient
      .get<PaginationMovie>(this.apiUrl, { params: { ...params } })
      .pipe(finalize(() => this.loadingService.hide()));
  }

  getMovieByIdOrTitle(params: ParamMovieDetails): Observable<Movie> {
    this.loadingService.show();

    return this.httpClient
      .get<Movie>(this.apiUrl, { params: { ...params } })
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
