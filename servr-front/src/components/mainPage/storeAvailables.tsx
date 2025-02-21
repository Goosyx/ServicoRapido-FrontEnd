'use client'

import { Button } from "../ui/button";
import Card1 from "./section1Card";
import { StoreRes } from "../../types/storeType";
import { useRouter } from "next/navigation";

type StoreAvailablesProps = {
  stores: StoreRes[];
  all?: boolean;
};

const StoreAvailables = ({ stores, all }: StoreAvailablesProps) => {
  const router = useRouter();


  function goToAllStore() {
    router.push('/store')
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl">Lojas disponíveis</h1>
        <div className="flex justify-between items-center">
          <p className="text-slate-400">A ideal está aqui</p>
          {all ? null : <Button variant={`link`} onClick={goToAllStore}>Ver mais</Button>}
        </div>
      </div>
      <div className="flex w-full gap-4 justify-center max-lg:flex-col">
        <div className="!grid w-full !grid-cols-6 gap-4 max-lg:!grid-cols-4 max-md:!grid-cols-3 max-sm:!grid-cols-2">
          {stores?.map((store, index) => {
            if (!store) return null;
            if (!all && index > 6) return null;
            return (
              <Card1
                id={store.user?.id!}
                key={index}
                src={store.image || "/no-image.jpg"}
                text={store.name}
                store
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StoreAvailables;
