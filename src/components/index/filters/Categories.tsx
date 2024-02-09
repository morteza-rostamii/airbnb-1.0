import { IconButton } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { FaHouseFloodWater } from 'react-icons/fa6'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const categories = Array.from({length: 20}).map((el:any, i:number) => {

  return {
    id: i,
    name: 'Location',
    icon: FaHouseFloodWater,
  };
});

const Categories = () => {

  // arrow button visible state --------------
  const TRANSLATE_AMOUNT = 200;
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);

  // left & right container scroll
  const containerRef:any = useRef(null);

  const scrollLeft = () => {
    const newTranslate = translate - TRANSLATE_AMOUNT;
    if (newTranslate >= 0) setTranslate(newTranslate);
  }

  const scrollRight = () => {
    if (containerRef.current === null) return;

    // width of container out of view
    const edge = containerRef.current.scrollWidth;
    // width of visible part of container
    const width = containerRef.current.clientWidth;
    
    const newTranslate = translate + TRANSLATE_AMOUNT;
    if ((newTranslate + width) >= edge) {
      return setTranslate(edge - width);
    };
    setTranslate(newTranslate);
  }

  return (
    <div
    className='relative overflow-x-hidden pt-1'
    ref={containerRef}
    >
      <ul
      className='
      flex items-center gap-3 whitespace-nowrap 
      transition-transform w-[max-content] pl-14 pr-12
      '
      style={{
        transform: `translateX(-${translate}px)`
      }}
      
      >
        {
          categories?.length
          ?(
            categories.map((el:any) => (
              <CatCard
              key={el.id}
              item={el}
              />
            ))
          ):''
        }
      </ul>

      {/* buttons */}
      {
        !!isLeftVisible && (
          <div
          className='
          flex items-center pr-2 justify-end
          absolute left-0 top-1/2 -translate-y-1/2
          #bg-white h-full
          bg-gradient-to-r from-white from-70% to-transparent 
          '
          >
            <IconButton
            aria-label=''
            icon={<HiChevronLeft size={24}/>}
            isRound={true}
            size={'sm'}
            borderWidth={'1px'}
            borderColor={'gray.300'}
            colorScheme='whiteAlpha'
            color={'black'}

            onClick={scrollLeft}
            />
          </div>
        )
      }

      {
        !!isRightVisible && (
          <div
          className='
          flex items-center pl-2
          absolute right-0 top-1/2 -translate-y-1/2
          #bg-white h-full 
          bg-gradient-to-l from-white from-70% to-transparent 
          '
          >
            <IconButton
            aria-label=''
            icon={<HiChevronRight size={24}/>}
            isRound={true}
            size={'sm'}
            borderWidth={'1px'}
            borderColor={'gray.300'}
            colorScheme='whiteAlpha'
            color={'black'}

            onClick={scrollRight}
            />
          </div>
        )
      }
    </div>
  )
}

const CatCard = ({item}:any) => {
  const Icon = item.icon;

  return (
    <button
    className='
    flex flex-col items-center justify-center #bg-red-50 gap-1
    text-center text-gray-600 py-3 px-1
    cursor-pointer
    transition-all
    hover:text-gray-800 
    '
    >
      <div className=''>
        <Icon size={20}/>
      </div>
      <p className='text-sm'>
        {item.name}
      </p>
    </button>
  )
}

export default Categories