import { RegisterForm } from 'features/RegisterForm'
import { Link } from 'react-router-dom'
import s from './Register.module.scss'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

function Register() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {t('register')} — {t('siteTitle')}
        </title>
      </Helmet>
      <div className={s.wrapper}>
        <RegisterForm />
        <div className={s.register}>
          <span>
            {t('loginHaveAccount')} <Link to='/login'>{t('login')}</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Register
