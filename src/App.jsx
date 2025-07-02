import { Routes, Route, Navigate } from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Error from "./components/Error"
import Treyler from "./pages/Treyler"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<Details />} />
        </Route>
        <Route path="/treyler" element={<Treyler />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </>
  )
}

export default App