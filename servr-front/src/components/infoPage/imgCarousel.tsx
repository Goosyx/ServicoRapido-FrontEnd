/* eslint-disable @next/next/no-img-element */
"use client";

import { imageRes } from "@/types/productType";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

type ImgCarouselProps = {
  images: imageRes[];
};

const ImgCarousel = ({ images }: ImgCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length + 1);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 w-10">
        {images.map((el, index) => {
          return (
            <div 
              key={el.id} 
              onClick={() => api?.scrollTo(index)}
              className={cn("p-px hover:opacity-75 transition-all duration-100 cursor-pointer", index + 1 === current ? "border-2 border-green-600 rounded" : null)}
            >
              <img src={el.imageUrl} alt={el.id} className="rounded"/>
            </div>
          )
        })}
      </div>
      <div className="max-w-96">
        <Carousel setApi={setApi} className="max-w-96">
          <CarouselContent className="max-w-96">
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="w-fit flex"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.id}
                  className="object-cover max-w-96 max-h-96 max-lg:max-w-full"
                  width={500}
                  height={500}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Imagem {current} de {count}
        </div>
      </div>
    </div>
  );
};

export default ImgCarousel;
