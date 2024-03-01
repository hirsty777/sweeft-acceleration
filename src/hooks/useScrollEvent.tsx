import { useEffect, useRef, useState } from "react"


function useScrollEvent() {
    const [currnetPage, setCurrentPage] = useState(1)
    const deterrentRef = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            //deterrentRef.current we use it to slow down currentpage increment(by 1sec) so when user reaches bottom new data have some time to load before user scrolls to bottom again
            if(deterrentRef.current === true) return
            
            if(window.innerHeight+window.scrollY >= document.body.offsetHeight){
                setCurrentPage(prev => prev + 1)
                deterrentRef.current = true

                setTimeout(()=>{
                    deterrentRef.current = false
                },1000)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
        
    },[])

    return {currnetPage}
}

export default useScrollEvent