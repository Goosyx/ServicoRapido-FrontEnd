'use client'

import React from 'react';
import { ProductRes } from '../types/productType';
import { useRouter } from 'next/navigation';

type IShowResultsProps = {
  res?: ProductRes[],
  text: string
}

function ShowResults({ res, text }: IShowResultsProps) {
  const router = useRouter()

  if (!text) return null;

  function goToProduct(price: number, id: string) {
    router.push(`/${price}/${id}`)
  }

  return(
    <div className='absolute w-72 max-h-96 bg-white p-4 rounded-md shadow-xl z-50 mt-2 overflow-auto'>
      {res?.filter(el => el.title.toLowerCase().indexOf(text.toLowerCase()) !== -1).map(el => {
        return (
          <div key={el.id} onClick={() => goToProduct(el.price, el.id)} className='border-b border-b-slate-200 py-2 hover:bg-slate-50 transition-all duration-75 cursor-pointer'>
            <h3 className='font-semibold'>{el.title}</h3>
            <p className='text-slate-400 text-sm'>Loja: {el.user?.stores![0].name}</p>
          </div>
        )
      })}
      {!res?.filter(el => el.title.toLowerCase().indexOf(text.toLowerCase()) !== -1).length ? (
        <p className='text-slate-400 text-sm'>Nenhum produto encontrado</p>
      ) : null}
    </div>
  );
}

export {ShowResults};