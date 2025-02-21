'use client'

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type IStoreHeaderProps = {
  name?: string;
}

function StoreHeader({ name }: IStoreHeaderProps) {
  const router = useRouter();

  return(
    <div className='flex w-full items-center gap-4'>
      <Button 
        className='w-10 h-10 p-0 bg-slate-200 hover:bg-slate-300 text-gray-900' 
        onClick={() => router.back()}
      >
        <ChevronLeft size={14}/>
      </Button>

      <h1 className='text-xl text-slate-900 font-semibold'>{name || '...'}</h1>
    </div>
  );
}

export {StoreHeader};