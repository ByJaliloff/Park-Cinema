import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL:", BASE_URL); 

const getAllMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movies`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}


const getMovieById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/movies/${id}`);
    return res.data
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}


const getAllTheatres = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/theatre`);
    return res.data;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}

const createNewMovie = async (newMovieData) => {
  try {
    const res = await axios.post(`${BASE_URL}/movies`, newMovieData);
    return res.data;
  } catch (err) {
    console.error(err.message || 'Yeni film əlavə edilərkən xəta baş verdi');
  }
};

const deleteMovie = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/movies/${id}`);
    return res.data;
  } catch (error) {
    console.error(error.message || 'Film silinərkən xəta baş verdi');
  }
};

const editMovie = async (id, updatedMovie) => {
  try {
    const res = await axios.put(`${BASE_URL}/movies/${id}`, updatedMovie);
  return res.data;
} catch (error) {
    console.error(err.message || 'Yeni film əlavə edilərkən xəta baş verdi');
  }
};


export { getAllMovies, getMovieById, getAllTheatres, createNewMovie, deleteMovie, editMovie};
