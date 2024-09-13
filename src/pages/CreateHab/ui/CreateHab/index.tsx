import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { checkRolesAdmin } from 'entities/User'
import { Helmet } from 'react-helmet'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { postCategories } from 'shared/global'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import axios from '../../../../axios'
import ImageComp from '../ImageComp'
import s from './CreateHab.module.scss'

interface IFormInput {
  title: string
  description: string
  category: string
  image: File
}

function CreateHab() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const checkAmdinRole = useAppSelector(checkRolesAdmin)

  if (!checkAmdinRole) {
    navigate('/flows/all/articles/1')
  }

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData()
    if (data.image) {
      formData.append('file', data.image)
    }

    try {
      const image = await axios.post(`/files/upload`, formData)
      const hab = await axios.post(`/habs`, {
        ...data,
        image: image.data.filename,
      })
      navigate(`/hab/${hab.data.id}/articles/1`)
    } catch (error) {
      dispatch(
        fetchModalActions.showModal({
          type: 'bad',
          content: t('defaultError'),
        })
      )
    }
  }
  const checkCreateAvailable = () => {
    if (
      watch('category') &&
      watch('title').length > 5 &&
      watch('description').length > 10
    ) {
      return true
    } else {
      return false
    }
  }
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {t('habCreateTitle')} / {t('siteTitle')}
        </title>
        <meta
          name='description'
          content={`{t('habCreateTitle')} / {t('siteTitle')}`}
        ></meta>
      </Helmet>
      <div className={s.wrapper}>
        <header>
          <h1 className={s.wrapper__title}>{t('habCreateTitle')}</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <div className={s.item__header}>
              <div className={s.item__title}>
                <div className={s.item__title}>{t('habCreateImage')}</div>
              </div>
              {errors.image && (
                <span className={s.item__error}>{errors.image.message}</span>
              )}
            </div>
            <Controller
              name='image'
              control={control}
              rules={{ required: t('habCreateImageRequired') }}
              render={({ field }) => (
                <ImageComp setImageFile={(file: any) => field.onChange(file)} />
              )}
            />
          </div>
          <div className={s.item}>
            <div className={s.item__header}>
              <div className={s.item__title}>{t('habCreateCategory')}</div>
              {errors?.category && (
                <span className={s.item__error}>
                  {errors?.category.message}
                </span>
              )}
            </div>
            <ul className={s.types}>
              <Controller
                name='category'
                control={control}
                rules={{ required: t('habCreateCategoryRequired') }}
                render={({ field }): any =>
                  postCategories.map((el) => (
                    <li
                      key={el.category}
                      className={classNames(s.types__li, {
                        [s.types__li_active]: field.value === el.category,
                      })}
                      onClick={() => field.onChange(el.category)}
                    >
                      <span>{t(el.category)}</span>
                    </li>
                  ))
                }
              />
            </ul>
          </div>
          <div className={s.item}>
            <div className={s.item__header}>
              <label htmlFor='title' className={s.item__title}>
                {t('habCreateName')}
              </label>
              {errors?.title && (
                <span className={s.item__error}>{errors?.title.message}</span>
              )}
            </div>
            <input
              id='title'
              type='text'
              placeholder={t('habCreateNamePlaceholder')}
              className={s.item__input}
              {...register('title', {
                minLength: {
                  value: 5,
                  message: t('habCreateNameMinLength'),
                },
                maxLength: {
                  value: 100,
                  message: t('habCreateNameMaxLength'),
                },
                required: t('habCreateNamePlaceholder'),
              })}
            />
          </div>
          <div className={s.item}>
            <div className={s.item__header}>
              <label htmlFor='descr' className={s.item__title}>
                {t('habCreateDescr')}
              </label>
              {errors?.description && (
                <span className={s.item__error}>
                  {errors?.description.message}
                </span>
              )}
            </div>
            <input
              id='descr'
              type='text'
              placeholder={t('habCreateDescrPlaceholder')}
              className={s.item__input}
              {...register('description', {
                minLength: {
                  value: 10,
                  message: t('habCreateDescrMin'),
                },
                maxLength: {
                  value: 100,
                  message: t('habCreateDescrMax'),
                },
                required: t('habCreateDescrPlaceholder'),
              })}
            />
          </div>
          <button
            type='submit'
            className={classNames(s.create, {
              [s.create_active]: checkCreateAvailable() === true,
              [s.create_disable]: checkCreateAvailable() === false,
            })}
          >
            {t('habCreate')}
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateHab
