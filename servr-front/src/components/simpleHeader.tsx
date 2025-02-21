"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { MiniHeader } from "./miniHeader";

type SimpleHeaderProps = {
  title?: string;
};

const SimpleHeader = ({ title }: SimpleHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center border border-b-[1px] border-b-secondary">
      <MiniHeader/>

      <div className="flex items-center justify-between w-full max-w-7xl p-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex justify-between items-center gap-4 w-full">
            <Button
              className="w-24"
              variant={`ghost`}
              onClick={() => {
                router.back();
              }}
            >
              <ChevronLeft size={"2rem"} />
            </Button>
            <h1 className="text-primary font-bold text-2xl">SERVIÇO RÁPIDO</h1>
            <div className="w-24"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
