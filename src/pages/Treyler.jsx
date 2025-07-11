import { useContext } from 'react';
import { MovieContext } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const flagMap = {
  AZ: '/icons/azerbaijan.png',
  RU: '/icons/russia.png',
  EN: '/icons/united-kingdom.png',
  TR: '/icons/turkey.png'
};

function Treyler() {
  const { data, theatres } = useContext(MovieContext);
  const navigate = useNavigate();

  if (!data) {
    return <Loader />;
  }

  const trailerMovies = data.filter(movie => movie.youtubeUrl);

  const getSessionIdForMovie = (movieId) => {
    const session = theatres.find(session => session.movie.id === movieId);
    return session ? session.id : null;
  };

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory bg-[#585656]">

      <div className="fixed top-0 left-0 w-full z-10 bg-white/10 backdrop-blur-md text-white flex justify-evenly gap-10 py-4 text-[30px] font-semibold">
        <Link to="/" className="transition-all">Siyahı</Link>
        <Link to="/treyler" className="transition-all text-white" style={{ textShadow: '0px 0px 14px #fff' }}>Treyler</Link>
      </div>

      <div className="pt-20">
        {trailerMovies.map((movie) => {
          const sessionId = getSessionIdForMovie(movie.id);

          return (
            <div
              key={movie.id}
              className="h-screen flex flex-col items-center justify-center snap-start px-4 text-white"
            >
              <div className="w-full max-w-4xl aspect-video  overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={movie.youtubeUrl.replace("watch?v=", "embed/")}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="w-full max-w-4xl flex justify-between items-center bg-[#2D2D2D] p-5">

                <div className="flex items-center gap-4 flex-wrap max-w-[70%]">
                  <h2 className="text-[16px] font-semibold whitespace-nowrap">{movie.name}</h2>

                  <span className="text-[16px] opacity-80 whitespace-nowrap">
                    {movie.genres?.map(g => g.title).join(', ') || '-'}
                  </span>

                  <div className="flex items-center gap-1">
                    {movie.languages?.map(lang => (
                      flagMap[lang] ? (
                        <img
                          key={lang}
                          src={flagMap[lang]}
                          alt={lang}
                          className="w-6 h-6 rounded-sm"
                        />
                      ) : null
                    ))}
                  </div>
                </div>

                <button
                  disabled={!sessionId}
                  onClick={() => {
                    if (sessionId) navigate(`/buy-ticket/${sessionId}`);
                  }}
                  className={`bg-[#D52B1E] rounded-[20px] text-[#D9DADB] w-[150px] h-[40px]
                    opacity-80 hover:opacity-100 duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Bilet Al
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Treyler;
