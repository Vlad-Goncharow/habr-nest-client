import { useHabs } from '../../model'
import React from 'react'
import { useParams } from 'react-router-dom'
import { HabsList } from 'shared/ui/Habs'

interface HabsProps{
  title:string
}

const Habs: React.FC<HabsProps> = ({title}) =>{
  //params
  const { type, category, page } = useParams()

  const [sortOptions, setSortOptions] = React.useState({
    sort: 'subs',
    order: 'asc',
  })

  //data
  const {isLoading, isSuccess, habs, length} = useHabs({type, category, page, sortOptions,title})

  return (
    <>
      {
        isSuccess &&
        <>
          <HabsList
            habs={habs}
            habsLoading={isLoading}
            habsTotalCount={length}
            setSortOptions={setSortOptions}
            navigatePath={`/flows/${category}/${type}`}
          />
        </>
      }
    </>
  )
}

export default Habs