import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='flex flex-row w-full max-h-[150px] justify-between items-center  text-[20px] font-serif p-5 '><h1 className='flex-2'>Goverment Exams Typing Test Simulation</h1> 
    <nav className='flex flex-row flex-1 justify-between font-sans'>
        <NavLink to='/5' >5 Min Test</NavLink>
        <NavLink to='/10' >10 Min Test </NavLink>
        <NavLink to='/15' >15 Min Test</NavLink>

    </nav>
    </div>
  )
}
