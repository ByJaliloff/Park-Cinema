import { useContext } from 'react'
import { MovieContext } from '../context/DataContext'
import Card from '../components/Card'
import Loader from '../components/Loader'
import Slider from '../components/Slider'

function Home() {

  const { data, loader, error } = useContext(MovieContext)

  if (loader) { return <Loader /> }

  return (
    <>
      <Slider />
      <div className="bg-[#373737] py-10">
        <div className='max-w-[93%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 p-6 pt-10'>
          {
            data.map(item => <Card key={item.id} {...item} />)
          }
        </div>
      </div>
    </>
  )
}

export default Home