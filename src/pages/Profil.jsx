import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/register/signup");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/register/signup");
  };

  const handleDelete = () => {
    localStorage.removeItem("user");
    toast.info("Hesab silindi.");
    navigate("/register/signup");
  };

  if (!user) return null;

  return (
    <div className="bg-[#373737]  text-white min-h-screen py-30">
     <div className="max-w-[93%] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mənim Profilim</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#515151] p-6 rounded-xl text-center">
          <img
            src="../images/my-avatar.png"
            alt="Profil"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <p className="text-sm mt-4">*.jpeg, *.jpg, *.png, *.gif — Maksimum ölçü 3.1 MB</p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Çıxış
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Hesabı Sil
            </button>
          </div>
        </div>

        <div className="bg-[#515151] p-6 rounded-xl space-y-5">
          <div>
            <label className="block mb-1 text-sm">Ad Soyad</label>
            <input
              type="text"
              value={`${user.firstName} ${user.lastName}`}
              disabled
              className="w-full p-2 rounded-xl bg-[#515151] border border-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Telefon nömrəsi</label>
            <input
              type="text"
              value={user.phone || ""}
              disabled
              className="w-full p-2 rounded-xl bg-[#515151] border border-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full p-2 rounded-xl bg-[#515151] border border-gray-400"
            />
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}

export default Profil;
