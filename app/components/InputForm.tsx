"use client"
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
interface SearchFormProps {
  className?: string
}
const InputForm = ({ className }: SearchFormProps) => {
  const router = useRouter();
  const [search, setSeach] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeach(e.target.value);
  };
  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return
    }
    router.push(`/restaurants?search=${search}`)
  };
  return (
    <form className="flex gap-2 sm:bg-white w-full sm:w-max items-center sm:gap-0 sm:p-3 sm:rounded-lg "
      onSubmit={handleSearchSubmit}>

      <Input
        placeholder="Buscar restaurantes"
        className={cn("border-none sm:bg-white outline-none focus-visible:ring-transparent sm:w-[450px] ", className)}
        onChange={handleChange}
        value={search}

      />
      <Button size="icon" type="submit" className="sm:bg-[#FFB100]"  >
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}

export default InputForm;