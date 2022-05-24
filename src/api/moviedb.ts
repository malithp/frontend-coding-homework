import { CastEntity, ConfigurationResponse, CreditsResponse, GetMovieResponse, SearchResponse, SearchResultsItem } from "../type";

const apiKey = process.env.REACT_APP_API_KEY;

export const searchMovie = async (query: string): Promise<SearchResultsItem[] | null | undefined> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
    const {page, results, total_pages, total_results}: SearchResponse = await response.json();
    if (response.ok) {
        const searchResults = results;
        return searchResults?.sort((a,b) => b.popularity - a.popularity).slice(0, 5);
    }
    return null;
};

export const getMovieDetail = async (movie_id: string): Promise<GetMovieResponse | null> => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
    const movieResponse: GetMovieResponse = await response.json();
    if (response.ok) {
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