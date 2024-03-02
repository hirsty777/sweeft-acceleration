import {useContext, useEffect, useRef, useState} from "react"
import NavBar from "../layouts/NavBar"
import ImagesList from "../components/ImagesList"
import Style from "../styles/pages/Main.module.css"
import useGetPopularImg from "../hooks/useGetPopularImg"
import { UnsplashPhoto } from "../types/types"
import useSearchPhoto from "../hooks/useSearchPhoto"
import useScrollEvent from "../hooks/useScrollEvent"
import Loader from "../layouts/Loader"
import { Context } from "../context/Context"


function Main() {
    const { usingSearch, searchWord, handleStatusChange, onSearchWrodChange } = useContext(Context)
    const {currnetPage} = useScrollEvent({usingSearch,  searchWord}) //this properties customhook uses for dependency(so if they change we set currentpage to 1)

    const {response, loadingPopular, error} = useGetPopularImg(usingSearch === false ? currnetPage : 0)
    const {searchResponse, loadingSearch} = useSearchPhoto(usingSearch === true ? {currnetPage, searchWord} : {})

    const [data, setData] = useState<[] | UnsplashPhoto[]>([])
    const pageRef = useRef(null)

    useEffect(()=>{
        if(response) setData(() => [...response])
    },[response])

    useEffect(()=>{
        if(searchResponse) setData(() => [...searchResponse])
    },[searchResponse])

    if(error){ 
        return <h1>something went wrong</h1>
    }
    
    return (
        <div className={Style.wrapper} ref={pageRef}>
            <NavBar displaySearch={true} />
            <div className={Style["images-box"]}>
                {data && data.map((imageObj) => (
                    <ImagesList key={imageObj.id} data={imageObj} />
                ))}
            </div>
            {(loadingPopular || loadingSearch)  && <Loader />} {/*if any of loading state(from popularimages fetch or searchedimages fetch) is true we shod loader*/}
        </div>
    )
}

export default Main