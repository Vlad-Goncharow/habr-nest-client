import { useQuery } from '@tanstack/react-query'
import { fetchModalActions } from 'entities/FetchModal'
import { loadHabsFN } from 'pages/Main/model'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'shared/hooks/useAppDispatch'
import { HabsList } from 'shared/ui/Habs'

function Habs(props:any) {
  //params
  const { type, category, page } = useParams()

  //dispatch
  const dispatch = useAppDispatch()

  
  const [sortOptions, setSortOptions] = React.useState({
    sort: 'subs',
    order: 'asc',
  })

  //query
  const { data, isLoading, isError, isSuccess, } = useQuery({
    queryKey: ['habs', category, type, props.title, page, sortOptions.sort, sortOptions.order],
    queryFn: () => loadHabsFN(category, props.title, sortOptions.sort, sortOptions.order, page),
    select: (data) => data.data,
  })

  //error handler
  React.useEffect(() => {
    if (isError) {
      dispatch(fetchModalActions.showModal({ type: 'bad', content: 'Ошибка, попробуйте еще раз!' }))
    }
  }, [isError])

  return (
    <>
      {
        isSuccess &&
        <>
          <HabsList
            habs={data.habs}
            habsLoading={isLoading}
            habsTotalCount={data.length}
            setSortOptions={setSortOptions}
            navigatePath={`/flows/${category}/${type}`}
          />
        </>
      }
    </>
  )
}

export default Habs