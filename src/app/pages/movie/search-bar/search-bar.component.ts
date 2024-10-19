import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParamOnSearchMovie } from '../../../../interface/movie.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor() {}
  @Input() filter: ParamOnSearchMovie = {};
  @Output() search = new EventEmitter<ParamOnSearchMovie>();
  @Output() reset = new EventEmitter<void>();
  movieTypes = [
    {value: 'movie', label: 'Movie'},
    {value: 'series', label: 'Series'},
    {value: 'game', label: 'Game'},
  ];

  ngOnInit() {
    this.searchMovies();
  }

  searchMovies() {
    this.search.emit({
      ...this.filter,
      page: 1,
    });
  }

  resetSearch() {
    this.filter.title = '';
    this.filter.type = '';
    this.reset.emit();
  }
}
