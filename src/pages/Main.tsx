import {useEffect, useRef, useState} from "react"
import NavBar from "../layouts/NavBar"
import ImagesList from "../components/ImagesList"
import Style from "../styles/pages/Main.module.css"
import useGetPopularImg from "../hooks/useGetPopularImg"


function Main() {
    const [currnetPage, setCurrentPage] = useState(1)
    const {response, loading, error} = useGetPopularImg(currnetPage)
    const pageRef = useRef(null)
    const obsElRef = useRef(null)

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

    
    if(loading){ 
        return <h1>loading..</h1>
    }
    
    if(error){ 
        return <h1>something went wrong</h1>
    }

    return (
        <div className={Style.wrapper} ref={pageRef}>
            <NavBar />
            <div className={Style["images-box"]}>
                {response && response.map((imageObj) => (
                    <ImagesList key={imageObj.id} data={imageObj} />
                ))} 
            </div>
            <div className={Style["observer-elemnt"]} ref={obsElRef}></div>
        </div>
    )
}

export default Main