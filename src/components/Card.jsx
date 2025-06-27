import { useState, useRef, useEffect } from 'react';
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

function Modal({ data, onClose }) {
  if (!data) return null;

  const handleContentClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <>

      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />


      <div
        className="fixed inset-0 flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-[#353535] rounded-lg max-w-[33vw] w-full flex gap-6 p-6 relative"
          onClick={handleContentClick}
        >

          <img
            src={data.image}
            alt={data.name}
            className="w-1/2 object-cover rounded-lg"
          />


          <div className="flex flex-col justify-between w-1/2 text-[16px] text-[#d9dadb]">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">{data.name}</h2>

              <div className="flex items-center gap-2">
                <span className="text-[16px]">
                  {ageMap[data.ageLimit] || data.ageLimit}
                </span>
                <div className="flex gap-1">
                  {data.languages?.map((lang) =>
                    flagMap[lang] ? (
                      <img
                        key={lang}
                        src={flagMap[lang]}
                        alt={lang}
                        className="w-6 h-6 rounded-sm"
                      />
                    ) : null
                  )}
                </div>
              </div>

              <p><strong>Dəhşət</strong></p>
              <p>Nümayiş Tarixi: {format(new Date(data.firstScreeningDate), 'dd.MM.yyyy')}</p>
              <p>Rejissor: {data.director || 'Naməlum'}</p>
              <p>Ölkə: {data.country || 'Naməlum'}</p>
            </div>

            <button className="mt-6 bg-[#d52b1e] text-white py-2 rounded-3xl">
              Satın Al
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ id, name, image, firstScreeningDate, ageLimit, languages, director, country }) {
  const date = new Date(firstScreeningDate);
  const formattedDate = format(date, 'dd.MM.yyyy');
  const ageLabel = ageMap[ageLimit] || ageLimit;

  const [modalVisible, setModalVisible] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setModalVisible(true);
    }, 10000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
  };

  const closeModal = () => {
    setModalVisible(false);
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalVisible]);

  return (
    <>
      <div
        className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          draggable={false}
        />

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

        <div className="absolute bottom-0 left-0 w-full px-4 py-3 text-white z-20">
          <h2 className="text-[22px] font-semibold mb-3">{name}</h2>
          <p className="text-[14px]">{formattedDate}</p>

          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-[16px] rounded">{ageLabel}</span>
            <div className="flex gap-1">
              {languages?.map((lang) =>
                flagMap[lang] ? (
                  <img
                    key={lang}
                    src={flagMap[lang]}
                    alt={lang}
                    className="w-5 h-5 rounded-sm"
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <Modal
          data={{ id, name, image, firstScreeningDate, ageLimit, languages, director, country }}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default Card;
