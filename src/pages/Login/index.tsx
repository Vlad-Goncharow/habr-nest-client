import { LoginForm } from 'features/LoginForm'
import { Link } from 'react-router-dom'
import s from './Login.module.scss'

function Login() {
  return (
    <div className={s.wrapper}>
      <LoginForm />
      <div className={s.login}>
        <span>
          Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
