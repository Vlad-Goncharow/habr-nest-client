import { LoginForm } from 'features/LoginForm'
import { Link } from 'react-router-dom'
import s from './Login.module.scss'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

function Login() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {t('login')} — {t('siteTitle')}
        </title>
      </Helmet>
      <div className={s.wrapper}>
        <LoginForm />
        <div className={s.login}>
          <span>
            {t('registerEmpty')} <Link to='/register'>{t('register')}</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login
