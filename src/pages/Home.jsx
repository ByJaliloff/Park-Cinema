import { useContext } from 'react';
import { MovieContext } from '../context/DataContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Slider from '../components/Slider';
import Filter from '../components/Filter';

function Home() {
  const {
    data,
    theatres,
    loader,
    error,
    selectedTheatre,
    selectedLanguage,
  } = useContext(MovieContext);

  if (loader) return <Loader />;
  if (error) return <p className="text-red-500">Xəta baş verdi</p>;

  const filteredMovies = data.filter(movie => {
    const matchTheatre = selectedTheatre
      ? theatres.some(theatre => theatre.id === selectedTheatre && theatre.movie.id === movie.id)
      : true;

    const matchLanguage = selectedLanguage
      ? movie.languages.includes(selectedLanguage)
      : true;

    return matchTheatre && matchLanguage;
  });

  return (
    <>
      <Slider />
      <div className="bg-[#373737] py-10">
        <div className="max-w-[93%] mx-auto pb-4">
          <Filter />
        </div>

        <div className='max-w-[93%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-6 pt-10'>
          {filteredMovies.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
