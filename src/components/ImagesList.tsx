import { UnsplashPhoto } from "../types/types"
import Style from "../styles/components/ImagesList.module.css"
import { useEffect, useId, useRef, useState } from "react"
import { Blurhash} from "react-blurhash"


interface ImagesListI {
    data:UnsplashPhoto 
}


function ImagesList({data}:ImagesListI){
    const [imageIsLoaded, setImageIsLoaded] = useState(false)
    const imageCardRef = useRef<null | HTMLDivElement>(null)
    
    //so we give random span(height to grid elemnt to make it look masonry), we use useEffect to prevent span change(when parent Main gets new data and triger rerender)
    useEffect(()=>{ 
        if(imageCardRef.current){
            imageCardRef.current.style.gridRow = `span ${ (Math.random()*2+1).toFixed() }`
        }
    },[])

    const shoModal = () => {
        
    }
    
    const handleImaleLoaded = () => {
        setImageIsLoaded(true)
    }

    return (
        <div className={Style.wrapper} ref={imageCardRef}>
            {!imageIsLoaded && <Blurhash hash={data.blur_hash} width="100%" height="100%" resolutionX={62} resolutionY={62} punch={1} />}
            <img 
                src={data.urls.regular} 
                alt={data.alt_description} 
                onLoad={handleImaleLoaded} 
                style={{visibility:`${imageIsLoaded? "visible" : "hidden"}`}}
                onClick={shoModal}/>
        </div>
    )
}

export default ImagesList