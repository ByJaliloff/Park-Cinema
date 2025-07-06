import { FaClock, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { PiMapPinBold } from 'react-icons/pi';
import { BsWhatsapp } from 'react-icons/bs';

const cinemas = [
  {
    title: "Park Bulvar",
    time: "10:00 - 01:00",
    address: "Neftçilər pr-ti 78, Park Bulvar Əyləncə Mərkəzi, 4-cü mərtəbə",
  },
  {
    title: "Metro Park",
    time: "10:00 - 01:00",
    address: "Təbriz küç., 44, Metro Park AVM, 6-cı mərtəbə",
  },
  {
    title: "Flame Towers",
    time: "10:00 - 01:00",
    address: "M. Hüseyn küç., 1 A, Alov qüllələri kompleksi",
  },
  {
    title: "Sevinc Mall",
    time: "10:00 - 01:00",
    address: "Nizami rayonu, 8-ci kilometr kəndi, Tofiq Abbasov küçəsi, 5",
  },
  {
    title: "Shahdag",
    time: "10:00 - 01:00",
    address: "Qusar r., Laza k., Şahdağ Turistik Kompleksi",
  },
];

function Contact() {
  return (
    <div className="bg-[#373737] text-white py-30 px-4">
      <div className="max-w-[93%] mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-[#d9dadb]">Əlaqə</h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {cinemas.map((item, index) => (
            <div key={index} className="bg-[#4D4D4D] p-4 rounded-lg space-y-2 text-[#d9dadb]">
              <h3 className="text-left font-semibold text-[18px] mt-4 mb-6">{item.title}</h3>
              <p className="flex items-center gap-2 text-[16px] font-semibold">
                <FaClock className='w-5 h-5'/> {item.time}
              </p>
              <p className="flex items-start gap-2 text-[16px] font-semibold">
                <PiMapPinBold className="mt-1 w-5 h-5" />
                {item.address}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-[#d9dadb]">
          <div>
            <h4 className="font-semibold text-[18px] mb-5">Bilet sifarişi üçün</h4>
            <p className="flex items-center mb-5 gap-2 text-[16px]"><FaPhoneAlt /> +994 12 598 74 14</p>
            <p className="flex items-center mb-5 gap-2 text-[16px]"><FaPhoneAlt /> 119</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5">Kinoda reklam yerləşdirmək üçün</h4>
            <p className="flex items-center mb-5 gap-2 text-sm"><FaPhoneAlt /> +994 70 780 00 23</p>
            <p className="flex items-center mb-5 gap-2 text-sm"><FaPhoneAlt /> +994 50 255 20 23</p>
            <p className="flex items-center mb-5 gap-2 text-sm"><FaEnvelope /> uzeyir@parkcinema.az</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-5">Texniki dəstək</h4>
            <p className="flex items-center mb-5 gap-2 text-sm"><BsWhatsapp /> +994 51 570 05 52</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
