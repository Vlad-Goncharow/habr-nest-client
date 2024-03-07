import React from 'react'
import s from './Pagination.module.scss'
import Empty from 'shared/images/empty.png'

function EmptyPosts() {
  return (
    <div className={s.item}>
      <img src={Empty} alt="" />
      <span>Пока тут ничего нет</span>
    </div>
  )
}

export default EmptyPosts