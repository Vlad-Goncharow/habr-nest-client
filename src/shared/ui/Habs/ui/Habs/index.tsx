import React from 'react'
import { IHab } from 'shared/types/habs'
import Pagination from 'widgets/Pagination'
import HabsHeader from '../HabsHeader'
import HabsList from '../HabsList'
import s from './Habs.module.scss'

interface HabsProps {
  habs: IHab[] | []
  habsLoading: boolean,
  habsTotalCount: number;
  setSortOptions: any
  navigatePath: any
}

const Habs: React.FC<HabsProps> = ({ habs, habsLoading, habsTotalCount, setSortOptions, navigatePath }) => {
  return (
    <>
      <div className={s.content}>
        <HabsHeader setSortOptions={setSortOptions} />
        <HabsList habs={habs} habsLoading={habsLoading} habsTotalCount={habsTotalCount} />
      </div>

      <Pagination length={habsTotalCount} pageSize={20} navigatePath={navigatePath} />
    </>
  )
}

export default Habs