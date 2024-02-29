import { UnsplashPhoto } from "../types/types"

interface ImagesListI {
    data:UnsplashPhoto 
}

function ImagesList({data}:ImagesListI){
    console.log(data)
    return (
        <div>
            
        </div>
    )
}

export default ImagesList