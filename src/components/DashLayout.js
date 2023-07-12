import {Outlet} from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import {DashLayoutContainer} from '../config/theme/styles'

const DashLayout = () => {
  return (
 <DashLayoutContainer >
        <DashHeader />
      
            <Outlet />
        
        <DashFooter />
        </DashLayoutContainer>

  )
}

export default DashLayout