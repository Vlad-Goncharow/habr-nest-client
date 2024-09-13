import { fetchModalActions } from 'entities/FetchModal'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsList, HabsSkeleton } from 'shared/ui/Habs'
import axios from '../../../../axios'
import { useTranslation } from 'react-i18next'

function Habs() {
  const { t } = useTranslation()
  const { page } = useParams()

  const dispatch = useAppDispatch()

  const [habsLoading, setHabsLoading] = React.useState(false)
  const [habsTotalCount, setHabsTotalCount] = React.useState<number>(0)
  const [habs, setHabs] = React.useState([])
  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const q = searchParams.get('q')

  React.useEffect(() => {
    ;(async () => {
      try {
        setHabsLoading(true)
        const { data } = await axios.get(
          `/habs/search/all/${q ? q : ' '}?page=${page}&pageSize=20&sort=${sort}&order=${order}`
        )
        setHabsLoading(false)
        setHabs(data.habs)
        setHabsTotalCount(data.length)
      } catch (e) {
        dispatch(
          fetchModalActions.showModal({
            type: 'bad',
            content: t('searchPageHabsError'),
          })
        )
      }
    })()
  }, [order, page, q, sort])

  return (
    <>
      {!habsLoading ? (
        <HabsList
          habs={habs}
          habsTotalCount={habsTotalCount}
          navigatePath={`/search/habs`}
        />
      ) : (
        <HabsSkeleton />
      )}
    </>
  )
}

export default Habs
