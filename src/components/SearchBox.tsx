import '../styles/SearchBox.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovies, setSearchTerm } from '../store/searchSlice';
import { AppDispatch, useSelector } from "../store";

const SearchBox = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isFetching = useSelector((state) => state.searchReducer.fetching);
    const searchResults = useSelector((state) => state.searchReducer.searchResults);
    const searchTerm = useSelector((state) => state.searchReducer.searchTerm);

    const handleOnChange = (phrase: string) => {
        dispatch(setSearchTerm(phrase));
        dispatch(fetchMovies(phrase));
    };

    return (
        <>
            <input placeholder="Search Movie" onChange={(event) => handleOnChange(event.target.value)} value={searchTerm}></input>
            <div id="searchResults">
                { isFetching 
                ? <h4>Loading results...</h4> 
                : searchResults?.map((result, key) => (
                    <div id={key.toString()} onClick={() => navigate(`/movie/${result.id}`)}>
                        {result.title}
                    </div>
                ))}
            </div>
        </>
    )

};

export default SearchBox;