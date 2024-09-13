import EmptyIcon from 'shared/images/empty.png'
import s from './Empty.module.scss'
import { useTranslation } from 'react-i18next'

function Empty() {
  const { t } = useTranslation()
  return (
    <div className={s.item}>
      <img src={EmptyIcon} alt='' />
      <span>{t('empty')}</span>
    </div>
  )
}

export default Empty
