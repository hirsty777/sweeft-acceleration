import {useEffect, useRef, useState} from "react"
import NavBar from "../layouts/NavBar"
import ImagesList from "../components/ImagesList"
import Style from "../styles/pages/Main.module.css"
import useGetPopularImg from "../hooks/useGetPopularImg"
import { UnsplashPhoto } from "../types/types"


function Main() {
    const [currnetPage, setCurrentPage] = useState(1)
    const {response, loading, error} = useGetPopularImg(currnetPage)
    const [data, setData] = useState<[] | UnsplashPhoto[]>([])
    const pageRef = useRef(null)

    useEffect(() => {
        console.log("evnt")
        const handleScroll = () => {
            if(window.innerHeight+window.scrollY >= document.body.offsetHeight){
                setCurrentPage(prev => prev + 1)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
        
    },[loading])

    useEffect(()=>{
        if(response) setData(prev => [...prev, ...response])
    },[response])

    
    if(error){ 
        return <h1>something went wrong</h1>
    }

    return (
        <div className={Style.wrapper} ref={pageRef}>
            <NavBar />
            <div className={Style["images-box"]}>
                {data && data.map((imageObj) => (
                    <ImagesList key={imageObj.id} data={imageObj} />
                ))} 
            </div>
            {loading && <h1>loading...</h1>}
        </div>
    )
}

export default Main