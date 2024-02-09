import React, { useState } from 'react'
import {motion} from 'framer-motion'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { HiMiniUsers, HiUser } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import useSearchStore from '@/pages/search/_stores/search.store';

const Picker = () => {
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
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handSelect = (ranges: any) => {
    setSearchStoreState('startDate', ranges.selection.startDate);
    setSearchStoreState('endDate', ranges.selection.endDate);
  }

  // num of guests -----------------
  //const [numOfGuests, setNumOfGuests] = useState(1);

  // search ------------------

  const handSearch = () => {
    // searchInput, startDate, endDate, number of guests

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

  return (
    <motion.div
    className='
    hidden
    fixed -top-[600px] left-0 right-0 bg-white #min-h-[600px]
    md:grid place-content-center gap-3 w-full
    z-[2] shadow-lg pt-24 pb-4
    '
    //style={{fontFamily: 'lato !important'}}
    animate={{
      top: searchInput?.length ? 0 : -600,
    }}
    transition={{
      type: 'spring',
      damping: 12,
      stiffness: 100,
    }}
    >
      <DateRangePicker
      //className='!font-bold !text-xl'
      minDate={new Date()}
      rangeColors={['#FD5B61']}
      ranges={[selectionRange]}
      onChange={handSelect}
      />

      <div
      className='
      flex items-center justify-between
      #bg-green-50 border-b-2 pb-2
      '
      >
        <h2 className='text-gray-400 '>
          Number of guests
        </h2>
        <div
        className='
        flex items-center gap-2
        '
        >
          <span className='text-gray-600'>
          <HiMiniUsers size={24}/>
          </span>
          <NumberInput 
          colorScheme='red'
          //ringColor={'red'}
          focusBorderColor='#fca5a5'
          size='md' 
          maxW={20} 
          //defaultValue={1} 
          min={1}
          
          value={guests}
          onChange={(v1:string, v2:number) => setSearchStoreState('guests', v2)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>

      </div>

      <div
      className='flex items-center gap-4'
      >
        <Button
        className='flex-1'
        variant={'ghost'}
        onClick={cancelSearch}
        >
          Cancel
        </Button>
        <Button
        className='flex-1'
        variant={'ghost'}
        colorScheme='red'

        onClick={handSearch}
        >
          Search
        </Button>
      </div>
    </motion.div>
  )
}

export default Picker