import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Test10 from './Test10'
import Test15 from './Test15'
import Test5 from './Test5'
import Navbar from './comp/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/5" element={<Test5 />} />
          <Route path="/10" element={<Test10 />} />
          <Route path="/15" element={<Test15 />} />
        </Routes>
      </main>
    </div>
  );
}
