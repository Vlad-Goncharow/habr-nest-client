import SidebarWrapper from 'shared/ui/SidebarWrapper'
import Habs from '../Habs'
import { useParams } from 'react-router-dom'
import { SidebarReadWeekly } from 'widgets/SidebarReadWeekly'

function Sidebar() {
  const {category} = useParams()
  return (
    <SidebarWrapper>
      <>
        {
          category !== 'all' &&
          <Habs />
        }
        {
          category &&
          <SidebarReadWeekly category={category} />
        }
      </>
    </SidebarWrapper>
  )
}

export default Sidebar