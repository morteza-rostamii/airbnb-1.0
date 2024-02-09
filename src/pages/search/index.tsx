import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../index/_components/Layout'
import data from '@/datas/data.json'
import ResCard from './_components/ResCard'
import { Lato } from 'next/font/google';
import { HiAdjustmentsVertical, HiCog6Tooth } from 'react-icons/hi2';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
const lato = Lato({ subsets: ["latin"], weight: '400' });
import {format} from 'date-fns'
import dynamic from 'next/dynamic';

const filters = [
  {
    id: 0,
    name: 'cancellation',
  },
  {
    id: 1,
    name: 'Type of place',
  },
  {
    id: 2,
    name: 'Price',
  },
  {
    id: 3,
    name: 'Rooms and Beds',
  },
  {
    id: 4,
    name: 'More',
    icon: HiAdjustmentsVertical,
  },
]

const SearchPage = ({results}: any) => {

  // get url strings---------------
  const router = useRouter();
  const [formatedStartDate, setFormatedStartDate] = useState('');
  const [formatedEndDate, setFormatedEndDate] = useState('');
  const {
    location,
    startDate,
    endDate,
    guests,
  }:any = router.query;

  useEffect(() => {
    if (startDate) setFormatedStartDate(format(new Date(startDate), 'dd MMMM yy'));
    if (endDate) setFormatedEndDate(format(new Date(endDate), 'dd MMMM yy'));
  }, [startDate, endDate]);

  // leaflet ssr issue fix -------------------
  const Map = useMemo(() => dynamic(
    () => import('./_components/GMap'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);

  return (
    <Layout>
      <main className={`${lato.className}`}>
        <div
        className='
        flex gap-8
        px-4 pt-8
        container mx-auto'
        >
          {/* results */}
          <section
          className='flex flex-col #gap-6 flex-1'
          >
            <div
            className='pb-6'
            >
              <div
              className='
              text-gray-500 text-sm mb-2 
              '
              >
                <span>
                {formatedStartDate} &nbsp;-&nbsp; {formatedEndDate}
                </span>
                &nbsp;&nbsp; . &nbsp;&nbsp;
                <span>
                  {guests} guests
                </span>
              </div>
              <h1
              className='text-xl font-bold'
              >
                Stays in {location}
              </h1>
            </div>

            {/* filters */}
            <ul
            className='
            flex items-center gap-3 flex-wrap border-b pb-4
            '
            >
              {
                filters?.length
                ?(
                  filters.map((el:any) => {
                    const Icon = el.icon;
                    return(
                      <Button 
                      key={el.id}
                      rightIcon={Icon ? <Icon size={24}/> : <></>}
                      variant={'outline'}
                      borderRadius={'9999px'}
                      size={'sm'}
                      >
                        <span>{el.name}</span>
                      </Button>
                    )
                  })
                ): ''
              }
            </ul>

            <ul
            className='
            flex flex-col #gap-4 pt-4
            '
            >
              {
                results?.length
                ?(
                  results.map((el:any) => (
                    <ResCard
                    key={el.id}
                    item={el}
                    />
                  ))
                ):''
              }
            </ul>
          </section>

          {/* map */}
          <section
          className='
          relative
          hidden flex-grow w-full
          md:grid bg-red-50 overflow-hidden
          h-[88vh] sticky top-[80px]
          '
          style={{
            flex: '.7'
          }}
          >
            <Map zoom={14}/>
          </section>
        </div>
      </main>
    </Layout>
  )
}

function getRandomElements(arr:any, n:number) {
  // Make a copy of the original array to avoid modifying it
  const shuffled = arr.slice();
  let i = arr.length;
  const result = [];

  // While there remain elements to shuffle...
  while (i--) {
    // Pick a remaining element...
    const randIndex = Math.floor(Math.random() * (i + 1));
    // Swap it with the current element.
    [shuffled[i], shuffled[randIndex]] = [shuffled[randIndex], shuffled[i]];
  }

  // Get the first n elements from the shuffled array
  for (let j = 0; j < n; j++) {
    result.push(shuffled[j]);
  }

  return result;
}

export async function getServerSideProps() {

  const res = getRandomElements(data, 10);

  return {
    props: {
      results: res,
    },
    //revalidate: 60 * 60,
  };
}

export default SearchPage