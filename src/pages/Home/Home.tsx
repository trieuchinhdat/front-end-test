import { Fragment, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Global/Header'

export default function Home() {
  return (
    <Fragment>
      <Header />
      <div className='container m-auto relative'>
        <div className='block-top'>
          <div className='w-full grid grid-cols-3'>
            <div className='col-span-1 bg-slate-100 relative h-[500px]'>
              <div className='mega-menu sticky top-[80px] left-[20px] px-4'>
                <ul className='space-y-2'>
                  <li>Menu Item 1</li>
                  <li>Menu Item 2</li>
                  <li>Menu Item 3</li>
                  <li>Menu Item 4</li>
                  <li>Menu Item 5</li>
                </ul>
              </div>
            </div>
            <div className='col-span-2 h-[500px] bg-slate-300'>
              <div className='grid grid-cols-3 content-between gap-4 p-[16px] h-[100%]'>
                <div className='col-span-3'></div>
                <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
                <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
                <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='block-bottom bg-slate-400 h-[400px] mt-10'>
          <div className='grid grid-cols-3 gap-4 p-4'>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
            <div className='col-span-1 bg-white h-[100px] rounded-10'></div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
