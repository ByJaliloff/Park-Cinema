import { FaInstagram, FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import logo from '../assets/logo.svg';
import visa from '../assets/Visa.svg';


function Footer() {
  return (
    <footer className="bg-[#86312a] text-white px-6 py-[32px] h-[220px]">
      <div className="max-w-[93%] mx-auto flex flex-wrap justify-between gap-8">
        
        <div className="flex flex-col gap-6 items-start">
          <img src={logo} alt="Park Cinema Logo" className="w-[140px] h-[40px]" />
          <p className="text-sm">© Park Cinema, 2025</p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-5 text-[16px] pt-2">
          <a href="#">Kinoteatrlar</a>
          <a href="#">Profil</a>
          <a href="#">Aksiyalar</a>
          <a href="#">Əlaqə</a>
          <a href="#">FAQ</a>
          <a href="#">Hüquqi Şərtlər</a>
        </div>

        <div className="flex flex-col items-left gap-5">
          <p className="text-[16px]">Bizi izləyin</p>
          <div className="flex gap-3">
            {[FaInstagram, FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok].map((Icon, i) => (
              <div key={i} className="bg-[#d6d6d6] w-10 h-10 rounded-full flex items-center justify-center text-[#e12c1f] text-xl">
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between gap-4">
          <img src={visa} alt="Visa" className="w-12" />
          <p className="text-sm">ESAM Innovations</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
