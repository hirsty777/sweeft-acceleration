import { useEffect, useRef, useState } from "react"

interface useScrollEventI {
    usingSearch:boolean,
    searchWord:string
}

function useScrollEvent({usingSearch, searchWord}:useScrollEventI) {
    const [currnetPage, setCurrentPage] = useState(1)
    const deterrentRef = useRef(false)

    useEffect(() => {
        setCurrentPage(1)

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
        
    },[usingSearch, searchWord]) // in dependency we use this 2 property to know if user is changing search or going back to mainpage after search so we start this logic from new

    return {currnetPage}
}

export default useScrollEvent