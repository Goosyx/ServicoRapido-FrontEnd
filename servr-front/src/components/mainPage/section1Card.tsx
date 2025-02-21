"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Card1 = {
  text: string;
  src: string;
  id: string;
  store?: boolean;
};

const Card1 = ({ text, src, id, store }: Card1) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform relative"
      onClick={() => {
        store ? router.push(`/store/${id}`) : router.push(`/${text}/${id}`);
      }}
    >
      { src !== '/no-image.jpg' ? (
        <Image
          alt={text}
          src={src}
          width={500}
          height={500}
          className="object-cover h-64 w-full rounded-xl"
        />
      ) : (
        <div className="h-64 w-full bg-gray-100 rounded-xl flex items-center justify-center">
          <p className="text-green-700">Sem foto</p>
        </div>
      ) }
      <div className="absolute w-full bottom-0 rounded-b-md h-[30%] bg-slate-100 flex items-center p-4">
        <h1 className="text-center font-semibold text-lg text-primary">{text}</h1>
      </div>
    </div>
  );
};

export default Card1;
