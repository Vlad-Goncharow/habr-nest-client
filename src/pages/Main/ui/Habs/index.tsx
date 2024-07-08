import { useHabs } from '../../model'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { HabsList, HabsSkeleton } from 'shared/ui/Habs'


const Habs: React.FC = () =>{
  //params
  const { type, category, page } = useParams()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('q');
  
  const { isLoading, isSuccess, data } = useHabs({ type, category, page, sort, order, title:query })

  return (
    <>
      {
        !isLoading && isSuccess ?
          <HabsList
            habs={data.habs}
            habsTotalCount={data.length}
            navigatePath={`/flows/${category}/${type}`}
          />
        :
          <HabsSkeleton />
      }
    </>
  )
}

export default Habs