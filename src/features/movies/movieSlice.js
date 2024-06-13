import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const res = await movieApi.get(
      `?i=tt3896198&apikey=${APIKey}&s=${term}&type=movie`
    );
    return res.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const res = await movieApi.get(
      `?i=tt3896198&apikey=${APIKey}&s=${term}&type=series`
    );
    return res.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const res = await movieApi.get(
      `??i=tt3896198&apikey=${APIKey}&i=${id}&plot=full`
    );
    return res.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loader: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log('fetched sucessfully');
        return { ...state, loader: false, movies: payload };
      })
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log('pending');
        return { ...state, loader: true };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log('fetched rejected');
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log('fetched sucessfully');
        return { ...state, loader: false, shows: payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log('fetched sucessfully');
        return { ...state, selectedMovieOrShow: payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getLoadingState = (state) => state.movies.loader;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
