
import { useEffect, useState } from 'react'
import { UnsplashPhoto } from '../types/types'


function useGetPopularImg(currnetPage:number) {
    const [response, setResponse] = useState<[] | UnsplashPhoto[]>([])
    const [loadingPopular, setLoadingPopular] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    useEffect(() => {
        if(currnetPage === 0){
            setResponse([]) // if currentpage returns 0 it means we arenot using this hook anymore so we cleare responsedata and return
            return
        }

        const fetchData = async () => {
            setLoadingPopular(true)
            try {
                const res = await fetch(`https://api.unsplash.com/photos?order_by=popular&page=${currnetPage}&per_page=20`,{
                    headers:{
                        'Accept-Version': 'v1',
                        "Content-Type": "application/json",
                        'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
                    }
                })
                const data:any[] = await res.json()
                //sometime api returns same images(same id) and react trows error since i use them as  key, so we filter it here. might not be best aproach(if response will have to much data stored) 
                const uniqueData = data.filter(newData => !response.some(oldData => oldData.id === newData.id))   
                setResponse(prev => [...prev, ...uniqueData])
            } catch (error) {
                setError(true)
            } finally{
                setLoadingPopular(false)
            }
        }
        
        fetchData()

    },[currnetPage])

    return {response, loadingPopular, error}

}

export default useGetPopularImg