import { UnsplashPhoto } from "../types/types"
import Style from "../styles/components/ImagesList.module.css"


interface ImagesListI {
    data:UnsplashPhoto 
}

function ImagesList({data}:ImagesListI){

    return (
        <div className={Style.wrapper}>
            <img src={data.urls.regular} alt={data.alt_description} />
        </div>
    )
}

export default ImagesList