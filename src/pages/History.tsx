import { useContext } from "react"
import NavBar from "../layouts/NavBar"
import { Context } from "../context/Context"
import HistoryList from "../components/HistoryList"

function History() {
  const { history } = useContext(Context)

  return (
    <div>
        <NavBar displaySearch={false}/>
        <div>
          {history && history.map((word:any, ind:number) => (
            <HistoryList key={ind} word={word}/>
          ))}
        </div>
    </div>
  )
}

export default History