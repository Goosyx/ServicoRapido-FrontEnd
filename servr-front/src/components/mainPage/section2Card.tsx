"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Card = {
  text?: string;
  src?: string;
  id?: string;
};

const CardFull = ({ src, text, id }: Card) => {
  const router = useRouter();

  if (!text || !src) return null;
  return (
    <div
      className="relative cursor-pointer hover:scale-105 transition-transform"
      onClick={() => {
        router.push(`/${text}/${id}`);
      }}
    >
      {src !== "/no-image.jpg" ? (
        <Image
          alt={text}
          src={src}
          width={500}
          height={500}
          className="h-[30rem] w-full rounded-xl object-cover"
        />
      ) : (
        <div className="h-[30rem] w-full bg-gray-100 rounded-xl" />
      )}
      <span className="absolute bottom-2 left-2 text-black bg-white rounded-lg p-1 text-sm font-bold">
        R$: {text}
      </span>
    </div>
  );
};

const CardHalf = ({ src, text, id }: Card) => {
  const router = useRouter();
  if (!text || !src) return null;
  return (
    <div
      className="relative cursor-pointer hover:scale-105 transition-transform"
      onClick={() => {
        router.push(`/${text}/${id}`);
      }}
    >
      {src !== "/no-image.jpg" ? (
        <Image
          alt={text}
          src={src}
          width={500}
          height={500}
          className="object-cover h-[14.5rem] w-full rounded-xl"
        />
      ) : (
        <div className="h-[14.5rem] w-full bg-gray-100 rounded-xl" />
      )}
      <span className="absolute bottom-2 left-2 text-black bg-white rounded-lg   p-1 text-sm font-bold">
        R$: {text}
      </span>
    </div>
  );
};

export { CardFull, CardHalf };
