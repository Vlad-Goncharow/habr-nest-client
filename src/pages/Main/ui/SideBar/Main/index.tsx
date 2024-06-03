import SidebarWrapper from 'shared/ui/SidebarWrapper'
import Habs from '../Habs'
import { useParams } from 'react-router-dom'

function Sidebar() {
  const {category} = useParams()
  return (
    <SidebarWrapper>
      <>
        {
          category !== 'all' &&
          <Habs />
        }
      </>
    </SidebarWrapper>
  )
}

export default Sidebar