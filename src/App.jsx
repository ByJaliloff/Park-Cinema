import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Error from "./components/Error"
import Treyler from "./pages/Treyler"
import BuyTicket from "./pages/BuyTicket"
import AdminLayout from "./layout/AdminLayout"
import Admin from "./pages/Admin"
import Contact from "./pages/Contact"
import Faq from "./pages/Faq"
import Aksiyalar from "./pages/Aksiyalar"
import Kinoteatrlar from "./pages/Kinoteatrlar"
import RegisterLayout from "./layout/RegisterLayout"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login";
import Profil from "./pages/Profil";



function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<Details />} />
          <Route path="buy-ticket/:sessionId" element={<BuyTicket />} />
          <Route path="faq" element={<Faq />} />
          <Route path="elaqe" element={<Contact />} />
          <Route path="aksiyalar" element={<Aksiyalar />} />
          <Route path="kinoteatrlar" element={<Kinoteatrlar />} />
          <Route path="profil" element={<Profil />} />
        </Route>

        <Route path="/treyler" element={<Treyler />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<Admin />} />
        </Route>

        <Route path="/register" element={<RegisterLayout />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        </Route>
      </Routes>

    </>
  )
}

export default App