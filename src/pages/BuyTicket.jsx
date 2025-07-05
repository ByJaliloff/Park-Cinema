import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { MovieContext } from '../context/DataContext';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';


function BuyTicket() {
  const { sessionId } = useParams();
  const { theatres, data: movies, loader, error } = useContext(MovieContext);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState(['2-3', '4-5', '6-7']);

  const rows = 8;
  const seatsPerRow = 10;

  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push({ id: `${row}-${seat}`, row, seat });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (id) => {
    if (reservedSeats.includes(id)) return;
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

const handleBuy = () => {
  setReservedSeats(prev => [...prev, ...selectedSeats]);

  const seatsText = selectedSeats.join(', ');

  Swal.fire({
    title: '🎟️ Bilet Alındı!',
    html: `<strong>Seçilmiş yerlər:</strong><br>${seatsText}<br><br><em>Yaxşı izləmələr! 🍿</em>`,
    icon: 'success',
    confirmButtonText: 'Bağla',
    confirmButtonColor: '#D52B1E',
    background: '#373737',
    color: '#ffffff',
    iconColor: '#D52B1E',
  });

  setSelectedSeats([]);
};



  if (loader) return <Loader />;
  if (error) return <Error />;

  const session = theatres.find(s => s.id === sessionId);
  if (!session) return <Error />;

  const movie = movies.find(m => m.id === session.movie.id);
  if (!movie) return <Error />;

  const hours = Math.floor(movie.duration / 60).toString().padStart(2, '0');
  const minutes = (movie.duration % 60).toString().padStart(2, '0');
  const durationFormatted = `${hours}:${minutes}:00`;

  const sessionDate = new Date(session.date).toLocaleDateString('az-AZ');
  const movieType = session.type.replace('_', '');

  const ticketPrice = session.price?.[0]?.price || 0;
  const totalPrice = ticketPrice * selectedSeats.length;

  return (
    <div className="bg-[#373737] py-35 text-white">
      <div className="max-w-[93%] mx-auto px-5">
        <h2 className="text-[30px] mb-4">Oturacaq Seçimi</h2>

        <div
          className="relative w-full h-[300px] bg-cover bg-center rounded-xl overflow-hidden mb-10"
          style={{ backgroundImage: `url('/images/movie-herobg.svg')` }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-start px-5 gap-6">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-[180px] h-[270px] object-cover rounded-xl shadow-lg"
            />

            <div className="space-y-1 text-[16px]">
              <h2 className="text-2xl font-bold">{movie.name}</h2>
              <p>{movieType}</p>

              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-white" /> {sessionDate}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-white" /> {session.time}
              </p>

              <p>Dil: {session.language}</p>
              <p>Kinoteatr: {session.theatreTitle}</p>
              <p>Zal: {session.hallTitle.replace('Zal: ', '')}</p>
              <p>Müddət: {durationFormatted}</p>
            </div>
          </div>
        </div>
       <div className="flex justify-between items-center flex-wrap gap-6 px-6 m-8">

         <div className="flex justify-start gap-6">
             <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gray-500 block"></span>
              <span className="text-sm text-white">Mövcuddur</span>
             </div>
        <div className="flex items-center gap-2">
           <span className="w-4 h-4 rounded-full bg-black block"></span>
           <span className="text-sm text-white">Tutulmuş</span>
       </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-600 block"></span>
           <span className="text-sm text-white">Seçilmiş</span>
         </div>
        </div>
            <div className="text-white text-md font-semibold">
              Biletin qiyməti: {session.price?.[0]?.price || 0} AZN
             </div>
         </div>

        <div className="bg-[#4D4D4D] p-6 rounded-lg">
          <div className="flex gap-2 justify-center items-start mb-2">
 
            <div className="flex flex-col justify-start gap-3 mr-2">
              {[...Array(rows)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 flex items-center justify-center text-white font-semibold"
                  style={{ minWidth: '36px' }}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            <div>
              {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-3 mb-3">
                  {seats
                    .filter(seat => seat.row === rowIndex + 1)
                    .map(seat => {
                      const isReserved = reservedSeats.includes(seat.id);
                      const isSelected = selectedSeats.includes(seat.id);
                      return (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(seat.id)}
                          disabled={isReserved}
                          title={`Sıra ${seat.row}, Yer ${seat.seat}`}
                          className={`
                            w-10 h-10 rounded-md text-sm font-semibold flex items-center justify-center
                            ${isReserved
                              ? 'bg-black cursor-not-allowed'
                              : isSelected
                              ? 'bg-red-600 hover:bg-red-500'
                              : 'bg-gray-500 hover:bg-red-400 cursor-pointer'
                            }
                          `}
                        >
                          {seat.seat}
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <div className="text-white font-semibold mb-4 text-lg">Ekran</div>
            <img
              src="/images/screen.svg"
              alt="Ekran"
              className="w-[70%] max-w-[600px] h-auto"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-white font-semibold text-lg">
              Ümumi: <span>{totalPrice.toFixed(2)} ₼</span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={handleBuy}
              className={`
                flex items-center justify-center
                bg-[#D52B1E]
                rounded-[20px]
                text-[#D9DADB]
                w-[250px] h-[40px]
                max-md:w-full max-w-container max-md:mx-auto
                opacity-80 hover:opacity-100 duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              Bilet Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
