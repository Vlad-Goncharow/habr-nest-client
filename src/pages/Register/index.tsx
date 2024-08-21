import { RegisterForm } from 'features/RegisterForm'
import { Link } from 'react-router-dom'
import s from './Register.module.scss'
import { Helmet } from 'react-helmet'

function Register() {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Регистрация — Не Хабр</title>
        <meta
          name='description'
          content='Лучшие статьи за последние 24 часа на Не Хабре'
        ></meta>
      </Helmet>
      <div className={s.wrapper}>
        <RegisterForm />
        <div className={s.register}>
          <span>
            Есть аккаунт? <Link to='/login'>Войти</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Register
