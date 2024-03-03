import { UnsplashPhoto } from "../types/types"
import Style from "../styles/components/ImagesList.module.css"
import { useEffect, useRef, useState } from "react"
import { Blurhash} from "react-blurhash"
import View from "../assets/view.svg"
import like from "../assets/like.svg"
import download from "../assets/download.svg"
import ModalLOader from "../layouts/ModalLOader"


interface ImagesListI {
    data:UnsplashPhoto 
}

interface statsI {
    view:number
    likes:number,
    downloads:number,
}

function ImagesList({data}:ImagesListI){
    const [imageIsLoaded, setImageIsLoaded] = useState(false)
    const [modalImgLoaded, setModalImgLoaded] = useState(false)
    const [imageStats, setImageStats] = useState <null | statsI>(null)
    const [isLoading, setIsloading] = useState(false)
    const imageCardRef = useRef<null | HTMLDivElement>(null)
    const modalBoxRef = useRef<null | HTMLDivElement>(null)
    
    //so we give random span(height to grid elemnt to make it look masonry), we use useEffect to prevent span change(when parent Main gets new data and triger rerender)
    useEffect(()=>{ 
        if(imageCardRef.current){
            imageCardRef.current.style.gridRow = `span ${ (Math.random()*2+1).toFixed() }`
        }
    },[])
    
    const shoModal =  () => {
        if(isLoading) return

        setIsloading(true)
         fetch(`https://api.unsplash.com/photos/${data.id}/statistics?&quantity=1`,{
            headers:{
                'Accept-Version': 'v1',
                "Content-Type": "application/json",
                'Authorization': 'Client-ID yKccNFh-g4wyhVcH6MKCdkQfGufBadM8s82fQw2UJDM'
            }
        })
        .then(res => res.json())
        .then((data):any => setImageStats({view:data.views.total, likes:data.likes.total, downloads:data.downloads.total}))
        .catch(err => console.log(err))
        .finally(()=> setIsloading(false))
    }
    
    const handleImaleLoaded = () => {
        setImageIsLoaded(true)
    }

    const onModalImgLoaded = () => {
        setModalImgLoaded(true)
    }

    return (
        <div className={Style.wrapper} ref={imageCardRef}>
            {!imageIsLoaded && <Blurhash hash={data.blur_hash} width="100%" height="100%" resolutionX={62} resolutionY={62} punch={1} />}
            <img 
            className={Style["list-image"]}
                src={data.urls.regular} 
                alt={data.alt_description} 
                onLoad={handleImaleLoaded} 
                style={{visibility:`${imageIsLoaded? "visible" : "hidden"}`}}
                onClick={shoModal}
            />
            {imageStats && <div className={Style["modal-box"]} ref={modalBoxRef} onClick={() => setImageStats(null)}>
                                {!modalImgLoaded && <ModalLOader />}
                                <img src={data.urls.full} 
                                    alt={data.description}  
                                    className={Style["modal-box-image"]} 
                                    onLoad={onModalImgLoaded}  
                                    style={{visibility:`${modalImgLoaded? "visible" : "hidden"}`}}
                                />
                                <div className={Style["stats-box"]}>
                                    <div className={Style["stats"]}> 
                                        <img src={View} alt="view icon" width={35} height={35}/>
                                        <span>{imageStats.view.toLocaleString()}</span>
                                    </div>
                                    <div className={Style["stats"]}>
                                        <img src={like} alt="like icon" width={35} height={35}/>
                                        <span>{imageStats.likes.toLocaleString()}</span>
                                    </div>
                                    <div className={Style["stats"]}>
                                        <img src={download} alt="download icon" width={35} height={35}/>
                                        <span>{imageStats.downloads.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
            }
        </div>
    )
}

export default ImagesList