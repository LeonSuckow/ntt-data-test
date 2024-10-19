import { Component } from '@angular/core';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from "./layout/main/main.component";
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';
import { SearchBarComponent } from './pages/movie/search-bar/search-bar.component';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainComponent,
    HeaderComponent,
    SearchBarComponent,
    MovieDetailsComponent,
    FooterComponent,
    MovieListComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = true;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
