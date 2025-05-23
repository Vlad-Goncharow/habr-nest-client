import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import {
  checkIsActiveEmail,
  fetchUpdateUser,
  getUserData,
  userActions,
} from 'entities/User'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Helmet } from 'react-helmet'
import axios from '../../../../axios'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import { ValuesType } from '../../types'
import CountrySelect from '../CountrySelect'
import GenderSelect from '../GenderSelect'
import ImageUpload from '../ImageUpload'
import s from './ProfileSettings.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function ProfileSettings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { user } = useAppSelector(getUserData)
  const isActiveEmail = useAppSelector(checkIsActiveEmail)
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
      const formData = new FormData()
      if (imageFile) {
        formData.append('avatar', imageFile)

        const { data } = await axios.post('/files/upload-avatar', formData)
        url = data.filename
      }

      await dispatch(
        fetchUpdateUser({
          ...values,
          avatar: url,
          gender: values.gender.value,
          country: values.country.value,
        })
      ).unwrap()

      dispatch(
        fetchModalActions.showModal({
          type: 'good',
          content: t('profileUpdateSuccess'),
        })
      )
    } catch (e:any) {
      if(e.response.data.message === 'Image must be exactly 256x256 pixels'){
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('updateAvatarResolutionError'),
          })
        )
      } else if(e.response.data.message === 'File too large'){
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('updateAvatarSizeError'),
          })
        )
      } else {
        dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('updatePorofileError'),
        })
      )
      }
    }
  }

  const checkUpdate = () => {
    if (
      (values.description !== user?.description &&
        values.description.length > 10 &&
        values.description.length <= 20) ||
      (values.fullName !== user?.fullName && values.fullName.length > 10) ||
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
      buttonRef.current.classList.contains(s.form__btn_active)
    ) {
      update()
    }
  }

  const deleteUser = async () => {
    try {
      if (user) {
        const { data } = await axios.delete(`/auth/${user.id}`)

        if (data.success) {
          localStorage.removeItem('token')
          dispatch(userActions.deleteUser())
          navigate('/flows/all/articles/1')
        }
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('deleteUserError'),
        })
      )
    }
  }

  const sendVerifyEmail = async () => {
    try {
      if (user) {
        const { data } = await axios.post(`/auth/send/verify/${user.id}`)

        if (data.success) {
          dispatch(
            fetchModalActions.showModal({
              type: 'good',
              content: t('sendVerifyEmail'),
            })
          )
        }
      }
    } catch (e) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('sendVerifyEmailError'),
        })
      )
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
        <h1 className={s.header}>{t('settingPageTitle')}</h1>
        <form action='' className={s.form}>
          <div className={s.top}>
            <div className={s.top__inputs}>
              <div className={s.inpitItem}>
                <label htmlFor='name'>{t('settingPageRealName')}</label>
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
                <p>{t('settingPageRealNameDescr')}</p>
              </div>
              <div className={s.inpitItem}>
                <label htmlFor='descr'>{t('settingPageAbout')}</label>
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
                <p>{t('settingPageAboutDescr')}</p>
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
              <span className={s.select__label}>{t('userDateOfBirth')}</span>
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
          <div className={s.form__btns}>
            <button
              type='button'
              onClick={myHandleClick}
              ref={buttonRef}
              className={classNames(s.form__btn, s.form__btn_submit, {
                [s.form__btn_disable]: !checkUpdate(),
                [s.form__btn_active]: checkUpdate(),
              })}
            >
              {t('settingPageSave')}
            </button>
            {!isActiveEmail && (
              <button
                onClick={sendVerifyEmail}
                type='button'
                className={classNames(s.form__btn, s.form__btn_sendEmail)}
              >
                {t('resendEmailVerify')}
              </button>
            )}
            <button
              onClick={deleteUser}
              type='button'
              className={classNames(s.form__btn, s.form__btn_delete)}
            >
              {t('delete')} {t('profile').toLowerCase()}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileSettings
