import React, { createContext, useEffect, useState } from 'react'
import { getAllMovies } from '../service.js/MovieService'

export const MovieContext = createContext()

function DataContext({ children}) {

    const [ data, setData ] = useState([])
    const [ error, setError ] = useState(null)
    const [ loader, setLoader ] = useState(true)

    useEffect(() => {
        getAllMovies()
        .then(item => {
            setData(item)
    })
    .catch (err => setError(err))
    .finally (() =>setLoader(false))
    }, [])

    const obj = {
        data, error, loader
    }

  return (
    <>
    <MovieContext.Provider value={obj}>
        {children}
    </MovieContext.Provider>
    </>
  )
}

export default DataContext