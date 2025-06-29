const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL:", BASE_URL); 

async function getAllMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movies`);
    if (!res.ok) throw new Error("fetch emeliyyatinda xeta bas verdi");
    const movies = await res.json();
    return movies;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}


async function getMovieById(id) {
  try {
    const res = await fetch(`${BASE_URL}/movies/${id}`);
    if (!res.ok) throw new Error("fetch emeliyyatinda xeta bas verdi");
    const movies = await res.json();
    return movies;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi')
  }
}


async function getAllTheatres() {
  try {
    const res = await fetch(`${BASE_URL}/theatre`);
    if (!res.ok) throw new Error("fetch emeliyyatinda xeta bas verdi");
    const theatres = await res.json();
    return theatres;
  } catch (err) {
    console.error(err.message || 'fetch emeliyyatinda xeta bas verdi');
  }
}

export { getAllMovies, getMovieById, getAllTheatres};
