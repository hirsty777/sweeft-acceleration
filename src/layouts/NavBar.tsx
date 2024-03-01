import { Link } from 'react-router-dom'
import Style from "../styles/layouts/NavBar.module.css"
import { useRef } from 'react'

interface NavBarI{
  displaySearch:boolean,
  handleSearch?:any,
  handleMainPageLod?:any
}

function NavBar({displaySearch, handleSearch, handleMainPageLod}:NavBarI) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleKey:React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.code === "Enter" && inputRef.current && handleSearch){
          handleSearch(inputRef.current.value)
        }
    }

    const onMainPageClcik = () => {
        if(inputRef.current) inputRef.current.value = ""  // clear input field if we press home page
        handleMainPageLod()  
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
          <Link to={"/"} onClick={onMainPageClcik}>Home</Link>
          <Link to={"/history"}>History</Link>
        </div>
    </div>
  )
}

export default NavBar