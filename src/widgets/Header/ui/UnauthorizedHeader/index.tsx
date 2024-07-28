import React from 'react'
import s from './UnauthorizedHeader.module.scss'
import { Link } from 'react-router-dom'

function UnauthorizedHeader() {
  return (
    <Link to='/login' type='button' className={s.btn}>
      Войти
    </Link>
  )
}

export default UnauthorizedHeader
