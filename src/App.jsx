import { Routes, Route } from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Error from "./components/Error"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>

    </>
  )
}

export default App