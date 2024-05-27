import EmptyIcon from 'shared/images/empty.png'
import s from './Empty.module.scss'

function Empty() {
  return (
    <div className={s.item}>
      <img src={EmptyIcon} alt="" />
      <span>Пока тут ничего нет</span>
    </div>
  )
}

export default Empty