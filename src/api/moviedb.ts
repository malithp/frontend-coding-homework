const apiKey = process.env.REACT_APP_API_KEY;

interface SearchResponse {
    page: number;
    results?: (SearchResultsItem)[] | null;
    total_pages: number;
    total_results: number;
};

export type SearchResultsItem = {
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
export interface BelongsToCollectionType {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
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
  
  
  

export const searchMovie = async (query: string): Promise<SearchResultsItem[] | null | undefined> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
    const {page, results, total_pages, total_results}: SearchResponse = await response.json();
    if (response.ok) {
        const searchResults = results;
        console.log(searchResults);
        return searchResults?.slice(0, 5);
    }
    return null;
};

export const getMovieDetail = async (movie_id: string): Promise<GetMovieResponse | null> => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
    const movieResponse: GetMovieResponse = await response.json();
    if (response.ok) {
        console.log(movieResponse);
        return movieResponse;
    }
    return null;
};

export const getConfiguration = async (): Promise<ConfigurationResponse | null> => {
  const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
  const configResponse: ConfigurationResponse = await response.json();
  if (response.ok) {
    return configResponse;
  }
  return null;
};

export const getCredits = async(movie_id: string): Promise<CastEntity[] | undefined> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`);
  const creditsResponse: CreditsResponse = await response.json();
  if (response.ok) {
    const cast = creditsResponse.cast;
    return cast?.sort((a,b) => b.popularity - a.popularity).slice(0, 10);
  }
  return undefined;
};