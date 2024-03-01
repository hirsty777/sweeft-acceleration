
import { useEffect, useState } from 'react'
import { UnsplashPhoto } from '../types/types'


function useGetPopularImg(currnetPage:number) {
    const [response, setResponse] = useState<[] | UnsplashPhoto[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            console.log("api call")
            setLoading(true)
            try {
                const res = await fetch(`https://api.unsplash.com/photos?order_by=popular&page=${currnetPage}&per_page=20`,{
                    headers:{
                        'Accept-Version': 'v1',
                        "Content-Type": "application/json",
                        'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
                    }
                })
                const data = await res.json()
                setLoading(false)
                setResponse(data)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
        }

        fetchData()

    },[currnetPage])

    return {response, loading, error}

}

export default useGetPopularImg