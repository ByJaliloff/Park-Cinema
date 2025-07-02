import { useContext } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { MovieContext } from '../context/DataContext'

function MainLayout() {
  const { loader } = useContext(MovieContext)
  return (
    <>
    <Header />
    <main>
        {loader ? <Loader /> : <Outlet />}
    </main>
    <Footer />
    </>
  )
}

export default MainLayout