import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='flex flex-row w-full h-[150px] '><h1>Goverment Typing Test Simulation</h1> 
    <nav>
        <Navlink to='/5' >5 Min Test</Navlink>
        <Navlink to='/10' >5 Min Test </Navlink>
        <Navlink to='/15' >5 Min Test</Navlink>

    </nav>
    </div>
  )
}
