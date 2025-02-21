"use client";

import { StoreHeader } from "./storeHeader";
import StoreProductList from "./storeProductList";
import RecentsProductList from "./recentsProductList";


const RecentsPage = () => {

  return (
    <div className="w-full flex flex-col gap-4">
      <StoreHeader name='Recentes'/>
      <RecentsProductList/>
    </div>
  );
};

export default RecentsPage;
