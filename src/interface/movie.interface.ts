export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface PaginationMovie {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface Rating {
  Source: string
  Value: string
}

export interface ParamMovieDetails{
  t?: string,
  i: string,
  y?: string,
  type?: '' | 'movie' | 'series' | 'episode',
  plot?: 'short' | 'full',
}

export interface ParamSearchMovie{
  s: string,
  y?: string,
  page?: number,
  type?: '' | 'movie' | 'series' | 'episode',
  plot?: 'short' | 'full',
}

export interface ParamOnSearchMovie{
  type?: '' | 'movie' | 'series' | 'episode',
  title?: string,
  page?: number;
}