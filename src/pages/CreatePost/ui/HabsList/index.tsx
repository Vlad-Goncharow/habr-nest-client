import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { UseClickOutside } from 'shared/hooks/UseClickOutside';
import { IHab } from 'shared/types/habs';
import axios from '../../../../axios';
import s from './HabsList.module.scss';
import { valuesType } from '../CreatePost';

interface HabsListProps{
  habs:IHab[] | [],
  setValues: any;
}

const HabsList: React.FC<HabsListProps> = ({ habs, setValues }) => {
  const [habsList, setHabsList] = React.useState<IHab[] | []>([])

  const [inputValue, setInputValue] = React.useState<string>('')
  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)
  const popupRef = React.useRef<HTMLFormElement>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/habs/all/list`)
        setHabsList(data)
      } catch (e) {

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
    setValues((prev: valuesType) => {
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

      setValues((prev:valuesType) => {
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
                <div className={s.habs__item}>
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
        <ul  className={s.popup}>
          {
            serachHabs().map((el) => 
              <li 
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