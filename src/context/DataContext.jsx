import { createContext, useEffect, useState } from 'react';
import { getAllMovies, getAllTheatres } from '../service.js/MovieService';

export const MovieContext = createContext();

function DataContext({ children }) {
  const [data, setData] = useState([]); 
  const [theatres, setTheatres] = useState([]); 
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);

  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    Promise.all([getAllMovies(), getAllTheatres()])
      .then(([moviesData, theatreData]) => {
        setData(moviesData);
        setTheatres(theatreData);
      })
      .catch(err => setError(err))
      .finally(() => setLoader(false));
  }, []);

const obj = {
  data,
  setData,
  theatres,
  setTheatres,
  error,
  loader,
  selectedTheatre,
  setSelectedTheatre,
  selectedLanguage,
  setSelectedLanguage,
};


  return (
    <MovieContext.Provider value={obj}>
      {children}
    </MovieContext.Provider>
  );
}

export default DataContext;
