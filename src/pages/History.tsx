import { useContext } from "react"
import NavBar from "../layouts/NavBar"
import { Context } from "../context/Context"
import HistoryList from "../components/HistoryList"
import Style from "../styles/pages/History.module.css"

function History() {
  const { history } = useContext(Context)

  return (
    <div className={Style.wrapper}>
        <NavBar displaySearch={false}/>
        <div className={Style["history-box"]}>
          {history && history.map((word:any, ind:number) => (
            <HistoryList key={ind} word={word}/>
          ))}
        </div>
    </div>
  )
}

export default History