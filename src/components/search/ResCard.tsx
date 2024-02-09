import { IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiHeart, HiOutlineHeart, HiStar } from 'react-icons/hi'

const ResCard = ({item}: any) => {
  return (
    <Link
    href={'#'}
    className='
    grid grid-cols-1 gap-3
    sm:grid-cols-[auto_1fr]
    py-4 group
    '
    >
      <div
      className='
      relative aspect-[1.8/1.2] w-60
      rounded-lg overflow-hidden
      justify-self-center
      sm:justify-self-auto bg-slate-50
      '
      >
        <Image
        className='w-full h-full object-cover'
        src={item.images[0]}
        alt={item.name}
        fill
        />
      </div>

      <div
      className='
      flex flex-1 justify-self-center flex-col
      sm:justify-self-auto
      sm:flex-row
      '
      >
        <div
        className='
        flex flex-col justify-between
        '
        >
          <div>
            <div
            className='mb-2'
            >
              <p
              className='text-gray-500 text-sm'
              >
                Private room in center of {item.city}
              </p>
              <h3
              className='
              text-lg font-semibold group-hover:underline
              '
              >
                {item.name}
              </h3>
            </div>

            <div
            className='text-sm text-gray-400'
            >
              1 guest . {item.bedrooms} bedroom . {item.wifi ? 'Wifi .' : ''} {item.parking ? 'Free parking' : ''} 
            </div>
          </div>

          {/* rating */}
          <div
          className='flex items-center gap-1'
          >
            <span className='text-orange-400'>
              <HiStar size={20}/>
            </span>
            <span>
              {item.rating}
            </span>
          </div>
        </div>

        <div
        className='
        flex flex-col items-end justify-between ml-auto
        '
        >
          <IconButton
          aria-label=''
          icon={<HiOutlineHeart size={24}/>}
          size={'sm'}
          isRound={true}
          />
          <div>
            <span>
              ${item.price} / night
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ResCard