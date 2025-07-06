import { useContext, useState } from "react";
import { MovieContext } from "../context/DataContext";
import { createNewMovie, deleteMovie, editMovie } from "../service.js/MovieService";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';

function Admin() {
  const { data, setData, loader } = useContext(MovieContext);
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    name: "",
    image: "",
    languages: [],
    description: "",
    year: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Əminsiniz?",
    text: "Bu film silinəcək!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Bəli, sil!",
    cancelButtonText: "Xeyr"
  });

  if (result.isConfirmed) {
    try {
      await deleteMovie(id);
      setData(data.filter(item => item.id !== id));
      Swal.fire("Silindi!", "Film uğurla silindi.", "success");
    } catch (err) {
      Swal.fire("Xəta!", "Silinmə zamanı xəta baş verdi!", "error");
    }
  }
};

const handleEdit = (movie) => {
  setEditMode(true);
  setEditId(movie.id);
  setNewMovie({
    name: movie.name,
    image: movie.image,
    languages: movie.languages,
    description: movie.description,
    year: movie.year,
  });
  setShowModal(true);
};



const handleAddMovie = async () => {
  try {
    if (editMode) {
      const result = await editMovie(editId, newMovie);
      setData(prev => prev.map(m => (m.id === editId ? result : m)));
      Swal.fire("Uğurlu!", "Film redaktə edildi!", "success");
    } else {
      const result = await createNewMovie(newMovie);
      setData(prev => [...prev, result]);
      Swal.fire("Uğurlu!", "Yeni film əlavə edildi!", "success");
    }

    setShowModal(false);
    setNewMovie({ name: "", image: "", languages: [], description: "", year: "" });
    setEditMode(false);
    setEditId(null);

  } catch (error) {
    Swal.fire("Xəta!", "Əməliyyat zamanı xəta baş verdi!", "error");
    console.error("Xəta:", error);
  }
};



  if (loader) {
    return <Loader />;
  }

 return (
    <div className="p-6 bg-[#2E2E2E] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-semibold">Filmlər Siyahısı</h2>
        <button
              onClick={() => {
                setEditMode(false);
                  setNewMovie({
                  name: "",
                  image: "",
                  languages: [],
                  description: "",
                  year: ""
                     });
                setShowModal(true);}}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                    >
                   Əlavə et
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-[#3A3A3A] text-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">
                   {editMode ? "Filmi redaktə et" : "Yeni film əlavə et"}
           </h3>
            <input
              type="text"
              name="name"
              placeholder="Ad"
              value={newMovie.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            <input
              type="text"
              name="image"
              placeholder="Şəkil linki"
              value={newMovie.image}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            <input
              type="text"
              name="languages"
              placeholder="Dil (məs: AZ, RU)"
              value={newMovie.languages}
              onChange={(e) =>
                setNewMovie({ ...newMovie, languages: e.target.value.split(',') })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            <textarea
              name="description"
              placeholder="Açıqlama"
              value={newMovie.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows={3}
            />

            <input
              type="number"
              name="year"
              placeholder="İl"
              value={newMovie.year}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400"
              >
                Bağla
              </button>
              <button
                onClick={handleAddMovie}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
              >
                Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-[#444] text-gray-200">
            <tr>
              <th className="px-6 py-3">Ad</th>
              <th className="px-6 py-3">Şəkil</th>
              <th className="px-6 py-3">Dil</th>
              <th className="px-6 py-3">Açıqlama</th>
              <th className="px-6 py-3">İl</th>
              <th className="px-6 py-3 text-right">Əməliyyat</th>
            </tr>
          </thead>

          <tbody className="bg-[#3A3A3A] divide-y divide-gray-600">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-[#4A4A4A]">
                <td className="px-6 py-4 font-medium text-white">{item.name}</td>

                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-28 object-cover rounded"
                  />
                </td>

                <td className="px-6 py-4">
                  {item.languages?.map((lang, i) => (
                    <span key={i} className="mr-1 bg-gray-700 text-white px-2 py-1 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </td>

                <td className="px-6 py-4 text-sm">
                  {item.description ? item.description.slice(0, 150) + "..." : "Yoxdur"}
                </td>

                <td className="px-6 py-4">{item.year}</td>

                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded text-sm font-semibold">
                    Edit
                  </button>
                  <button  onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
