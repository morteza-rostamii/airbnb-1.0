import Image from "next/image";
import { Lato } from "next/font/google";
import Layout from "./index/_components/Layout";
import Head from "next/head";
import Filters from "./index/_components/filters/Filters";
import LocGrid from "./index/_components/locGrid/LocGrid";
import { faker } from "@faker-js/faker";

//import data from '@/datas/data.json'
import Picker from "./index/_components/header/search/Picker";

const lato = Lato({ subsets: ["latin"], weight: '400' });

export default function Home({places}: any) {

  return (
    <Layout>
      <Head>
        <title>Airbnb-1 clone</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main
      className={`
      ${lato.className}
      #pt-10
      `}
      >
        
        <Filters/>
        <LocGrid places={places}/>
        
      </main>
    </Layout>
  );
}

faker.seed(123);

// fetch data
export async function getStaticProps() {
  /*
  const places = Array.from({length: 40}).map((el:any) => {
    const name = faker.lorem.words({min: 2, max: 2});
    const slug = name.replace(/\s+/g, '-');

    return {
      id: faker.string.uuid(),
      name: name,
      slug: slug,
      images: Array.from({length: 4}).map((el:any) => faker.image.urlLoremFlickr({category: 'building'})),
      address: faker.location.streetAddress(),
      price: faker.datatype.number({min: 20, max: 400}),
      city: faker.location.city(),
      rating: faker.datatype.float({
        min: 1,
        max: 5,
        precision: 2,
      }),
      bedrooms: faker.datatype.number({min: 1, max: 5}),
      wifi: faker.datatype.boolean(),
      parking: faker.datatype.boolean(),
    };
  });*/

  const URL = 'https://www.jsonkeeper.com/b/OS05';
  let data = null;
  try {
    const response = await fetch(URL, {
      method: 'GET',
    });
    data = await response.json();
    console.log(data);
  }
  catch(error:any) {
    console.log(error?.message || error);
  }

  console.log('---')
  return {
    props: {
      places: data,
    },
    //revalidate: 60 * 60,
  };
}