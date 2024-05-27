import React from 'react'
import { IHab } from 'shared/types/habs'
import Empty from 'shared/ui/Empty'
import HabItem from '../HabItem'
import HabsSkeleton from '../HabsSkeleton'

interface HabsListProps{
  habsLoading:boolean
  habsTotalCount:number
  habs:IHab[] | []
}

const HabsList: React.FC<HabsListProps> = ({habsLoading, habsTotalCount, habs}) => {
  return (
    <>
      {
        habsLoading
          ?
            <HabsSkeleton />
          :
          habsTotalCount > 0
            ?
            <>
              {
                habs.map(el =>
                  <HabItem key={el.id} hab={el} />
                )
              }
            </>
            :
            <Empty />
      }
    </>
  )
}

export default HabsList