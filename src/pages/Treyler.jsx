import { useContext } from 'react';
import { MovieContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

function Treyler() {
    const { data } = useContext(MovieContext);

       if (!data) {
        return <Loader />;}
   
    const trailerMovies = data.filter(movie => movie.youtubeUrl);


    return (
        <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory bg-[#585656]">

            <div className="fixed top-0 left-0 w-full z-10 bg-white/10 backdrop-blur-md text-white flex justify-evenly gap-10 py-4 text-[30px] font-semibold">
                <Link to="/" className="transition-all">
                    Siyahı
                </Link>
                <Link to="/treyler" className="transition-all">
                    Treyler
                </Link>
            </div>

            <div className="pt-20"> 
                {trailerMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className="h-screen flex flex-col items-center justify-center snap-start px-4 text-white"
                    >
                        <h2 className="text-3xl font-semibold mb-6">{movie.title}</h2>

                        <div className="w-full max-w-4xl aspect-video">
                            <iframe
                                className="w-full h-full rounded-xl"
                                src={movie.youtubeUrl.replace("watch?v=", "embed/")}
                                title={movie.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Treyler;
