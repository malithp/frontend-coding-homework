import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { SearchState } from "../type";

const initialState: SearchState = {
    searchTerm: "",
    fetching: false,
    searchResults: []
}

export const searchSlice = createSlice ({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm: (state, { payload }: PayloadAction) => {
            state.searchTerm = "";
        },
        setIsFetching: (state, { payload }: PayloadAction) => {
            state.fetching = false;
        }
    }
});

export const { setSearchTerm, setIsFetching} = searchSlice.actions;
export const selectSearch = (state: RootState) => state.searchReducer;

export default searchSlice.reducer;