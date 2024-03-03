import { useContext } from "react"
import { Context } from "../context/Context"
import { useNavigate } from "react-router-dom"

function HistoryList({word}:any){
    const {handleStatusChange, onSearchWrodChange} = useContext(Context)
    const navigate = useNavigate();



    const handleClick = () => {
        onSearchWrodChange(word)
        handleStatusChange(true)
        navigate("/")
    }

    return (
        <div onClick={handleClick}>
            {word}
        </div>
    )
}

export default HistoryList