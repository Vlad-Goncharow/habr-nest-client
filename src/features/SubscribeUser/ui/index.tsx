import classNames from 'classnames'
import { getUserData } from 'entities/User'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { useAppSelector } from 'shared/hooks/useAppSelector'
import s from './SubscribeUser.module.scss'
import { selectIsSubscribed, subscribeUser, unsubscribeUser } from '../model'
import { useTranslation } from 'react-i18next'
import IsActiveEmail from 'shared/ui/isActiveEmail'

interface SubscribeUserProps {
  userId: number
}

const SubscribeUser: React.FC<SubscribeUserProps> = ({ userId }) => {
  const { t } = useTranslation()
  const { user } = useAppSelector(getUserData)
  const dispatch = useAppDispatch()

  const isSubscribed = useAppSelector((state) =>
    selectIsSubscribed(state, userId)
  )

  const handleSubscribe = async () => {
    dispatch(subscribeUser(userId))
  }

  const handleUnsubscribe = async () => {
    dispatch(unsubscribeUser(userId))
  }

  return (
    <>
      {user && user.id !== userId && (
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

export default SubscribeUser
