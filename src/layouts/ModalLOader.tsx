import Style from "../styles/layouts/ModalLOader.module.css"


function ModalLOader() {

  return (
    <div className={Style.wrapper}>
        <div className={Style.loader}></div>
    </div>
  )
}

export default  ModalLOader