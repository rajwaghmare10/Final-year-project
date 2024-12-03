import React, { useContext } from 'react'
import { togglecontext } from '../context/context'
import './Torunament.css'
import ScrimTour from '../components/ScrimTour'

const Tournament = () => {
  const isOpen = useContext(togglecontext)
  return (
    <div className={`tournament-content ${isOpen ? 'sidebar-open' : ''}`}>
      <h2>ALL TOURNAMENTS</h2>
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

export default Tournament