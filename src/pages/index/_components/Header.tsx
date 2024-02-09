import Logo from '@/common/icons/Logo'
import { Button, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiGlobe, HiOutlineGlobeAlt, HiUser } from 'react-icons/hi'
import { HiBars3, HiMiniUserCircle } from 'react-icons/hi2'
import Search from './header/search/Search'
import Link from 'next/link'
import Picker from './header/search/Picker'
import useSearchStore from '@/pages/search/_stores/search.store'

const Header = () => {
  const {searchInput, } = useSearchStore();

  return (
    <>
      <header
      className={`
      ${searchInput?.length ? '' : 'border-b'}
      sticky top-0
      #shadow-md p-4 flex items-center bg-white h-20
      border-gray-300 z-[20000]
      `}
      >
        <div
        className='
        #grid #grid-cols-2
        #md:grid-cols-3
        flex items-center
        #lg:justify-between
        container mx-auto px-4
        '
        >
          <div
          className='
          flex items-center
          mr-3 
          lg:flex-1 lg:m-0  
          '
          >
            <Link
            href={'/'}
            className='
            inline-block text-red-500 '
            >
              <Logo/>
            </Link>
          </div>

          <Search />
        
          <div
          className='
          flex gap-3 items-center justify-end
          #justify-self-end flex-1 #self-end
          '
          >
            <Button
            className='!hidden sm:!block'
            borderRadius={'9999px'}
            variant={'ghost'}
            size={'sm'}
            >
              Airbnb your home
            </Button>
            <IconButton
            aria-label=''
            icon={<HiOutlineGlobeAlt size={20}/>}
            isRound={true}
            size={'sm'}
            variant={'ghost'}
            />
            <Button
            leftIcon={<HiBars3 size={20}/>}
            rightIcon={<HiMiniUserCircle size={24}/>}
            size={'sm'}
            borderRadius={'9999px'}
            variant={'outline'}
            >
            </Button>
          </div>
        </div>
      </header>

      <Picker />
    </>
  )
}

export default Header