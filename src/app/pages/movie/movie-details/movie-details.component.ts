import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../../interface/movie.interface';
import { MovieService } from '../../../service/movie.service';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  @Input() movie: Movie = {} as Movie;

  constructor(
    private movieService: MovieService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const movieId = this.activeRouter.snapshot.paramMap.get('movieId');
    if (!movieId) {
      this.router.navigate(['/']);
      return;
    }
    this.movieService.getMovieByIdOrTitle({ i: movieId }).subscribe({
      next: (movie) => {
        movie.Poster = !movie.Poster || movie.Poster === 'N/A' ? 'assets/404.png' : movie.Poster;
        this.movie = movie;
      },
      error: (error) => {
        this.toastService.show(`Algo deu errado`, 'danger');
        console.error('Erro ao buscar filme', error);
      },
    });
  }

  onBackToList() {
    this.router.navigate(['/']);
  }

  onFavorite(movie: Movie) {
    this.toastService.show(`Filme '${movie.Title}' adicionado aos favoritos!`, 'success');
  }

  // Função para calcular as estrelas baseadas na nota
  calculateStars(rating: string): string[] {
    const stars = [];
    const maxStars = 5;
    let ratingOutOfFive = 0;

    if (rating.includes('/')) {
      const [score, max] = rating.split('/').map(Number);
      ratingOutOfFive = (score / max) * maxStars;
    } else if (rating.includes('%')) {
      ratingOutOfFive = (parseFloat(rating) / 100) * maxStars;
    }

    const fullStars = Math.floor(ratingOutOfFive);
    for (let i = 0; i < fullStars; i++) {
      stars.push('bi-star-fill');
    }

    const hasHalfStar = ratingOutOfFive - fullStars >= 0.5;
    if (hasHalfStar) {
      stars.push('bi-star-half');
    }

    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('bi-star');
    }

    return stars;
  }
}
