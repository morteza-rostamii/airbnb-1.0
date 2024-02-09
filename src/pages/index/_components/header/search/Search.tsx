import { IconButton, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Picker from './Picker';
import { useRouter } from 'next/router';
import useSearchStore from '@/pages/search/_stores/search.store';

const Search = () => {
  const {
    searchInput, 
    startDate, 
    endDate,
    guests, 
    setSearchStoreState,
    cancelSearch, 
    cleanDateAndGuests,
    } = useSearchStore();
  const router = useRouter();

  // hand search input and submit---------------------
  const handSearchInput = (e:any) => {
    setSearchStoreState('searchInput', e.target.value);
  }

  const handSearchSubmit = (e:any) => {
    e.preventDefault();

    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests: guests,
      },
      
    });
    cancelSearch();
    cleanDateAndGuests();
  }

  // hide scrollbar on search open-------------------
  useEffect(() => {
    if (searchInput?.length) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
  }, [searchInput]);

  // show location in placeholder------------------
  const {location} = router.query;

  return (
    <form
    className='
    relative
    hidden
    md:flex items-center pr-2
    border-2 border-gray-300
    rounded-[9999px] overflow-hidden
    shadow-sm flex-1 #z-[5]
    '

    onSubmit={handSearchSubmit}
    >
      <input 
      className='
      outline-none border-none #w-full h-full
      #bg-orange-100 p-3 flex-grow
      rounded-l-[9999px] overflow-hidden
      '
      //type="search" 
      name="term" 
      id="term" 
      placeholder={`${location ? location : 'Search a place'} `}

      value={searchInput}
      onChange={(e:any) => handSearchInput(e)}
      />

      <IconButton
      className='!text-white ml-2'
      aria-label=''
      isRound={true}
      icon={<HiMagnifyingGlass size={20} />}
      colorScheme='red'
      size={'sm'}
      type='submit'
      />

      {/* date picker */}
      
    </form>
  )
}

export default Search