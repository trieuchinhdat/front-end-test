import React from 'react'

const Header = () => {
  return (
    <div className='h-[70px] bg-cyan-500 sticky top-0 z-10'>
      <div className='container m-auto h-full'>
        <div className='grid grid-cols-3 content-center h-full'>
          <div className='col-span-1'></div>
          <div className='col-span-2 bg-slate-300 h-8'></div>
        </div>
      </div>
    </div>
  )
}

export default Header
