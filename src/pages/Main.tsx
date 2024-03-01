import {useEffect, useRef, useState} from "react"
import NavBar from "../layouts/NavBar"
import ImagesList from "../components/ImagesList"
import Style from "../styles/pages/Main.module.css"
import useGetPopularImg from "../hooks/useGetPopularImg"
import { UnsplashPhoto } from "../types/types"
import useSearchPhoto from "../hooks/useSearchPhoto"
import useScrollEvent from "../hooks/useScrollEvent"
import Loader from "../layouts/Loader"


function Main() {
    const [activePage, setActivePage] = useState("main")
    const {currnetPage} = useScrollEvent()
    const [searchRes, setSearchRes] = useState<string>('')

    const {response, loading, error} = useGetPopularImg(activePage === "main" ? currnetPage : 0)
    const {searchResponse} = useSearchPhoto(activePage === "search" ? {currnetPage,searchRes} : {})

    const [data, setData] = useState<[] | UnsplashPhoto[]>([])
    const pageRef = useRef(null)

    console.log("main page render")
    useEffect(()=>{
        if(response) setData(() => [...response])
        
    },[response])

    useEffect(()=>{
        if(searchResponse) setData(() => [...searchResponse])
        
    },[searchResponse])

    const handleSearchResult = (value:string) => {
        setActivePage("search")
        setSearchRes(value)
    }

    const handleMainPageLod = () => {
        setActivePage("main")
    }

    
    if(error){ 
        return <h1>something went wrong</h1>
    }

    return (
        <div className={Style.wrapper} ref={pageRef}>
            <NavBar displaySearch={true} handleSearch={handleSearchResult} handleMainPageLod={handleMainPageLod}/>
            <div className={Style["images-box"]}>
                {data && data.map((imageObj) => (
                    <ImagesList key={imageObj.id} data={imageObj} />
                ))} 
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default Main