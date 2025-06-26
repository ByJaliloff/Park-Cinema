
import Header from '../components/Header'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <>
    <Header />
    <main>
         <Outlet />
    </main>
    </>
  )
}

export default MainLayout