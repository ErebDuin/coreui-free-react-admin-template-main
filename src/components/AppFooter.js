import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.portnov.com" target="_blank" rel="noopener noreferrer">
          Home
        </a>
        <span className="ms-1">&copy; 2025 Portnov Computer School.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.portnov.com/" target="_blank" rel="noopener noreferrer">        
          Portnov Computer School
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
