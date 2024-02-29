import { Link } from 'react-router-dom'
import Style from "../styles/layouts/NavBar.module.css"

function NavBar() {

  return (
    <div className={Style.wrapper}>
        <Link to={"/"}>Home</Link>
        <Link to={"/history"}>History</Link>
    </div>
  )
}

export default NavBar