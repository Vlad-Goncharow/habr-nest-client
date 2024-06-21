import { useHabs } from '../../model'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { HabsList } from 'shared/ui/Habs'

interface HabsProps{
  title:string
}

const Habs: React.FC<HabsProps> = ({title}) =>{
  //params
  const { type, category, page } = useParams()

  const [searchParams] = useSearchParams()

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  
  //data
  const {isLoading, isSuccess, habs, length} = useHabs({type, category, page, sort, order ,title})

  return (
    <>
      {
        isSuccess &&
        <>
          <HabsList
            habs={habs}
            habsLoading={isLoading}
            habsTotalCount={length}
            navigatePath={`/flows/${category}/${type}`}
          />
        </>
      }
    </>
  )
}

export default Habs