import classNames from 'classnames'
import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UseClickOutside } from 'shared/hooks/UseClickOutside'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { IHab } from 'shared/types/habs'
import axios from '../../../../axios'
import { ValuesType } from '../CreatePost'
import s from './HabsList.module.scss'

interface HabsListProps {
  habs: IHab[] | []
  setValues: any
}

const HabsList: React.FC<HabsListProps> = ({ habs, setValues }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [habsList, setHabsList] = React.useState<IHab[] | []>([])

  let mainHabs = React.useMemo(() => {
    return habsList.filter((el) => !habs.some((hab) => hab.id === el.id))
  }, [habs, habsList])

  const [inputValue, setInputValue] = React.useState<string>('')

  const [popupIsOpen, setPopupIsOpen] = React.useState<boolean>(false)
  const popupRef = React.useRef<HTMLFormElement>(null)
  UseClickOutside(popupRef, () => setPopupIsOpen(false))

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`/habs/all/list`)
        setHabsList(data)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('loadAllHabsError'),
          })
        )
      }
    })()
  }, [])

  const serachHabs = () => {
    if (inputValue) {
      return mainHabs.filter((hub) =>
        hub.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    } else {
      return mainHabs
    }
  }

  const addHab = (hab: IHab) => {
    setValues((prev: ValuesType) => {
      return {
        ...prev,
        habs: [...prev.habs, hab],
      }
    })

    mainHabs = mainHabs.filter((el) => el.id !== hab.id)
  }

  const deleteHab = (id: number) => {
    const findHab = habs.find((el) => el.id === id)

    if (findHab) {
      mainHabs = [findHab, ...mainHabs]

      setValues((prev: ValuesType) => {
        return {
          ...prev,
          habs: prev.habs.filter((el) => el.id !== id),
        }
      })
    }
  }

  return (
    <form ref={popupRef} action='' className={s.form}>
      <div
        className={classNames(s.form__top, {
          [s.form__top_open]: popupIsOpen && habsList.length > 0,
        })}
      >
        {habs.length > 0 && (
          <div className={s.habs}>
            {habs.map((el) => (
              <div key={el.id} className={s.habs__item}>
                {el.title}
                <span
                  onClick={() => deleteHab(el.id)}
                  className={s.habs__delete}
                ></span>
              </div>
            ))}
          </div>
        )}
        <input
          onFocus={() => setPopupIsOpen(true)}
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
          className={s.form__input}
          placeholder={t('postCreateHabsPlaceholder')}
        />
      </div>
      {popupIsOpen && habsList.length > 0 && (
        <ul className={s.popup}>
          {serachHabs().map((el) => (
            <li key={el.id} onClick={() => addHab(el)} className={s.popup__li}>
              {el.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default HabsList
