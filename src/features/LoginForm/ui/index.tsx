import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { FormLogin } from 'entities/User'
import i18next from 'i18next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import UseLogin from '../model/lib'
import s from './LoginForm.module.scss'

function LoginForm() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const { data, isSuccess, error, loginSubmit } = UseLogin()

  React.useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', data.accessToken)
      navigate('/flows/all/articles/1')
    }

    if (!isSuccess && error) {
      if (error.message === 'Данная почта не зарегистрирована') {
        setError(error.param, { message: t('emailNotRegistered') })
      }
      if (error.message === 'Неверный пароль') {
        setError(error.param, { message: t('wrongPassword') })
      }

      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('loginError'),
        })
      )
      return
    }
  }, [data, isSuccess, error])

  return (
    <form action='' className={s.form}>
      <h1 className={s.form__title}>{t('loginTitle')}</h1>
      <div className={s.form__item}>
        <label htmlFor='' className={s.form__label}>
          E-mail
        </label>
        {errors?.email && <span>{errors?.email.message}</span>}
        <input
          type='text'
          className={s.form__input}
          {...register('email', {
            required: t('emailRequired'),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t('emailRequiredValidate'),
            },
          })}
        />
      </div>
      <div className={s.form__item}>
        <label htmlFor='' className={s.form__label}>
          {t('password')}
        </label>
        {errors?.password && <span>{errors?.password.message}</span>}
        <input
          type='password'
          className={s.form__input}
          {...register('password', {
            minLength: {
              value: 7,
              message: t('passwordMin'),
            },
            maxLength: {
              value: 50,
              message: t('passwordMax'),
            },
            required: t('passwordRequired'),
          })}
        />
      </div>
      <button
        onClick={handleSubmit(loginSubmit)}
        className={classNames(s.form__submit, {
          [s.form__submit_disabled]: Object.keys(errors).length !== 0,
        })}
      >
        {t('login')}
      </button>
    </form>
  )
}

export default LoginForm
