import classNames from 'classnames'
import { getUserData } from 'entities/User'
import React from 'react'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import s from './SubscribeHab.module.scss'
import {
  selectIsSubscribed,
  subscribeToHab,
  unsubscribeFromHab,
} from '../model'
import { useTranslation } from 'react-i18next'

interface HabSubscribeBtnProps {
  habId: number
}

const SubscribeHab: React.FC<HabSubscribeBtnProps> = ({ habId }) => {
  const { t } = useTranslation()
  const { user } = useAppSelector(getUserData)
  const dispatch = useAppDispatch()
  const isSubscribed = useAppSelector((state) =>
    selectIsSubscribed(state, habId)
  )

  const handleSubscribe = async () => {
    dispatch(subscribeToHab(Number(habId)))
  }

  const handleUnsubscribe = async () => {
    dispatch(unsubscribeFromHab(Number(habId)))
  }

  return (
    <>
      {user !== null && (
        <button
          className={classNames(s.sub, {
            [s.sub__active]: isSubscribed,
          })}
          onClick={() => {
            isSubscribed ? handleUnsubscribe() : handleSubscribe()
          }}
        >
          {isSubscribed ? t('unSubscribe') : t('subscribe')}
          {isSubscribed && <span></span>}
        </button>
      )}
    </>
  )
}

export default SubscribeHab
