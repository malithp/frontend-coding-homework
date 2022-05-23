import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RootState } from ".";
import { searchMovie } from "../api/moviedb";
import { SearchResultsItem, SearchState } from "../type";

const initialState: SearchState = {
    searchTerm: "",
    fetching: false,
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
    }
});

export const { setSearchTerm, setIsFetching, setSearchResults} = searchSlice.actions;
export const selectSearch = (state: RootState) => state.searchReducer;

export const fetchMovies = createAsyncThunk('search/searchMovies', async (query: string) => {
    const response = await searchMovie(query);
    return response;
});

export default searchSlice.reducer;