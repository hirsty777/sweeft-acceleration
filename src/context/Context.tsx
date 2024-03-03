import { createContext, useRef, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = ({children}:any) => {
    const [history, setHistory] = useState<string[] | []>([])
    const [usingSearch, setUsingSearch] = useState(false)
    const [searchWord, setSearchWord] = useState<string>('')  // text entered in input search field

    //entered search words we store here
    const handleHistoryChange = (val:string) => { 
        setHistory(prev => [...prev, val])
    }

    const handleStatusChange = (val:boolean) => {
        setUsingSearch(val)
    }

    const onSearchWrodChange = (val:string) => {
        setSearchWord(val)
    }


    return <Context.Provider value={{history, usingSearch, searchWord, handleStatusChange, handleHistoryChange, onSearchWrodChange}}>
        {children}
    </Context.Provider>
}

export default ContextProvider