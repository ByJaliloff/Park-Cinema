import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";

const theatres = [
  {
    id: 1,
    name: "Park Bulvar",
    image: "/images/parkbulvar.webp",
    time: "10:00 - 01:00",
    address: "Neftçilər pr-ti 78, Park Bulvar Əyləncə Mərkəzi, 4-cü mərtəbə",
    phone: "+994 12 598 74 14, 119",
    description: "Şəbəkənin birinci ən məşhur kinoteatrı dünya kinostudiyaları və «Universal Pictures»"
  },
  {
    id: 2,
    name: "Metro Park",
    image: "/images/metropark.webp",
    time: "10:00 - 01:00",
    address: "Təbriz küç., 44, Metro Park AVM, 6-cı mərtəbə",
    phone: "(+994 12) 598 74 14, 119",
    description: "Şəbəkənin ən tutumlu, rahat mühitli kinoteatrı Nərimanov metro stansiyasının yaxınlığında"
  },
  {
    id: 3,
    name: "Flame Towers",
    image: "/images/flametowers.webp",
    time: "10:00 - 01:00",
    address: "M. Hüseyn küç., 1 A, Alov qüllələri kompleksi",
    phone: "(+994 12) 598 74 14, 119",
    description: "Ənənəvi komfort və lüks atmosferi birləşdirən yüksək səviyyəli kinoteatr Bakı şəhərin"
  },
  {
    id: 4,
    name: "Sevinc Mall",
    image: "/images/flametowers.webp",
    time: "10:00 - 01:00",
    address: "Nizami rayonu, 8-ci kilometr kəndi, Tofiq Abbasov küçəsi, 5",
    phone: "(+994 12) 598 74 14, 119",
    description: "Qara Qarayev mst. yanında yerləşən, tıxacsız, rahat, geniş yaşayış ərazisində təzə tikilmiş Sevinc M"
  },
  {
    id: 5,
    name: "Sevinc Mall",
    image: "/images/flametowers.webp",
    time: "10:00 - 01:00",
    address: "Qusar r., Laza k., Şahdağ Turistik Kompleksi",
    phone: "(+994 12) 598 74 14, 119",
    description: "Sahdag Turizm Mərkəzində yeni filmləri izləməkdən həzz almaq üçün əla imkan"
  }
];

function Kinoteatrlar() {
  return (
    <div className="bg-[#373737] min-h-screen py-30 px-6 text-[#d9dadb]">
      <div className="max-w-[93%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {theatres.map(theatre => (
          <div key={theatre.id} className="bg-[#4b4b4b] rounded-2xl overflow-hidden shadow-md px-3 py-4">
            <img
              src={theatre.image}
              alt={theatre.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-[18px] font-semibold">{theatre.name}</h3>

              <div className="flex items-center text-[16px] text-gray-300 gap-2">
                <FiClock className="w-4 h-4" />
                {theatre.time}
              </div>

              <div className="flex items-center text-[16px] text-gray-300 gap-2">
                <FiMapPin className="w-4 h-4" />
                {theatre.address}
              </div>

              <div className="flex items-center text-[16px] text-gray-300 gap-2">
                <FiPhone className="w-4 h-4" />
                {theatre.phone}
              </div>

              <p className="text-[18px] text-gray-200 pt-2">{theatre.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kinoteatrlar;
