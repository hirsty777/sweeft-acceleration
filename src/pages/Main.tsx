import { useCallback, useEffect, useState } from "react"
import NavBar from "../layouts/NavBar"
import ImagesList from "../components/ImagesList"
import { UnsplashPhoto } from "../types/types"

function Main() {
    const [imagesData, setImagesData] = useState<[] | UnsplashPhoto[]>([])

    //temporary fix to avoid api call limit
    useEffect(() => {
        fetchedData()
    }, [])
    //temporary fix to avoid api call limit
    const fetchedData = useCallback(async ()=>{
            try {
                const res = await fetch(`https://api.unsplash.com/photos?order_by=popular`,{
                    headers:{
                        'Accept-Version': 'v1',
                        // "Content-Type": "application/json",
                        'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
                    }
                })
                const data = await res.json()
                setImagesData(data)
            } catch (error) {
                console.log(error)
            }
    },[])
    
    return (
        <div>
            <NavBar />
            {imagesData.map((imageObj) => (
                <ImagesList key={imageObj.id} data={imageObj} />
            ))} 
        </div>
    )
}

export default Main