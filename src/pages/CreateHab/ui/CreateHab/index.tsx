import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import { checkRolesAdmin } from 'entities/User'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
}

function CreateHab() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const checkAmdinRole = useAppSelector(checkRolesAdmin)

  if (!checkAmdinRole) {
    navigate('/flows/all/articles/1')
  }

  const [imageFile, setImageFile] = React.useState<File>()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData()
    if (imageFile) {
      formData.append('file', imageFile)
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
          content: 'Ошибка, попробуйте еще раз!',
        })
      )
    }
  }

  return (
    <div className={s.wrapper}>
      <header>
        <h1 className={s.wrapper__title}>Создание Хаба</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.item}>
          <div className={s.item__title}>Картинка Хаба</div>
          <ImageComp setImageFile={setImageFile} />
        </div>
        <div className={s.item}>
          <div className={s.item__header}>
            <label htmlFor='title' className={s.item__title}>
              Категория Хаба
            </label>
            {errors?.category && (
              <span className={s.item__error}>{errors?.category.message}</span>
            )}
          </div>
          <ul className={s.types}>
            <Controller
              name='category'
              control={control}
              rules={{ required: 'Пожалуйста, выберите категорию' }}
              render={({ field }): any =>
                postCategories.map((el) => (
                  <li
                    key={el.categoryEng}
                    className={classNames(s.types__li, {
                      [s.types__li_active]: field.value === el.categoryEng,
                    })}
                    onClick={() => field.onChange(el.categoryEng)}
                  >
                    <span>{el.categoryRu}</span>
                  </li>
                ))
              }
            />
          </ul>
        </div>
        <div className={s.item}>
          <div className={s.item__header}>
            <label htmlFor='title' className={s.item__title}>
              Название Хаба
            </label>
            {errors?.title && (
              <span className={s.item__error}>{errors?.title.message}</span>
            )}
          </div>
          <input
            id='title'
            type='text'
            placeholder='Введите название Хаба'
            className={s.item__input}
            {...register('title', {
              minLength: {
                value: 5,
                message: 'Название минимум 5 символов',
              },
              maxLength: {
                value: 100,
                message: 'Название максимум из 100 символов',
              },
              required: 'Напишите Название',
            })}
          />
        </div>
        <div className={s.item}>
          <div className={s.item__header}>
            <label htmlFor='descr' className={s.item__title}>
              Описание Хаба
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
            placeholder='Введите описание Хаба'
            className={s.item__input}
            {...register('description', {
              minLength: {
                value: 10,
                message: 'Описание минимум 10 символов',
              },
              maxLength: {
                value: 100,
                message: 'Описание максимум из 100 символов',
              },
              required: 'Напишите описание',
            })}
          />
        </div>
        <button type='submit' className={s.create}>
          Создать
        </button>
      </form>
    </div>
  )
}

export default CreateHab
