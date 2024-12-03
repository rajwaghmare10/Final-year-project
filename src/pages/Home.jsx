import React, { useContext } from 'react'
import {togglecontext} from '../context/context'
import './Home.css'
import ScrimTour from '../components/ScrimTour'


const Home = () => {
  const isOpen = useContext(togglecontext)
  return (
    <div className={`home-content ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="home-container">
        <button><img src='/images/banner1.jpeg' alt='banner' /></button>
      </div>
      <div className='scrims-tournament-section'>
        <p className='title'>LIVE / UPCOMING SCRIMS</p>
        <ScrimTour />
        <ScrimTour />
        <ScrimTour />
        <p className='title'>LIVE / UPCOMING  TOURNAMENTS</p>
        <ScrimTour />
        <ScrimTour />
        <ScrimTour />
      </div>
    </div>
  )
}

export default Home