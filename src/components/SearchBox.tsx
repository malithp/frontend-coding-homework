import { useState } from 'react';
import { getMovieDetail, searchMovie, SearchResultsItem } from '../api/moviedb';
import '../styles/SearchBox.css';
import { Navigate, useNavigate } from "react-router-dom";

const SearchBox = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResultsItem[]>();
    const navigate = useNavigate();

    const handleOnChange = (phrase: string) => {
        console.log(phrase);
        searchMovie(phrase)
        .then(res => {
            if (res) {
                setSearchResults(res);
            }
        })
        setSearchTerm(phrase)
        
    };

    return (
        <>
            <input placeholder="Search Movie" onChange={(event) => handleOnChange(event.target.value)} value={searchTerm}></input>
            <div id="searchResults">
                { searchResults?.map((result, key) => (
                    <div id={key.toString()} onClick={() => navigate(`/movie/${result.id}`)}>
                        {result.title}
                    </div>
                ))}
            </div>
        </>
    )

};

export default SearchBox;