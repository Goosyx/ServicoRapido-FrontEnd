import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  setValue: (text: string) => void;
}

export function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <div className="flex rounded-md bg-slate-100 gap-2 max-w-96 w-full">
      <Input 
        className="border-0 bg-transparent ring-0 !outline-none focus:!outline-none focus:!ring-0 focus:!ring-offset-0"
        placeholder="Busque um produto aqui"
        value={value}
        onBlur={() => {
          setTimeout(() => setValue(''), 1000)
        }}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="bg-slate-100 text-gray-900 hover:bg-slate-200">
        <Search height={20}/>
      </Button>
    </div>
  )
}