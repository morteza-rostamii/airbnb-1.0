import React from 'react'
import { faker } from '@faker-js/faker';
import LocCard from './LocCard';

const LocGrid = ({places}: any) => {

  return (
    <section 
    className='
    mb-4
    '
    >
      <div
      className='
      container mx-auto px-4
      '
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
      }}
      >
        {
          places?.length
          ?(
            places.map((el:any) => (
              <LocCard
              key={el.id}
              item={el}
              />
            ))
          ):''
        }
      </div>
    </section>
  )
}

export default LocGrid