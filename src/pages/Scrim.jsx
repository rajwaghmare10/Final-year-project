import React, { useContext } from 'react'
import { togglecontext } from '../context/context'
import './Torunament.css'
import ScrimTour from '../components/ScrimTour'

const Scrim = () => {
  const isOpen = useContext(togglecontext)
  return (
    <div className={`tournament-content ${isOpen ? 'sidebar-open' : ''}`}>
      <h2>PACTICE SCRIMS</h2>
      <div className='all-tournament'>
        <ScrimTour />
        <ScrimTour />
        <ScrimTour />
        <ScrimTour />
        <ScrimTour />
      </div>

    </div>
  )
}

export default Scrim