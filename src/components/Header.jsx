import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    code: 'AZE',
    icon: '/icons/azerbaijan.png'
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const languages = [
    { code: 'AZE', icon: '/icons/azerbaijan.png' },
    { code: 'ENG', icon: '/icons/united-kingdom.png' },
    { code: 'RUS', icon: '/icons/russia.png' }
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); 
  }, []);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    console.log("Seçilen dil:", lang.code);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profil");
    } else {
      navigate("/register/signup");
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
      <div className="max-w-[93%] mx-auto h-[85px] flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-[150px] h-[80px]" />
          </Link>
        </div>

        <nav className="hidden md:flex font-medium">
          <ul className="flex items-center gap-[40px]">
            <li>
              <Link to="/kinoteatrlar" className="hover:text-red-500 transition">
                Kinoteatrlar
              </Link>
            </li>
            <li>
              <Link to="/aksiyalar" className="hover:text-red-500 transition">
                Aksiyalar
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-red-500 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/elaqe" className="hover:text-red-500 transition">
                Əlaqə
              </Link>
            </li>
            <li>
              <button
                onClick={handleProfileClick}
                className="hover:text-red-500 transition"
              >
                Profil
              </button>
            </li>
          </ul>
        </nav>

        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img className="w-5 h-5 rounded-sm" src={selectedLang.icon} alt={selectedLang.code} />
            <span className="uppercase font-medium text-[14px]">{selectedLang.code}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-50">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex justify-center items-center px-5 py-3 gap-2 bg-[#DBD9D9] cursor-pointer"
                  onClick={() => handleSelect(lang)}
                >
                  <img src={lang.icon} className="w-5 h-5 mr-2 rounded-sm" alt={lang.code} />
                  <span className="uppercase text-[16px]">{lang.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
