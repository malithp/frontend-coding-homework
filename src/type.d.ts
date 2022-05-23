export interface SearchResponse {
    page: number;
    results?: (SearchResultsItem)[] | null;
    total_pages: number;
    total_results: number;
};

export interface SearchResultsItem {
    adult: boolean;
    backdrop_path: string;
    genre_ids?: (number)[] | null;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export interface GetMovieResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollectionType;
  budget: number;
  genres?: (GenresEntity)[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: (ProductionCompaniesEntity)[] | null;
  production_countries?: (ProductionCountriesEntity)[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: (SpokenLanguagesEntity)[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenresEntity {
  id: number;
  name: string;
}
export interface ProductionCompaniesEntity {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ConfigurationResponse {
  images: Images;
  change_keys?: (string)[] | null;
}
export interface Images {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes?: (string)[] | null;
  logo_sizes?: (string)[] | null;
  poster_sizes?: (string)[] | null;
  profile_sizes?: (string)[] | null;
  still_sizes?: (string)[] | null;
}

export interface CreditsResponse {
  id: number;
  cast?: (CastEntity)[] | null;
  crew?: (CrewEntity)[] | null;
}
export interface CastEntity {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface CrewEntity {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  credit_id: string;
  department: string;
  job: string;
}

type SearchAction = {
    type: string,
    searchTerm: string
}

type SearchState = {
    searchTerm: string,
    fetching: boolean,
    selectedMovie?: GetMovieResponse,
    credits?: CastEntity[],
    config?: ConfigurationResponse,
    searchResults: SearchResultsItem[]
}

export type DispatchType = (args: SearchResponse) => MovieAction;