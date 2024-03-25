import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWEzNDA2ZTUyNDA1ZjM4MjkxMmI1YzRmMWRhYTg5NiIsInN1YiI6IjY1ZmZmY2FkN2Y2YzhkMDE2MzZmMmIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g3DninYgwFapQYVxG6B_biOlC8i6RlQHrKneua_VhBk'
// const identification = {headers: {
//   Authorization: `Bearer ${accessToken}`,
// }};

export const getTrendingMovies = async (page) =>{
  const response = await axios.get('/trending/movie/day', {
    params: {
      language: 'en-US',
      page: page,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
  return response.data;
}

export const getMovieById = async (id) => {
  const response = await axios.get(`/movie/${id}`,{
    params:{ 
      language: 'en-US', 
    }, 
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
  return response.data;
}

export const getReviewsMovieById = async (id) =>{
const response = await axios.get(`/movie/${id}/reviews`, {
  params: {
    language: 'en-US',
    page: 1,
  },
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
})
  return response.data.results;
}

export const getCastMovieById = async (id) =>{
  const response = await axios.get(`/movie/${id}/credits`, {
    params: {
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })
    return response.data;
  }

  export const searchMovie = async (name) =>{
    const response = await axios.get('/search/movie', {
      params:{
        query: name, 
        include_adult: false, 
        language: 'en-US', 
        page: 1},headers: {
          Authorization: `Bearer ${accessToken}`,
        }})
        return response.data.results;  }

