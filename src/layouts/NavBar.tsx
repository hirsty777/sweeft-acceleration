import { Link } from 'react-router-dom'
import Style from "../styles/layouts/NavBar.module.css"
import { useContext, useRef } from 'react'
import { Context } from '../context/Context'

interface NavBarI{
  displaySearch:boolean,
  handleSearch?:any,
}

function NavBar({displaySearch}:NavBarI) {
    const { history,  handleHistoryChange, handleStatusChange, onSearchWrodChange} = useContext(Context)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleKey:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.code === "Enter" && inputRef.current ){
          if(!history.includes(inputRef.current.value)) handleHistoryChange(inputRef.current.value) // if word doesnt exis in search history then store it 
          onSearchWrodChange(inputRef.current.value)
          handleStatusChange(true)
        }
    }

    const onMainPageClcik = () => {
        if(inputRef.current) inputRef.current.value = ""  // clear input field if we press home page
        handleStatusChange(false)  
    }


  return (
    <div className={Style.wrapper}>
        {displaySearch ?
          <div className={Style["search-box"]}>
            <input type="text" name='search-image' placeholder="Seacrch for images" onKeyUp={handleKey} ref={inputRef}/>
          </div>
          :
          <div className={Style["search-box"]}></div>
          }
        <div className={Style["link-box"]}>
          <Link to={"/"} onClick={() => onMainPageClcik()}>Home</Link>
          <Link to={"/history"}>History</Link>
        </div>
    </div>
  )
}

export default NavBar