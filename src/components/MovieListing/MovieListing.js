import React from 'react';
import { useSelector } from 'react-redux';
import {
  getAllMovies,
  getAllShows,
  getLoadingState,
} from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import { Settings } from '../../common/settings';
import Slider from 'react-slick';
import './MovieListing.scss';

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const loader = useSelector(getLoadingState);
  let renderMovies = '';
  let renderShows = '';
  renderMovies =
    movies.Response === 'True' ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className='movie-error'>
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === 'True' ? (
      shows.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className='movie-error'>
        <h3>{movies.Error}</h3>
      </div>
    );
  return (
    <div className='movie-wrapper'>
      {loader === true ? (
        <div className='search-loading'>
          <span>
            <i className='fa fa-spinner'></i>
          </span>
        </div>
      ) : (
        <>
          <div className='movie-list'>
            <h2>Movies</h2>
            <div className='movie-container'>
              <Slider {...Settings}>{renderMovies}</Slider>
            </div>
          </div>
          <div className='show-list'>
            <h2>Shows</h2>
            <div className='movie-container'>
              <Slider {...Settings}>{renderShows}</Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieListing;
