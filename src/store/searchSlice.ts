import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from ".";
import { getConfiguration, getCredits, getMovieDetail, searchMovie } from "../api/moviedb";
import { SearchResultsItem, SearchState } from "../type";

const initialState: SearchState = {
    searchTerm: "",
    fetching: false,
    selectedMovie: undefined,
    credits: undefined,
    config: undefined,
    searchResults: []
}

export const searchSlice = createSlice ({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, { payload }: PayloadAction<string>) => {
            state.searchTerm = payload;
        },
        setIsFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.fetching = payload;
        },
        setSearchResults: (state, { payload }: PayloadAction<SearchResultsItem[]>) => {
            state.searchResults = payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchMovies.pending, (state, action) => {
            state.fetching = true;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload) {
                state.searchResults = action.payload;
            }
        })
        .addCase(fetchMovieDetails.pending, (state, action) => {
            state.fetching = true;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload) {
                state.selectedMovie = action.payload;
            }
        })
        .addCase(fetchCredits.pending, (state, action) => {
            state.fetching = true;
        })
        .addCase(fetchCredits.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload) {
                state.credits = action.payload;
            }
        })
        .addCase(fetchConfig.pending, (state, action) => {
            state.fetching = true;
        })
        .addCase(fetchConfig.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload) {
                state.config = action.payload;
            }
        })
    }
});

export const { setSearchTerm, setIsFetching, setSearchResults} = searchSlice.actions;
export const selectSearch = (state: RootState) => state.searchReducer;

export const fetchMovies = createAsyncThunk('search/searchMovies', async (query: string) => {
    const response = await searchMovie(query);
    return response;
});

export const fetchMovieDetails = createAsyncThunk('search/fetchMovieDetails', async (movie_id: string) => {
    const response = await getMovieDetail(movie_id);
    return response;
});

export const fetchCredits = createAsyncThunk('search/fetchCredits', async (movie_id: string) => {
    const response = await getCredits(movie_id);
    return response;
});

export const fetchConfig = createAsyncThunk('search/fetchConfig', async () => {
    const response = await getConfiguration();
    return response;
});

export default searchSlice.reducer;