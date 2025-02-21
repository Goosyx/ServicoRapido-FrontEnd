"use client";

import React from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface IFooterProps {}

function Footer({}: IFooterProps) {
  return (
    <div className="w-full p-4 bg-slate-100 flex items-center justify-center">
      <div className="flex items-center justify-center w-full max-w-7xl p-4">
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-center justify-center">
            <p>© {format(new Date(), "yyyy")}, Serviço Rápido</p>
            <Button
              variant={"link"}
              className="text-xs"
              onClick={() => window.open("https://www.gerarmemes.com.br/", "_blank")}
            >
              Regulamento Serviço Rápido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Footer };
