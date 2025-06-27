import { Link } from 'react-router-dom';

function Error() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
      style={{ backgroundImage: 'url(/images/404.png)' }}
    >
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Səhifə tapılmadı</p>

      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition"
      >
        Ana Səhifə
      </Link>
    </div>
  );
}

export default Error;
