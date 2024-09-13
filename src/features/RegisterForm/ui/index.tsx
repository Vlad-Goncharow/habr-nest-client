import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { FormRegister } from 'entities/User'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import UseRegister from '../model/lib'
import s from './RegisterForm.module.scss'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

function RegisterForm() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormRegister>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordEqual: '',
    },
    mode: 'onTouched',
  })

  const { data, error, isSuccess, registerSubmit } = UseRegister()

  React.useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', data.accessToken)
      navigate('/flows/all/articles/1')
    }

    if (!isSuccess && error) {
      setError(error.param, { message: error.message })
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: i18next.t('registerError'),
        })
      )
      return
    }
  }, [data, isSuccess, error])

  return (
    <form action='' className={s.form}>
      <h1 className={s.form__title}>{t('register')}</h1>
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
          {t('nickname')}
        </label>
        {errors?.nickname && <span>{errors?.nickname.message}</span>}
        <input
          type='text'
          className={s.form__input}
          {...register('nickname', {
            required: t('nicknameRequired'),
            minLength: {
              value: 10,
              message: t('nicknameMin'),
            },
            maxLength: {
              value: 20,
              message: t('nicknameMax'),
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
      <div className={s.form__item}>
        <label htmlFor='passwordEqual' className={s.form__label}>
          {t('passwordRepeat')}
        </label>
        {errors?.passwordEqual && <span>{errors?.passwordEqual.message}</span>}
        <input
          type='password'
          id='passwordEqual'
          className={
            errors?.passwordEqual
              ? s.form__input + ' ' + s.form__input_error
              : s.form__input
          }
          {...register('passwordEqual', {
            required: t('passwordRepeatRequiredError'),
            minLength: {
              value: 7,
              message: t('passwordMin'),
            },
            maxLength: {
              value: 50,
              message: t('passwordMax'),
            },
            validate: (val) => {
              if (watch('password') !== val) {
                return t('passwordRepeatRequiredError')
              }
            },
          })}
        />
      </div>
      <button
        onClick={handleSubmit(registerSubmit)}
        className={classNames(s.form__submit, {
          [s.form__submit_disabled]: Object.keys(errors).length !== 0,
        })}
      >
        {t('register')}
      </button>
    </form>
  )
}

export default RegisterForm
