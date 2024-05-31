import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { UseClickOutside } from 'shared/hooks/UseClickOutside';
import { IHab } from 'shared/types/habs';
import axios from '../../../../axios';
import s from './HabsList.module.scss';
import { ValuesType } from '../CreatePost';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchModalActions } from 'entities/FetchModal';

interface HabsListProps{
  habs:IHab[] | [],
  setValues: any;
}

const HabsList: React.FC<HabsListProps> = ({ habs, setValues }) => {
  //dispatch
  const dispatch = useAppDispatch()

  //habs array
  const [habsList, setHabsList] = React.useState<IHab[] | []>([])

  //habs search input values
  const [inputValue, setInputValue] = React.useState<string>('')

  //is habs list open | popupRef
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)
  const popupRef = React.useRef<HTMLFormElement>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/habs/all/list`)
        setHabsList(data)
      } catch (e) {
        dispatch(fetchModalActions.showModal({ type: 'bad', content: 'При загрузки списка хабов произошла ошибка!' }))
      }
    })()
  }, [])

  const serachHabs = () => {
    if(inputValue){
      return habsList.filter(hub => hub.title.toLowerCase().includes(inputValue.toLowerCase()))
    } else {
      return habsList
    }
  }

  const addHab = (hab:IHab) => {
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        habs:[...prev.habs, hab]
      }
    })

    setHabsList((prev:IHab[]) => {
      return prev.filter((el) => el.id !== hab.id)
    })
  }

  const deleteHab = (id:number) => {
    const findHab = habs.find((el) => el.id === id)

    if(findHab){
      setHabsList((prev:IHab[]) => [findHab, ...prev])

      setValues((prev: ValuesType) => {
        return {
          ...prev,
          habs: prev.habs.filter((el) => el.id !== id)
        }
      })
    }
  }

  return (
    <form ref={popupRef} action="" className={s.form}>
      <div className={classNames(s.form__top,{
        [s.form__top_open]: popupIsOpen && habsList.length > 0
      })}>
        {
          habs.length > 0 &&
          <div className={s.habs}>
            {
              habs.map((el) =>  
                <div key={el.id} className={s.habs__item}>
                  {el.title}
                  <span onClick={() => deleteHab(el.id)} className={s.habs__delete}></span>
                </div>
              )
            }
          </div>
        }
        <input 
          onFocus={() => setPopupIsOpen(true)} 
          onChange={(e) => setInputValue(e.target.value)} 
          type="text" 
          className={s.form__input}
          placeholder='Выберите Хабы'
        />
      </div>
      {
        popupIsOpen && habsList.length > 0 &&
        <ul className={s.popup}>
          {
            serachHabs().map((el) => 
              <li 
                key={el.id}
                onClick={() => addHab(el)} 
                className={s.popup__li}
              >
                {el.title}
              </li>
            )
          }
        </ul>
      }
    </form>
  )
}

export default HabsList