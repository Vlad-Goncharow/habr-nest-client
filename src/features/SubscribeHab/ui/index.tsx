import classNames from 'classnames'
import { getUserData } from 'entities/User'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import IsActiveEmail from 'shared/ui/isActiveEmail'
import {
  selectIsSubscribed,
  subscribeToHab,
  unsubscribeFromHab,
} from '../model'
import s from './SubscribeHab.module.scss'

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
        <IsActiveEmail>
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
        </IsActiveEmail>
      )}
    </>
  )
}

export default SubscribeHab
