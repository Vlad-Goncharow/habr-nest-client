import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { postCategories, postTypeOne } from 'shared/global'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import axios from '../../../../axios'
import { ValuesType } from '../CreatePost'
import HabsList from '../HabsList'
import s from './SecondStep.module.scss'

const postDifficulty = [
  {
    dificulty: 'Unknown',
  },
  {
    dificulty: 'Easy',
  },
  {
    dificulty: 'Medium',
  },
  {
    dificulty: 'Hard',
  },
]

interface SecondStepProps {
  values: ValuesType
  setValues: (values: any) => void
  setStep: (step: number) => void
}

const SecondStep: React.FC<SecondStepProps> = ({
  setStep,
  setValues,
  values,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [image, setImage] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [imageFile, setImageFile] = React.useState<any>(null)

  const clearImage = () => {
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        image: null,
      }
    })
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0]
    if (selectedImage) {
      setImageFile(selectedImage)
      setValues((prev: ValuesType) => {
        return {
          ...prev,
          image: selectedImage,
        }
      })
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  const changePostCategory = (category: string) => {
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        category,
      }
    })
  }

  const changePostType = (type: string) => {
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        type,
      }
    })
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        difficulty: id,
      }
    })
  }

  const createPost = async () => {
    const formData = new FormData()
    formData.append('publication', imageFile)

    try {
      const { data } = await axios.post(`/files/upload`, formData)
      axios.post(`/posts`, {
        ...values,
        habs: values.habs.map((el) => el.id),
        image: data.filename,
      })
      navigate('/flows/all/articles/1')
    } catch (error: any) {
      if (error.response.status === 413) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('fileSizeError'),
          })
        )
        return
      }
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('defaultError'),
        })
      )
    }
  }

  const checkCreateAvailable = () => {
    if (values.habs.length < 1 || values.image === null) {
      return false
    } else {
      return true
    }
  }

  const createButtonRef = React.useRef<HTMLButtonElement>(null)

  const handleButtonClick = () => {
    if (
      createButtonRef.current &&
      createButtonRef.current.classList.contains(s.buttons__create_active)
    ) {
      createPost()
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <div className={s.type}>
          <span className={s.item__title}>{t('postCreateCategoryTitle')}</span>
          <ul className={s.type__list}>
            {postCategories.map((el) => (
              <li
                key={el.category}
                className={classNames(s.type__li, {
                  [s.type__li_active]: values.category === el.category,
                })}
                onClick={() => changePostCategory(el.category)}
              >
                <span>{t(el.category)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.type}>
          <span className={s.item__title}>{t('postCreateTypeTitle')}</span>
          <ul className={s.type__list}>
            {postTypeOne.map((el) => (
              <li
                key={el.type}
                className={classNames(s.type__li, {
                  [s.type__li_active]: values.type === el.type,
                })}
                onClick={() => changePostType(el.type)}
              >
                <span>{t(el.typeSingle)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.item}>
        <span className={s.item__title}>{t('postCreateHabs')}</span>
        <HabsList habs={values.habs} setValues={setValues} />
      </div>
      <div className={s.item}>
        <div className={s.item__title}>{t('postCreateCategoryDifficulty')}</div>
        <form className={s.dificult}>
          {postDifficulty.map((el) => (
            <div
              key={el.dificulty}
              className={classNames(s.dificult__item, {
                [s.dificult__item_unknown]: el.dificulty === 'Unknown',
                [s.dificult__item_easy]: el.dificulty === 'Easy',
                [s.dificult__item_normal]: el.dificulty === 'Medium',
                [s.dificult__item_hard]: el.dificulty === 'Hard',
              })}
            >
              <input
                onChange={handleCheckboxChange}
                className={s.dificult__input}
                id={el.dificulty}
                type='checkbox'
                checked={el.dificulty === values.difficulty || false}
              />
              <label htmlFor={el.dificulty}>
                <span>{t(el.dificulty)}</span>
              </label>
            </div>
          ))}
        </form>
      </div>
      <div className={s.item}>
        <div className={`${s.item__title} ${s.item__title_big}`}>
          {t('postCreateImageTitle')}
        </div>
        <div className={s.image}>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className={s.image__upload}
            ref={fileInputRef}
          />
          {image ? (
            <>
              <img src={image} alt='' className={s.image__img} />
              <button onClick={clearImage} className={s.image__delete}>
                {t('postCreateDeleteCoverButton')}
              </button>
            </>
          ) : (
            <>
              <p className={s.image__title}>{t('postCreateAddCoverTitle')}</p>
              <p className={s.image__subtitle}>
                {t('postCreateDragFileSubtitle')}
              </p>
              <button className={s.image__btn} type='button'>
                {t('postCreateUploadButton')}
              </button>
            </>
          )}
        </div>
      </div>
      <div className={s.buttons}>
        <button
          className={`${s.buttons__btn} ${s.buttons__prev}`}
          onClick={() => setStep(1)}
        >
          {t('postCreatePrevStepBtn')}
        </button>
        <button
          ref={createButtonRef}
          className={classNames(`${s.buttons__btn} ${s.buttons__create}`, {
            [s.buttons__create_active]: checkCreateAvailable() === true,
            [s.buttons__create_disable]: checkCreateAvailable() === false,
          })}
          onClick={handleButtonClick}
        >
          {t('postCreateBtn')}
        </button>
      </div>
    </div>
  )
}

export default SecondStep
