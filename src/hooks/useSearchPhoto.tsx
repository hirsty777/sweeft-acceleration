import { useEffect, useRef, useState } from 'react'
import { UnsplashPhoto } from '../types/types'

interface useSearchPhotoI {
    currnetPage?:number,
    searchWord?:string
}

const customCache:any = {}

function useSearchPhoto({currnetPage=1, searchWord=""}:useSearchPhotoI) {
    const [searchResponse, setSearchResponse] = useState<[] | UnsplashPhoto[]>([])
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false)
    const [searchError, setsearchError] = useState<boolean>(false)
    const quryWrodRef = useRef('')

    console.log(customCache)
    useEffect(() => {
        if(quryWrodRef.current !== searchWord){
            quryWrodRef.current = searchWord
            setSearchResponse([])
        }
        if(quryWrodRef.current.length<=0) return

        const fetchData = async () => {
            const url = `https://api.unsplash.com/search/photos?order_by=popular&page=${currnetPage}&per_page=20&query=${quryWrodRef.current}`
            
            if(url in customCache){
                return setSearchResponse(customCache[url])
            }

            setLoadingSearch(true)
            try {
                const res = await fetch(url,{
                    headers:{
                        'Accept-Version': 'v1',
                        "Content-Type": "application/json",
                        'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
                    }
                })
                console.log("api call")
                const data = await res.json()
                customCache[url] = data.results
                setLoadingSearch(false)
                setSearchResponse(prev => [...prev, ...data.results])
            } catch (error) {
                setLoadingSearch(false)
                setsearchError(true)
            }
        }

        fetchData()

    },[currnetPage, searchWord])

    return {searchResponse, loadingSearch}
}

export default useSearchPhoto