import * as React from "react"

//import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function LocCarousel({images}:any) {
  
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {
          images?.length
          ?(
            images.map((el:any, i:number) => (
              <CarouselItem key={i}>
                <div
                className='
                block
                relative aspect-square
                rounded-lg overflow-hidden mb-2
                '
                >
                  <Image
                  className='w-full object-cover'
                  src={el}
                  alt={''}
                  fill
                  />
                </div>
              </CarouselItem>
            ))
          ):''
        }
      </CarouselContent>
      <CarouselPrevious 
      className="!ml-16"
      />
      <CarouselNext 
      className="!mr-16"
      />
    </Carousel>
  )
}
