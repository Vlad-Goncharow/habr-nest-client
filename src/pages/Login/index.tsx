import { LoginForm } from 'features/LoginForm'
import { Link } from 'react-router-dom'
import s from './Login.module.scss'
import {Helmet} from "react-helmet";

function Login() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Вход — Не Хабр</title>
        <meta name="description" content="Лучшие статьи за последние 24 часа на Не Хабре"></meta>
      </Helmet>
      <div className={s.wrapper}>
        <LoginForm />
        <div className={s.login}>
          <span>
            Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login
