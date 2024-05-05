import classNames from 'classnames';
import { fetchRegister } from 'entities/User';
import { formRegister } from 'entities/User/model/types/user';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import s from './Register.module.scss';
import { fetchModalActions } from 'entities/FetchModal';

function Register() {
  // ======== dispatch
  const dispatch = useAppDispatch()
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate()
  // ======== navigate

  // ======== use form hooks
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<formRegister>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordEqual: '',
    },
    mode: 'onTouched'
  });
  // ======== use form hooks

  // ======== register
  const registerSubmit = async (values: formRegister) => {
    try {
      const data: any = await dispatch(fetchRegister(values))
      if (data.type === "auth/fetchRegister/rejected") {
        data.payload.param.forEach((el:any) => {
          setError(el, {message:data.payload.message})
        })
      }

      if (data.type === "auth/fetchRegister/fulfilled") {
        localStorage.setItem('token', data.payload.accessToken)
        return navigate('/flows/all/all/1')
      }
    } catch (e) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При регистрации произошла ошибка!' }))
    }
  }
  // ======== register
  
  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <form action="" className={s.form}>
          <h1 className={s.form__title}>Регистрация</h1>
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
            <label htmlFor="" className={s.form__label}>Никнейм</label>
            {
              errors?.nickname &&
              <span>{errors?.nickname.message}</span>
            }
            <input
              type="text"
              className={s.form__input}
              {...register('nickname', {
                required: 'Укажите ваш никнейм',
                minLength: {
                  value:10,
                  message:'Длина ника минимум 10 символов'
                },
                maxLength: {
                  value: 20,
                  message: 'Длина ника максимум 20 символов'
                },
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
                  value:7,
                  message:'Пароль минимум из 7 символов'                  
                },
                maxLength: {
                  value: 50,
                  message: 'Пароль максимум из 50 символов'
                },
                required: 'Укажите ваш пароль'
              })}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="passwordEqual" className={s.form__label}>Пароль еще раз</label>
            {
              errors?.passwordEqual &&
              <span>{errors?.passwordEqual.message}</span>
            }
            <input
              type="password"
              id='passwordEqual'
              className={errors?.passwordEqual ? s.form__input + ' ' + s.form__input_error : s.form__input}
              {...register('passwordEqual', {
                required: 'Повторите пароль',
                minLength: {
                  value: 7,
                  message: 'Пароль минимум из 7 символов'
                },
                maxLength: {
                  value: 50,
                  message: 'Пароль максимум из 50 символов'
                },
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Пароли не совпадают';
                  }
                },
              })}
            />
          </div>
          <button
            onClick={handleSubmit(registerSubmit)}
            className={classNames(s.form__submit, {
              [s.form__submit_disabled]: Object.keys(errors).length !== 0
            })}
          >
            Регистрация
          </button>
        </form>
        <div className={s.login}>
          <span>Есть аккаунт? <Link to='/login'>Войти</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Register