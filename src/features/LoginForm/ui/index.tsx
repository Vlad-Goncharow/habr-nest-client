import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { FormLogin } from 'entities/User'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import s from './LoginForm.module.scss'
import UseLogin from '../model/lib'

function LoginForm() {
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
      setError(error.param, { message: error.message })
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'При авторизации произошла ошибка!',
        })
      )
      return
    }
  }, [data, isSuccess, error])

  return (
    <form action='' className={s.form}>
      <h1 className={s.form__title}>Вход</h1>
      <div className={s.form__item}>
        <label htmlFor='' className={s.form__label}>
          E-mail
        </label>
        {errors?.email && <span>{errors?.email.message}</span>}
        <input
          type='text'
          className={s.form__input}
          {...register('email', {
            required: 'Укажите вашу почту',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Введите корректный email',
            },
          })}
        />
      </div>
      <div className={s.form__item}>
        <label htmlFor='' className={s.form__label}>
          Пароль
        </label>
        {errors?.password && <span>{errors?.password.message}</span>}
        <input
          type='password'
          className={s.form__input}
          {...register('password', {
            minLength: {
              value: 7,
              message: 'Пароль минимум из 7 символов',
            },
            maxLength: {
              value: 50,
              message: 'Пароль максимум из 50 символов',
            },
            required: 'Укажите ваш пароль',
          })}
        />
      </div>
      <button
        onClick={handleSubmit(loginSubmit)}
        className={classNames(s.form__submit, {
          [s.form__submit_disabled]: Object.keys(errors).length !== 0,
        })}
      >
        Войти
      </button>
      <Link to='/reminder' className={s.form__forgot}>
        Забыли пароль?
      </Link>
    </form>
  )
}

export default LoginForm
