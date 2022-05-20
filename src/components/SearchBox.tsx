import { useState } from 'react';
import { searchMovie, SearchResultsItem } from '../api/moviedb';
import '../styles/SearchBox.css';

const SearchBox = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResultsItem[]>();

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
                    <div id={key.toString()}>
                        {result.title}
                    </div>
                ))}
            </div>
        </>
    )

};

export default SearchBox;