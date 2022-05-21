import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CastEntity, ConfigurationResponse, CreditsResponse, CrewEntity, getConfiguration, getCredits, getMovieDetail, GetMovieResponse } from "../api/moviedb";
import '../styles/MovieDetails.css';

const Spacer = () => (
    <div style={{width: "10%"}}></div>
);

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState<GetMovieResponse>();
    const [config, setConfig] = useState<ConfigurationResponse>();
    const [cast, setCast] = useState<CastEntity[]>();
    let {id} = useParams();
    
    React.useEffect(() => {
        if (id) {
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
                    console.log(response);
                }
            })
        }
        
        getConfiguration()
        .then (response => {
            if (response) {
                setConfig(response);
            }
        })
    }, []);

    return (
        <div className="detailsBody">
            <div className="spacer"></div>
            <div className="mainDiv">
                <h1>{movieDetails?.title}</h1>
                <div className="infoContainer">
                    <img src={`${config?.images.base_url}/w500/${movieDetails?.poster_path}`} alt="" width="300px"/>
                    <div >
                        <div className="infoDiv">
                            <table>
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