import React from 'react'
import Categories from './Categories'
import { Button } from '@chakra-ui/react'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'

const Filters = () => {
  return (
    <section 
    className='
    mb-4 border-b shadow-md sticky top-[80px] z-[1] bg-white
    '
    >
      <div
      className='
      flex items-center
      container mx-auto px-4
      '
      >
        <Categories/>
        
        <div
        className='pl-4'
        >
          <Button
          className=''
          variant={'outline'}
          leftIcon={<HiAdjustmentsHorizontal size={20}/>}
          >
            Filters
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Filters