import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userSignUp } from "../service.js/AuthService";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  function handleVal(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSignUp() {
    const { firstName, lastName, phone, email, password } = user;

    if (!firstName || !lastName || !email || !password || !phone ) {
      toast.error("Bütün xanaları doldurun");
      return;
    }

    if (password.length < 8) {
      toast.error("Şifrə minimum 8 simvol olmalıdır");
      return;
    }

    if (password2 !== password) {
      toast.error("Şifrələr uyğun deyil");
      return;
    }

    const enhUser = {
      ...user,
      role: 'user',
      createdAt: new Date().toISOString(),
      isActivate: true,
      lastLogin: null,
    };

    userSignUp(enhUser)
      .then(() => {
        toast.success("Qeydiyyat uğurludur!");
        navigate('/');
      })
      .catch(() => {
        toast.error("Xəta baş verdi");
      });
  }

  return (
    <div className="min-h-screen bg-[#373737] text-white flex flex-col px-8 py-30">
      <h2 className="text-[30px] font-semibold mb-10 text-[#d9dadb] ml-6">Qeydiyyat</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[93%] w-full mx-auto">
        <div className="space-y-5">
          <div>
            <label>Ad</label>
            <input
              onChange={handleVal}
              name="firstName"
              type="text"
              className="mt-1 w-full bg-transparent border-b border-white py-1 px-2 outline-none"
            />
          </div>
         <div>
            <label>Soyad</label>
            <input
              onChange={handleVal}
              name="lastName"
              type="text"
              className="mt-1 w-full bg-transparent border-b border-white py-1 px-2 outline-none"
            />
          </div>
          <div>
            <label>Telefon</label>
            <div className="mt-1 flex items-center gap-2 border-b border-white py-1 px-2">
              <span className="text-white">+994</span>
              <input
                onChange={handleVal}
                name="phone"
                type="tel"
                placeholder="12 345 67 89"
                className="bg-transparent w-full outline-none text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label>Elektron poçt</label>
            <input
              onChange={handleVal}
              name="email"
              type="email"
              className="mt-1 w-full bg-transparent border-b border-white py-1 px-2 outline-none"
            />
          </div>

          <div className="relative">
            <label>Şifrə</label>
            <input
              onChange={handleVal}
              name="password"
              type={showPassword ? "text" : "password"}
              className="mt-1 w-full bg-transparent border-b border-white py-1 px-2 pr-8 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[32px] cursor-pointer text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label>Şifrəni Təsdiqlə</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type={showPassword2 ? "text" : "password"}
              className="mt-1 w-full bg-transparent border-b border-white py-1 px-2 pr-8 outline-none"
            />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-2 top-[32px] cursor-pointer text-white"
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end max-w-6xl mx-auto">
        <button
          onClick={handleSignUp}
          className="bg-red-700 hover:bg-red-600 text-white py-2 px-8 rounded-full"
        >
          Qeydiyyat
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        Artıq hesabınız var?{" "}
        <Link to="/register/login" className="text-white underline">
          Giriş et
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
