import React from 'react';
import { ProductRes } from '../../types/productType';

type ISmallProductHeaderProps = {
  product: ProductRes;
}

function SmallProductHeader({ product }: ISmallProductHeaderProps) {
  return(
    <div className='flex flex-col gap-4 mb-4'>
      <div className="flex py-px px-2 rounded bg-primary items-center justify-center text-white w-fit">
        <p>{product?.category}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{product?.title}</h1>
      </div>
    </div>
  );
}

export {SmallProductHeader};