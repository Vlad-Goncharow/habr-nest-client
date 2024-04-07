import classNames from 'classnames'
import React, { ChangeEvent } from 'react'
import { postCategories, postTypeOne } from 'shared/global'
import axios from '../../../../axios'
import HabsList from '../HabsList'
import { valuesType } from '../CreatePost'
import s from './SecondStep.module.scss'

const postDifficulty = [
  {
    dificultEng: 'unknown',
    dificultRu: 'Не указано'
  },
  {
    dificultEng: 'easy',
    dificultRu: 'Легко'
  },
  {
    dificultEng: 'medium',
    dificultRu: 'Сложно'
  },
  {
    dificultEng: 'hard',
    dificultRu: 'Тяжело'
  },
]

interface SecondStepProps {
  values: valuesType
  setValues: (values: any) => void
  setStep: (step: number) => void
}

const SecondStep: React.FC<SecondStepProps> = ({ setStep, setValues, values }) => {
  //image file
  const [image, setImage] = React.useState<string | null>(null);
  const [imageFile, setImageFile] = React.useState<any>(null)

  const clearImage = () => {
    setValues((prev: valuesType) => {
      return {
        ...prev,
        image: null
      }
    })
    setImage(null)
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImageFile(selectedImage)
      setValues((prev:valuesType) => {
        return {
          ...prev,
          image: selectedImage
        }
      })
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  //change post category
  const changePostCategory = (category: string) => {
    setValues((prev: valuesType) => {
      return {
        ...prev,
        category
      }
    })
  }

  //chnage post type
  const changePostType = (type: string) => {
    setValues((prev: valuesType) => {
      return {
        ...prev,
        type
      }
    })
  }

  //handle checkbox
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setValues((prev: valuesType) => {
      return {
        ...prev,
        difficulty: id
      }
    });
  };

  //create post
  const createPost = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", values.title);
    formData.append("content", values.content);
    values.habs.forEach(el => formData.append("habs[]", String(el.id)));
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("difficulty", values.difficulty);

    try {
      axios.post(`/posts`, formData);
    } catch (error) {
      console.error(error);
    }
  }
  
  //check create post btn is available
  const checkCreateAvailable = () => {
    if(
      values.title.length < 15 ||
      values.habs.length === 1 ||
      values.image === null ||
      values.content.length < 50
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <div className={s.type}>
          <span className={s.item__title}>Категория публикации</span>
          <ul className={s.type__list}>
            {
              postCategories.map((el) =>
                <li
                  className={classNames(s.type__li, {
                    [s.type__li_active]: values.category === el.categoryEng
                  })}
                  onClick={() => changePostCategory(el.categoryEng)}
                >
                  <span>{el.categoryRu}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.type}>
          <span className={s.item__title}>Тип публикации</span>
          <ul className={s.type__list}>
            {
              postTypeOne.map((el) =>
                <li
                  className={classNames(s.type__li, {
                    [s.type__li_active]: values.type === el.typeEng
                  })}
                  onClick={() => changePostType(el.typeEng)}
                >
                  <span>{el.typeRu}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
      <div className={s.item}>
        <span className={s.item__title}>Хабы</span>
        <HabsList habs={values.habs} setValues={setValues} />
      </div>
      <div className={s.item}>
        <div className={s.item__title}>Укажите сложность публикации</div>
        <form className={s.dificult}>
          {
            postDifficulty.map((el) =>
              <div className={s.dificult__item}>
                <input
                  onChange={handleCheckboxChange}
                  className={s.dificult__input}
                  id={el.dificultEng}
                  type="checkbox"
                  checked={el.dificultEng === values.difficulty || false}
                />
                <label htmlFor={el.dificultEng}>
                  <span>{el.dificultRu}</span>
                </label>
              </div>
            )
          }
        </form>
      </div>
      <div className={s.item}>
        <div className={`${s.item__title} ${s.item__title_big}`}>Отображение публикации в ленте</div>
        <div className={s.image}>
          <p className={s.image__title}>Добавьте обложку</p>
          <p className={s.image__subtitle}>Перенесите сюда файл (jpg, gif, png) размером 780×440 или нажмите</p>
          <button className={s.image__btn} type='button'>Загрузить обложку</button>
          <input type="file" onChange={handleImageUpload} className={s.image__upload} />
          {
            image &&
            <>
              <img src={image} alt="" className={s.image__img} />
              <button onClick={clearImage} className={s.image__delete}>Удалить обложку</button>
            </>
          }
        </div>
      </div>
      <div className={s.buttons}>
        <button className={`${s.buttons__btn} ${s.buttons__btn_prev}`} onClick={() => setStep(1)}>Назад</button>
        <button className={classNames(s.buttons__btn, {
          [s.buttons__btn_create]: checkCreateAvailable() === true,
          [s.buttons__btn_disable]: checkCreateAvailable() === false
        })} onClick={createPost}>Создать публикацию</button>
      </div>
    </div>
  )
}

export default SecondStep