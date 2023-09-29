import React, { useEffect, useState } from "react"

export const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const [isError, setIsError] = useState({ show: false, msg: " " })
    const [query, setQuery] = useState("avengers")

    const getMovies = async(url) => {
        setIsLoading(true)
        
        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)

            if(data.Response === "True")
            {
                setIsLoading(false)
                setIsError({
                    show: false,
                    msg: ""
                })
                setMovie(data.Search)
            }
            else
            {
                setIsError({
                    show: true,
                    msg: data.Error
                })
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`)
        }, 800)

        return () => clearTimeout(timerOut)
    }, [query])


    return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return React.useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
