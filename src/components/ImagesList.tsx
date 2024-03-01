import { UnsplashPhoto } from "../types/types"
import Style from "../styles/components/ImagesList.module.css"
import { useEffect, useRef, useState } from "react"


interface ImagesListI {
    data:UnsplashPhoto 
}

function ImagesList({data}:ImagesListI){
    const imageCardRef = useRef<null | HTMLDivElement>(null)
    

    useEffect(()=>{ 
        if(imageCardRef.current){
            imageCardRef.current.style.gridRow = `span ${ (Math.random()*2+1).toFixed() }`
        }
    },[])


    return (
        <div className={Style.wrapper} ref={imageCardRef}>
            <img src={data.urls.regular} alt={data.alt_description} />
        </div>
    )
}

export default ImagesList