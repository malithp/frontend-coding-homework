import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail, GetMovieResponse } from "../api/moviedb";

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState<GetMovieResponse>();
    let {id} = useParams();
    
    React.useEffect(() => {
        if (id) {
            getMovieDetail(id)
            .then(response => {
                if (response) {
                    setMovieDetails(response);
                    console.log(response);
                }
            });
        }
    }, []);

    return (
        <h1>Movie details for {id}</h1>
    );
};

export default MovieDetails;