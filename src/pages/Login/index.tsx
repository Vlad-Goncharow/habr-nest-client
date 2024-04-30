import classNames from 'classnames';
import { fetchLogin } from 'entities/User';
import { formLogin } from 'entities/User/model/types/user';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import s from './Login.module.scss';

function Login() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== use form hooks
  const { register, handleSubmit, setError, formState: { errors } } = useForm<formLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== login
  const loginSubmit = async (values: formLogin) => {
    try {
      const data: any = await dispatch(fetchLogin(values))
      if (data.type === "auth/fetchLogin/rejected") {
        setError(data.payload.param, {message:data.payload.message})
      }

      if (data.type === "auth/fetchLogin/fulfilled") {
        localStorage.setItem('token', data.payload.accessToken)
        return navigate('/flows/all/all/1')
      }
    } catch (e) {
      alert('При авторизации произошла ошибка')
    }
  }
  // ======== login

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <form action="" className={s.form}>
          <h1 className={s.form__title}>Вход</h1>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>E-mail</label>
            {
              errors?.email &&
              <span>{errors?.email.message}</span>
            }
            <input
              type="text"
              className={s.form__input}
              {...register('email', {
                required: 'Укажите вашу почту',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Введите корректный email'
                }
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="" className={s.form__label}>Пароль</label>
            {
              errors?.password &&
              <span>{errors?.password.message}</span>
            }
            <input
              type="password"
              className={s.form__input}
              {...register('password', {
                minLength: {
                  value: 7,
                  message: 'Пароль минимум из 7 символов'
                },
                maxLength: {
                  value: 50,
                  message: 'Пароль максимум из 50 символов'
                },
                required: 'Укажите ваш пароль'
              })}
            />

          </div>
          <button
            onClick={handleSubmit(loginSubmit)}
            className={classNames(s.form__submit, {
              [s.form__submit_disabled]: Object.keys(errors).length !== 0
            })}
          >
            Войти
          </button>
          <Link to='/reminder' className={s.form__forgot}>Забыли пароль?</Link>
        </form>
        <div className={s.login}>
          <span>Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login