import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../service.js/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Xanaları doldurun");
      return;
    }

    userLogin({ email, password })
      .then((res) => {
        toast.success("Giriş uğurludur!");
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      })
      .catch((err) => {
        toast.error("Email və ya şifrə yalnışdır");
      });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-30 lg:px-8 bg-[#373737]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Giriş
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Elektron poçt
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Şifrə
            </label>
            <div className="mt-2 relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-white hover:underline">
                Şifrəni unutmusunuz?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              type="button"
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Giriş
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-300">
          Burada yenisiniz?{" "}
          <Link
            to="/register/signup"
            className="font-semibold text-white underline"
          >
            Qeydiyyatdan keçin
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
