import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocCarousel from './LocCarousel'

const LocCard = ({item}: any) => {
  return (
    <div
    className='group cursor-pointer'
    //href={''}
    >
      {/* carousel */}
      <LocCarousel images={item.images}/>

      <div
      className='flex flex-col gap-2'
      >
        <div>
          <h2
          className='
          text-lg font-bold
          group-hover:underline transition-all
          '
          >
          {item.name}
          </h2>
          <p 
          className='text-sm text-gray-500'
          >
          {item.address}
          </p>
        </div>
        <p
        className='
        flex items-center gap-1 text-sm font-bold
        '
        >
        {item.price}$ <span>night</span>
        </p>
      </div>
    </div>
  )
}

export default LocCard