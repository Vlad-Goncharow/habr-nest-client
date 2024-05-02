import classNames from 'classnames'
import { fetchUpdateUser, getUserData } from 'entities/User'
import { countries, males } from 'pages/ProfileSettings/utils'
import React, { ChangeEvent } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import axios from '../../../../axios'
import s from './ProfileSettings.module.scss'

function ProfileSettings() {
  //dispatch
  const dispatch = useAppDispatch()

  //current user
  const {user} = useAppSelector(getUserData)

  //update values
  const [fullName, setFullName] = React.useState(`${user?.fullName}`)
  const [descr, setDescr] = React.useState(`${user?.description}`)
  const [gender, setGender] = React.useState({ value: user?.gender, label: user?.gender })
  const [startDate, setStartDate] = React.useState(user?.dateOfBirth);
  const [country, setCountry] = React.useState({ value: user?.country, label: user?.country })

  //avatar
  const [image, setImage] = React.useState<string | null>(`${process.env.REACT_APP_SERVER_URL}/${user?.avatar}`);
  const [imageFile, setImageFile] = React.useState<any>(null)

  //update button ref
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  //gender select
  const GenderComponents = () => {
    const changeGender = (e: any) => {
      setGender(e)
    }


    return (
      <div className={s.select}>
        <span>Пол</span>
        <Select
          value={gender}
          onChange={changeGender}
          options={males}
        />
      </div>
    )
  }

  //country select
  const CountyComponents = () => {
    const changeCountry = (e: any) => {
      setCountry(e)
    }


    return (
      <div className={s.select}>
        <span>Страна</span>
        <Select
          value={country}
          onChange={changeCountry}
          options={countries}
        />
      </div>
    )
  }

  //handle image 
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImageFile(selectedImage)
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  }

  //update profile
  const update = async () => {
    try {
      let imageUrl = user?.avatar

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const { data } = await axios.post('/files/upload', formData)
        setImage(data.filename)
        imageUrl = data.filename
      }

      await dispatch(fetchUpdateUser({
        avatar: imageUrl,
        country: country.value,
        description: descr,
        fullName: fullName,
        gender: gender.value,
        dateOfBirth: startDate,
      }))
      
    } catch (e) {
    }
  }

  //check is change some values
  const checkUpdate = () => {
    if (descr !== user?.description || fullName !== user.fullName || user.country !== country.value || user.gender !== gender.value || user.dateOfBirth !== startDate) {
      return true
    }

    return false
  }
  
  //check if btn style active update profile
  const myHandleClick = () => {
    if(buttonRef.current !== null && buttonRef.current.classList.contains(s.form__submit_active)){
      update()
    }
  }
  
  return (
    <div className="page">
      <div className="container">
        <div className={s.wrapper}>
          <h1 className={s.header}>Настройки профиля</h1>
          <form action="" className={s.form}>
            <div className={s.top}>
              <div className={s.top__inputs}>
                <div className={s.inpitItem}>
                  <label htmlFor="">Настоящее имя</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                  />
                  <p>Укажите ваши имя и фамилию, чтобы другие пользователи смогли узнать, как вас зовут</p>
                </div>
                <div className={s.inpitItem}>
                  <label htmlFor="">Опишите себя</label>
                  <input
                    value={descr}
                    type="text"
                    onChange={(e) => setDescr(e.target.value)}
                  />
                  <p>Укажите свою специализацию. Например: Администратор баз данных</p>
                </div>
              </div>
              <div className={s.user}>
                <h4 className={s.user__title}>Аватар</h4>
                <div className={s.user__image}>
                  <input type="file" onChange={handleImageUpload} className={s.image__upload} />
                  {
                    image &&
                    <>
                      <img src={image} alt="" className={s.image__img} />
                    </>
                  }
                </div>
                <p className={s.user__info}>
                  Формат: jpg, gif, png. <br />
                  Максимальный размер файла: 1Mb. <br />
                  Разрешение: до 96x96px.
                </p>
              </div>
            </div>
            <div className={s.row}>
              {GenderComponents()}
              {CountyComponents()}
            </div>
            <div className={s.row}>
              <div className={s.select}>
                <span>Дата рождения</span>
                <DatePicker wrapperClassName={s.select__date} selected={startDate} onChange={(date: any) => setStartDate(date)} />
              </div>
            </div>
            <button 
              type='button'
              onClick={myHandleClick} 
              ref={buttonRef}
              className={classNames(s.form__submit, {
                [s.form__submit_disable]: checkUpdate() === false,
                [s.form__submit_active]: checkUpdate() === true
              })}
            >
              Сохранить изменения
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings