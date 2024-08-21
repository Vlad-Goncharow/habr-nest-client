import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { fetchUpdateUser, getUserData } from 'entities/User'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Helmet } from 'react-helmet'
import { uploadImage } from 'shared/api/images'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { ValuesType } from '../../types'
import CountrySelect from '../CountrySelect'
import GenderSelect from '../GenderSelect'
import ImageUpload from '../ImageUpload'
import s from './ProfileSettings.module.scss'

function ProfileSettings() {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(getUserData)

  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const [values, setValues] = React.useState<ValuesType>({
    fullName: '',
    description: '',
    gender: { value: '', label: '' },
    country: { value: '', label: '' },
    dateOfBirth: '',
  })

  React.useEffect(() => {
    if (user) {
      setValues({
        fullName: user.fullName,
        description: user.description,
        gender: { value: user.gender, label: user.gender },
        country: { value: user.country, label: user.country },
        dateOfBirth: user?.dateOfBirth,
      })
    }
  }, [user])

  const update = async () => {
    try {
      let url: string = user !== null ? user.avatar : ''
      if (imageFile) {
        const data = await uploadImage(imageFile)
        url = data
      }

      await dispatch(
        fetchUpdateUser({
          ...values,
          avatar: url,
          gender: values.gender.value,
          country: values.country.value,
        })
      )
      dispatch(
        fetchModalActions.showModal({
          type: 'good',
          content: 'Профиль успешно обновлен',
        })
      )
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: 'Ошибка, попробуйте еще раз!',
        })
      )
    }
  }

  const checkUpdate = () => {
    if (
      values.description !== user?.description ||
      values.fullName !== user?.fullName ||
      user?.country !== values.country.value ||
      user?.gender !== values.gender.value ||
      user?.dateOfBirth !== values.dateOfBirth ||
      imageFile
    ) {
      return true
    }

    return false
  }

  const myHandleClick = () => {
    if (
      buttonRef.current !== null &&
      buttonRef.current.classList.contains(s.form__submit_active)
    ) {
      update()
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Профиль / Не Хабр</title>
        <meta name='description' content={`Страница профилья`}></meta>
      </Helmet>
      <div className={s.wrapper}>
        <h1 className={s.header}>Настройки профиля</h1>
        <form action='' className={s.form}>
          <div className={s.top}>
            <div className={s.top__inputs}>
              <div className={s.inpitItem}>
                <label htmlFor='name'>Настоящее имя</label>
                <input
                  id='name'
                  value={values.fullName}
                  onChange={(e) =>
                    setValues((prev: ValuesType) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  type='text'
                />
                <p>
                  Укажите ваши имя и фамилию, чтобы другие пользователи смогли
                  узнать, как вас зовут
                </p>
              </div>
              <div className={s.inpitItem}>
                <label htmlFor='descr'>Опишите себя</label>
                <input
                  id='desc'
                  value={values.description}
                  type='text'
                  onChange={(e) =>
                    setValues((prev: ValuesType) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <p>
                  Укажите свою специализацию. Например: Администратор баз данных
                </p>
              </div>
            </div>
            <ImageUpload setImageFile={setImageFile} user={user} />
          </div>
          <div className={s.row}>
            <GenderSelect
              className={{
                select: s.select,
                label: s.select__label,
              }}
              setValues={setValues}
              values={values}
            />
            <CountrySelect
              className={{
                select: s.select,
                label: s.select__label,
              }}
              setValues={setValues}
              values={values}
            />
          </div>
          <div className={s.row}>
            <div className={s.select}>
              <span className={s.select__label}>Дата рождения</span>
              <DatePicker
                wrapperClassName={s.select__date}
                selected={
                  values.dateOfBirth === 'Не известно' ? '' : values.dateOfBirth
                }
                onChange={(date: any) =>
                  setValues((prev: ValuesType) => ({
                    ...prev,
                    dateOfBirth: date,
                  }))
                }
              />
            </div>
          </div>
          <button
            type='button'
            onClick={myHandleClick}
            ref={buttonRef}
            className={classNames(s.form__submit, {
              [s.form__submit_disable]: !checkUpdate(),
              [s.form__submit_active]: checkUpdate(),
            })}
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </>
  )
}

export default ProfileSettings
