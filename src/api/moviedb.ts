const apiKey = process.env.REACT_APP_API_KEY;

interface SearchResponse extends Response{
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

export const searchMovie = async (query: string): Promise<SearchResultsItem[] | null | undefined> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
    const {page, results, total_pages, total_results}: SearchResponse = await response.json();
    if (response.ok) {
        const searchResults = results;
        console.log(searchResults);
        return searchResults?.slice(0, 4);
    }
    return null;
};