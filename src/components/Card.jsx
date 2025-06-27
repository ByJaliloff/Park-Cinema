import { Link } from 'react-router-dom';
import { format } from 'date-fns';


const ageMap = {
  ZERO: '0+',
  SIX: '6+',
  TWELVE: '12+',
  SIXTEEN: '16+',
  EIGHTEEN: '18+',
};

const flagMap = {
  AZ: '/icons/azerbaijan.png',
  RU: '/icons/russia.png',
  EN: '/icons/united-kingdom.png',
  TR: '/icons/turkey.png',
};

function Card({ id, name, image, firstScreeningDate, ageLimit, languages }) {
  const date = new Date(firstScreeningDate);
  const formattedDate = format(date, 'dd.MM.yyyy');

  const ageLabel = ageMap[ageLimit] || ageLimit;

  return (
    <Link to={`movies/${id}`}>
  <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group">
    
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
    />

    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

    <div className="absolute bottom-0 left-0 w-full px-4 py-3 text-white z-20">
      <h2 className="text-[22px] font-semibold mb-3">{name}</h2>
      <p className="text-[14px]">{formattedDate}</p>

      <div className="flex items-center justify-between text-sm mt-1">
        <span className="text-[16px] rounded">{ageLabel}</span>
        <div className="flex gap-1">
          {languages?.map(lang => (
            flagMap[lang] && (
              <img
                key={lang}
                src={flagMap[lang]}
                alt={lang}
                className="w-5 h-5 rounded-sm"
              />
            )
          ))}
        </div>
      </div>
    </div>
  </div>
</Link>


  );
}

export default Card;
