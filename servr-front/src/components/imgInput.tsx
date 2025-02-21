"use client";

import { useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type fileUrl = {
  file: File;
  url: string;
};

export default function ImgInput({
  submitImgs,
  disabled,
}: {
  submitImgs: (img: fileUrl[] | null) => void;
  disabled?: boolean;
}) {
  const [files, setFiles] = useState<fileUrl[] | null>();
  const [loading, setLoading] = useState<boolean>();

  const { toast } = useToast();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const file = event.target.files;

    if (file?.length === 0) return;

    setLoading(true);

    const reader = new FileReader();

    for (let i = 0; i < file!.length; i++) {
      reader.readAsDataURL(file![i]);
      reader.onloadend = () => {
        setFiles((prev) => {
          if (prev) {
            return [...prev, { file: file![i], url: reader.result as string }];
          } else {
            return [{ file: file![i], url: reader.result as string }];
          }
        });
        setLoading(false);
        submitImgs([{ file: file![i], url: reader.result as string }]);
      };
    }

    reader.onerror = () => {
      toast({
        title: "Erro ao carregar a imagem",
        variant: "destructive",
      });
      setLoading(false);
    };
  };

  return (
    <div
      className={`w-full p-8 bg-nhBgWhite rounded-lg relative items-center text-center flex gap-4 border-2 border-slate-200 justify-center flex-wrap ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <Loader2 className="animate-spin w-16 h-16" />
      ) : (
        <>
          {files ? (
            files.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={file.url || ""}
                  width={200}
                  height={200}
                  alt="Imagem"
                  className="bg-cover"
                />
                <Button
                  className="absolute top-0 right-0 p-1 bg-nhRed rounded-full"
                  onClick={() => {
                    setFiles((prev) => {
                      if (prev) {
                        return prev.filter((_, i) => i !== index);
                      }
                    });
                    submitImgs(null);
                  }}
                >
                  <ImageIcon className="w-4 h-4 text-textWhite" />
                </Button>
              </div>
            ))
          ) : (
            // <Image
            //   src={files?.url || ""}
            //   width={200}
            //   height={200}
            //   alt="Imagem"
            // />
            <ImageIcon className={`w-8 h-8 text-textBlack `} />
          )}
          {!files ? (
            <h1>
              Clique ou arraste para adicionar as{" "}
              <strong>fotos de seu produto</strong>
            </h1>
          ) : null}
        </>
      )}
      <Input
        className={`block w-full h-full absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer ${
          disabled ? "pointer-events-none " : ""
        }`}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
}
