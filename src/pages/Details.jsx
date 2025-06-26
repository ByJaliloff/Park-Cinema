import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../service.js/MovieService';
import Error from '../components/Error';
import Loader from '../components/Loader';

const flagMap = {
  AZ: '/icons/azerbaijan.png',
  RU: '/icons/russia.png',
  EN: '/icons/united-kingdom.png',
  TR: '/icons/turkey.png',
  US: '/icons/united-states.png'
};

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setMovie(null);

    getMovieById(id)
      .then((item) => {
        if (item) {
          setMovie(item);
        } else {
          setError(true); 
        }
      })
      .catch(() => {
        setError(true); 
      });
  }, [id]);

   if (error) return <Error />;
   if (movie === null) return <Loader />;

return (
  <div className="bg-[#373737] text-white py-35">
    <div className="max-w-[93%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

      <div className="flex flex-col gap-6 text-[#D9DADB]">

        <div className="flex flex-row gap-6">

          <img
            src={movie.image}
            alt={movie.name}
            className="rounded-xl w-[300px] h-[500px] object-cover"
          />

          <div className="space-y-3 flex-1">
            <h2 className="text-[20px] font-bold">{movie.name}</h2>
            <p className="text-[14px]">{movie.genres?.map(g => g.title).join(', ')}</p>

            <div className="flex flex-col">
              <strong>Dil:</strong>
              <div className="flex gap-2 mt-1">
                {movie.languages?.map(lang => (
                  flagMap[lang] && <img key={lang} src={flagMap[lang]} alt={lang} className="w-6 h-6 rounded-sm" />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <strong>Altyazı:</strong>
              <div className="flex gap-2 mt-1">
                {movie.subtitles?.map(lang => (
                  flagMap[lang] && <img key={lang} src={flagMap[lang]} alt={lang} className="w-6 h-6 rounded-sm" />
                ))}
              </div>
            </div>

            <p><strong>Müddət:</strong> {Math.floor(movie.duration / 60).toString().padStart(2, '0')}:{(movie.duration % 60).toString().padStart(2, '0')}:00</p>
            <p><strong>İl:</strong> {movie.year}</p>
            <p><strong>Ölkə:</strong> {movie.country}</p>
            <p><strong>Rejissor:</strong> {movie.director}</p>
            <p><strong>Aktyorlar:</strong> {movie.actors?.join(', ')}</p>
            <p><strong>Yaş həddi:</strong> {
              movie.ageLimit === 'SIXTEEN' ? '16+' :
              movie.ageLimit === 'EIGHTEEN' ? '18+' :
              movie.ageLimit === 'TWELVE' ? '12+' :
              movie.ageLimit === 'SIX' ? '6+' : '0+'
            }</p>
            <p><strong>Nümayiş tarixi:</strong> {new Date(movie.firstScreeningDate).toLocaleDateString('az-AZ')}</p>
          </div>
        </div>


        <div className="pt-6 text-[#D9DADB]">
          <p className="text-[16px] leading-6">{movie.description}</p>
        </div>
      </div>


      <div className="w-full aspect-video">
        { movie.youtubeUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={movie.youtubeUrl.replace('watch?v=', 'embed/')}
            title="YouTube trailer"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        ) : (
          <div className="text-center text-gray-400 border border-gray-500 p-10 rounded-lg">
            Video treyler mövcud deyil
          </div>
        )}
      </div>

    </div>
  </div>
);


}

export default Details;
