import classNames from 'classnames'
import React, { ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { postCategories } from 'shared/global'
import useDebounce from 'shared/hooks/useDebounce'
import s from './PostsNavigation.module.scss'

type subCategoriesType = {
  subCategoryRu: string,
  subCategoryEng: string
}

const subCategories: subCategoriesType[] = [
  {
    subCategoryRu: 'Статьи',
    subCategoryEng: 'articles'
  }, {
    subCategoryRu: 'Посты',
    subCategoryEng: 'posts'
  },
  {
    subCategoryRu: 'Новости',
    subCategoryEng: 'news'
  }, {
    subCategoryRu: 'Хабы',
    subCategoryEng: 'habs'
  }, {
    subCategoryRu: 'Авторы',
    subCategoryEng: 'authors'
  }
]

interface PostsNavigationProps{
  setAuthorsTitle: any
  setHabsTitle: any
}

const PostsNavigation: React.FC<PostsNavigationProps> = ({ setAuthorsTitle, setHabsTitle }) => {
  // ======== posts params
  const { category, type } = useParams()

  //input values
  const [inputValue, setInputValue] = React.useState('')
  const [authorsValue, setAuthorsValue] = React.useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(type === 'habs'){
      setInputValue(event.target.value)
    }

    if(type === 'authors'){
      setAuthorsValue(event.target.value)
    }
  }
  const habsDebounceInput = useDebounce(inputValue, 700);
  const authorsDebounceInput = useDebounce(authorsValue, 700);

  //debounce and change query search title
  React.useEffect(() => {
    if (type === 'habs') {
      setHabsTitle(habsDebounceInput.length === 0 ? ' ' : habsDebounceInput);
    }

    if (type === 'authors') {
      setAuthorsTitle(authorsDebounceInput.length === 0 ? ' ' : authorsDebounceInput);
    }
  }, [type, habsDebounceInput, authorsDebounceInput]);

  const currentCategory = postCategories.find(el => el.categoryEng === category);

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {
          currentCategory ? currentCategory.categoryRu : 'Все потоки'
        }
      </h1>
      <div className={s.category}>
        {
          subCategories.map((el:subCategoriesType) => 
            <Link 
              to={`/flows/${category}/${el.subCategoryEng}/1`}
              className={classNames(s.category__item, {
                [s.category__item_active]: type === el.subCategoryEng
              })}
              key={el.subCategoryEng}
            >
              {el.subCategoryRu}
            </Link>
          )
        }
      </div>
      {
        type === 'habs' || type === 'authors'
          ?
          <div className={s.search}>
            <form action="" onSubmit={(e) => e.preventDefault()} className={s.search__form}>
              <input 
                type="text" 
                placeholder='Пойск' 
                value={type === 'habs' ? inputValue : authorsValue} 
                onChange={handleChange} 
                className={s.search__input} 
              />
              <button className={s.search__btn}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg>
              </button>
            </form>
          </div>
          :
          <div className={s.filter}>
            Все подряд
          </div>
      }
    </div>
  )
}

export default PostsNavigation