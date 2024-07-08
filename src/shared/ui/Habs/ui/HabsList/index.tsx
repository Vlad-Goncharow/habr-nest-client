import React from 'react'
import { IHab } from 'shared/types/habs'
import Empty from 'shared/ui/Empty'
import HabItem from '../HabItem'
interface HabsListProps{
  habsTotalCount:number
  habs:IHab[] | []
}

const HabsList: React.FC<HabsListProps> = ({habsTotalCount, habs}) => {
  return (
    <>
      {
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