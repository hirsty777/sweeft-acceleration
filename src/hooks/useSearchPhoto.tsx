import { useEffect, useRef, useState } from 'react'
import { UnsplashPhoto } from '../types/types'

interface useSearchPhotoI {
    currnetPage?:number,
    searchWord?:string
}

const customCache:any = {}

function useSearchPhoto({currnetPage, searchWord=""}:useSearchPhotoI) {
    const [searchResponse, setSearchResponse] = useState<[] | UnsplashPhoto[]>([])
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false)
    const [searchError, setsearchError] = useState<boolean>(false)
    const quryWrodRef = useRef('')

    useEffect(() => {
        if(quryWrodRef.current !== searchWord){
            quryWrodRef.current = searchWord
            setSearchResponse([])
        }
        if(quryWrodRef.current.length<=0) return

        const fetchData = async () => {
            const url = `https://api.unsplash.com/search/photos?order_by=popular&page=${currnetPage}&per_page=20&query=${quryWrodRef.current}`
            
            if(url in customCache){
                setSearchResponse(prev => [...prev, ...customCache[url]])
            }else{
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
                    const data:any = await res.json()
                    const uniqueData = data.results.filter((newData:any) => !searchResponse.some(oldData => oldData.id === newData.id))   
                    customCache[url] = uniqueData
                    setSearchResponse(prev => [...prev, ...uniqueData])
                } catch (error) {
                    setsearchError(true)
                } finally{
                    setLoadingSearch(false)
                }
            }
        }

        fetchData()

    },[currnetPage, searchWord])

    return {searchResponse, loadingSearch}
}

export default useSearchPhoto