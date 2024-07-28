import { RegisterForm } from 'features/RegisterForm'
import { Link } from 'react-router-dom'
import s from './Register.module.scss'

function Register() {
  return (
    <div className={s.wrapper}>
      <RegisterForm />
      <div className={s.login}>
        <span>
          Есть аккаунт? <Link to='/login'>Войти</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
