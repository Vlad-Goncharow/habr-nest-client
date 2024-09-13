import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsType } from 'shared/types/habs'
import axios from '../../../../../../axios'
import Hab from '../Hab'
import ProfileSkeleton from '../ProfileSkeleton'
import s from './Habs.module.scss'
import { useTranslation } from 'react-i18next'

const Habs = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { userId } = useParams()

  const [habs, setHabs] = React.useState<HabsType[] | []>([])

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/habs/user/${userId}/subscribed-habs`)
        setHabs(data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('defaultError'),
          })
        )
      }
    })()
  }, [userId])

  return (
    <>
      {loading ? (
        <ProfileSkeleton />
      ) : habs.length > 0 ? (
        <div className={s.item}>
          <h2 className={s.item__title}>{t('userHabsTitle')}</h2>
          <div className={s.item__list}>
            {habs.map((el) => (
              <Hab key={el.id} habData={el} />
            ))}
          </div>
        </div>
      ) : (
        <div className={s.item}>
          <h2 className={s.item__title}>{t('userHabsTitleEmpty')}</h2>
        </div>
      )}
    </>
  )
}

export default Habs
