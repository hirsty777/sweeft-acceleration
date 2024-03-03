import { useEffect, useState } from "react"

interface useScrollEventI {
    usingSearch:boolean,
    searchWord:string,
    isFetching:boolean
}

function useScrollEvent({usingSearch, searchWord, isFetching}:useScrollEventI) {
    const [currnetPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
            //deterrentRef.current we use it to slow down currentpage increment(by 1sec) so when user reaches bottom new data have some time to load before user scrolls to bottom again            
            if(window.innerHeight+window.scrollY >= document.body.offsetHeight && !isFetching){
                setCurrentPage(prev => prev + 1)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
        
    },[isFetching])

    useEffect(() => {
        setCurrentPage(1) // if useeffect get recalled we start from 1 
    },[usingSearch, searchWord])


    return {currnetPage}
}

export default useScrollEvent