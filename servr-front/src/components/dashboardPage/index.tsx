"use client";

import { Button } from "../../components/ui/button";
import { Divider } from "../divider";
import { DataForm } from "./DataForm";
import { StoreForm } from "./StoreForm";

export default function DashboardPage() {
  return (
    <div className="items-center justify-center flex flex-col md:flex-row mt-12 mb-12 w-full">
      <div className="flex items-center justify-between w-full max-w-7xl max-lg:justify-center p-4">
        <div className="flex gap-4 w-full flex-col md:flex-row">
          <div className="w-full bg-white border border-b-[1px] border-b-secondary shadow-md rounded-md p-4 flex flex-col gap-4">
            <StoreForm />
            <Divider />
            <DataForm />
          </div>
          <div className="w-full md:w-96 bg-white border border-b-[1px] border-b-secondary shadow-md rounded-md p-4 flex flex-row md:flex-col gap-2">
            {/* <Button className="w-full">Notificações</Button>
            <Button className="w-full">Termos e políticas</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
