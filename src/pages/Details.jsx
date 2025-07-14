import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../service.js/MovieService';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { MovieContext } from '../context/DataContext';

const flagMap = {
  AZ: '/icons/azerbaijan.png',
  RU: '/icons/russia.png',
  EN: '/icons/united-kingdom.png',
  TR: '/icons/turkey.png'
};

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theatres } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');

  useEffect(() => {
    setError(false);
    setMovie(null);

    getMovieById(id)
      .then((item) => {
        if (item) setMovie(item);
        else setError(true);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <Error />;
  if (movie === null) return <Loader />;

  const movieSessions = theatres.filter(session => session.movie.id === movie.id);

  const LANGUAGES = [...new Set(movieSessions.map(s => s.language))];
  const uniqueTheatres = [...new Map(movieSessions.map(s => [s.theatreId, s])).values()];

  const filteredSessions = movieSessions.filter(session =>
    (selectedLanguage ? session.language === selectedLanguage : true) &&
    (selectedTheatre ? session.theatreId === selectedTheatre : true)
  );

  const handleBuyClick = (sessionId) => {
    navigate(`/buy-ticket/${sessionId}`);
  };

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
                  {movie.languages?.map(lang =>
                    flagMap[lang] && (
                      <img key={lang} src={flagMap[lang]} alt={lang} className="w-6 h-6 rounded-sm" />
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <strong>Altyazı:</strong>
                <div className="flex gap-2 mt-1">
                  {movie.subtitles && movie.subtitles.length > 0 ? (
                    movie.subtitles.map(lang =>
                      flagMap[lang] && (
                        <img key={lang} src={flagMap[lang]} alt={lang} className="w-6 h-6 rounded-sm" />
                      )
                    )
                  ) : (
                    <span className="text-red-500 font-semibold text-[14px]">Altyazı yoxdur</span>
                  )}
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
            <p className="text-[16px] leading-6">{movie.description.slice(0, 695)}</p>
          </div>
        </div>

        <div className="w-full aspect-video">
          {movie.youtubeUrl ? (
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

      <div className="pt-20 max-w-[93%] mx-auto">
              <div className="flex flex-wrap items-end justify-center gap-4 mb-6 w-full pb-20">
                <div className="flex flex-col w-full md:w-[40%]">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-transparent border-b border-white px-3 py-2 focus:outline-none text-white italic text-[16px] font-medium"
                  >
                    <option value="" disabled hidden>Dil</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang} className="text-black" style={{ backgroundColor: '#8e8e91' }}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full md:w-[40%]">
                  <select
                    value={selectedTheatre}
                    onChange={(e) => setSelectedTheatre(e.target.value)}
                    className="bg-transparent border-b border-white px-3 py-2 focus:outline-none text-white italic text-[16px] font-medium"
                  >
                    <option value="" disabled hidden>Kinoteatr</option>
                    {uniqueTheatres.map(theatre => (
                      <option key={theatre.theatreId} value={theatre.theatreId} className="text-black" style={{ backgroundColor: '#8e8e91' }}>
                        {theatre.theatreTitle}
                      </option>
                    ))}
                  </select>
                </div>

                {(selectedLanguage || selectedTheatre) && (
                  <button
                    onClick={() => {
                      setSelectedLanguage('');
                      setSelectedTheatre('');
                    }}
                    className="text-[16px] border border-[#ef4444] px-4 py-2 text-[#ef4444] hover:text-white hover:bg-[#ef4444] whitespace-nowrap rounded transition"
                  >
                    Təmizlə
                  </button>
                )}
              </div>

        {filteredSessions.length === 0 ? (
          <p>Bu kriteriyalara uyğun seans tapılmadı.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredSessions.map((session, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-4 items-center bg-[#373737] px-4 py-3 text-sm border-b-2 border-white/50">

                    <div className="font-semibold">{session.time}</div>

                    <div className="truncate">{session.theatreTitle} | {session.hallTitle}</div>

                    <div className="flex items-center gap-x-8">
                      <span>{session.type.replace('_', '')}</span>
                      {flagMap[session.language] && (
                        <img src={flagMap[session.language]} alt={session.language} className="w-6 h-6 rounded-sm" />
                      )}
                    </div>

                    <div>
                      {session.subtitle === 'AZ' ? (
                        <span className="border px-2 py-1 rounded text-xs text-center inline-block">AZE<br />sub</span>
                      ) : (
                        <span className="border px-2 py-1 rounded text-xs text-center inline-block">Altyazı<br />yoxdur</span>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleBuyClick(session.id)}
                        className="bg-[#C02020] hover:bg-[#A81A1A] text-white text-sm w-[100px] md:w-[160px] h-[36px] px-4 py-2 rounded-[20px] opacity-65 hover:opacity-100 transition duration-200"
                      >
                        Bilet Al
                      </button>
                    </div>
                  </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
