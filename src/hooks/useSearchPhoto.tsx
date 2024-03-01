
import { useEffect, useRef, useState } from 'react'
import { UnsplashPhoto } from '../types/types'

interface useSearchPhotoI {
    currnetPage?:number,
    searchRes?:string
}

function useSearchPhoto({currnetPage=1, searchRes=""}:useSearchPhotoI) {
    const [searchResponse, setSearchResponse] = useState<[] | UnsplashPhoto[]>([])
    const [searchError, setsearchError] = useState<boolean>(false)
    const quryWrodRef = useRef('')

    useEffect(() => {
        if(quryWrodRef.current !== searchRes){
            quryWrodRef.current = searchRes
            setSearchResponse([])
        }
        if(quryWrodRef.current.length<=0) return

        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.unsplash.com/search/photos?order_by=popular&page=${currnetPage}&per_page=20&query=${quryWrodRef.current}`,{
                    headers:{
                        'Accept-Version': 'v1',
                        "Content-Type": "application/json",
                        'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
                    }
                })
                const data = await res.json()
                setSearchResponse(prev => [...prev, ...data.results])
            } catch (error) {
                setsearchError(true)
            }
        }

        fetchData()

    },[currnetPage, searchRes])

    return {searchResponse}
}

export default useSearchPhoto