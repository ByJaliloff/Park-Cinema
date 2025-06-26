
import { Link } from 'react-router';
import logo from '../assets/logo.svg';

function Header() {
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
                        <a href="#" className="hover:text-red-500 transition">Kinoteatrlar</a>
                        <a href="#" className="hover:text-red-500 transition">Aksiyalar</a>
                        <a href="#" className="hover:text-red-500 transition">FAQ</a>
                        <a href="#" className="hover:text-red-500 transition">Əlaqə</a>
                        <a href="#" className="hover:text-red-500 transition">Profil</a>
                    </ul>
                </nav>

                <div className="flex items-center space-x-2">
                    <span className="uppercase font-medium">AZE</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </header>
    );
}

export default Header;
