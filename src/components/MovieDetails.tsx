import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CastEntity, ConfigurationResponse, GetMovieResponse } from "../type";
import {getConfiguration, getCredits, getMovieDetail} from "../api/moviedb";
import '../styles/MovieDetails.css';
import { fetchMovies, setIsFetching } from "../store/searchSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useSelector } from "../store";

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState<GetMovieResponse>();
    const [config, setConfig] = useState<ConfigurationResponse>();
    const [cast, setCast] = useState<CastEntity[]>();
    const dispatch = useDispatch<AppDispatch>();
    const isFetching = useSelector((state) => state.searchReducer.fetching);
    const searchResults = useSelector((state) => state.searchReducer.searchResults);
    const navigate = useNavigate();
    let {id} = useParams();
    
    React.useEffect(() => {
        if (id) {
            dispatch(setIsFetching(true));
            getMovieDetail(id)
            .then(response => {
                if (response) {
                    setMovieDetails(response);
                }
            });

            getCredits(id)
            .then(response => {
                if (response) {
                    setCast(response);
                }
            })

            if (searchResults.length < 1) {
                if (movieDetails) dispatch(fetchMovies(movieDetails?.title.split(' ')[0]));
            }
        }
        
        getConfiguration()
        .then (response => {
            if (response) {
                setConfig(response);
            }
        })
        dispatch(setIsFetching(false));
    }, [id]);

    if (isFetching){
        <h1>Loading...</h1>
    }

    return (
        <div className="detailsBody">
            <div className="spacer"></div>
            <div className="mainDiv">
                <h1>{movieDetails?.title}</h1>
                <div className="infoContainer">
                    <img src={`${config?.images.base_url}/w500/${movieDetails?.poster_path}`} alt="" width="300px" height="450px"/>
                    <div style={{alignSelf: "center", height: "100%"}}>
                        <div className="infoDiv">
                            <table style={{height: "100%"}}>
                                <tr>
                                    <td>Release Date:</td>
                                    <td className="tableData">{movieDetails?.release_date}</td>
                                </tr>
                                <tr>
                                    <td>Runtime:</td>
                                    <td className="tableData">{movieDetails?.runtime}</td>
                                </tr>
                                <tr>
                                    <td>Top Cast:</td>
                                    <td className="tableData">
                                            {cast?.map(actor => (
                                                <div>{actor.name}</div>
                                            ))}
                                    </td>
                                </tr>
                                { searchResults && searchResults.length > 0
                                    ? <tr>
                                        <td>Similar Titles:</td>
                                        <td className="tableData">
                                                {searchResults?.map(movie => (
                                                    <div onClick={() => navigate(`/movie/${movie.id}`)}>{movie.title}</div>
                                                ))}
                                        </td>
                                    </tr>
                                    : null
                                }
                            </table>
                        </div>
                    </div>
                </div>                
                <div className="overviewContainer">
                    <div>
                        {movieDetails?.overview}
                    </div>
                </div>
            </div>
            <div className="spacer"></div>
        </div>
        
    );
};

export default MovieDetails;