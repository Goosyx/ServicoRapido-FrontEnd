import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const MainCarousel = () => {
  return (
    <Carousel className="w-full rounded-md">
      <CarouselContent>
        <CarouselItem>
          <div className="relative">
            <div className="absolute h-[35rem] w-full bg-black/40 rounded-md" />
            <h1 className="absolute bottom-20 left-20 text-4xl text-white font-semibold w-[30rem] leading-relaxed max-md:text-2xl max-md:w-40">
              A roupa mais sustentável é a que você já tem
            </h1>
            <Image
              alt="esmalte"
              src="/img_101.jpg"
              width={500}
              height={500}
              className="w-full h-[35rem] object-cover rounded-md object-top"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative">
            <div className="absolute h-[35rem] w-full bg-black/40 rounded-md" />
            <h1 className="absolute bottom-20 left-20 text-4xl text-white font-semibold w-[30rem] leading-relaxed max-md:text-2xl max-md:w-40">
              A roupa mais sustentável é a que você já tem
            </h1>
            <Image
              alt="esmalte"
              src="/img_108.jpg"
              width={500}
              height={500}
              className="w-full h-[35rem] object-cover rounded-md object-top"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative">
            <div className="absolute h-[35rem] w-full bg-black/40 rounded-md" />
            <h1 className="absolute bottom-20 left-20 text-4xl text-white font-semibold w-[30rem] leading-relaxed max-md:text-2xl max-md:w-40">
              A roupa mais sustentável é a que você já tem
            </h1>
            <Image
              alt="esmalte"
              src="/img_110.jpg"
              width={500}
              height={500}
              className="w-full h-[35rem] object-cover rounded-md object-top"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MainCarousel;
