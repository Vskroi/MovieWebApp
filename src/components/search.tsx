import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const SearchInput = ({
  setIsActiveSearch,
  isActiveSearch
  ,onChange,
  value,
}: {
  isActiveSearch: boolean;
  setIsActiveSearch: (_isActiveSearch: boolean) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value:string
}) => {
  const [style, setStyle] = useState(isActiveSearch ? "block" : "hidden");
  const handleClick = () => {
    setIsActiveSearch(true);
    setStyle("block");
  };
  useEffect(() => {
    setStyle(isActiveSearch ? "block" : "hidden");
  }, [isActiveSearch]);
  return (
    <div className="flex h-9 gap-[10px] items-center border px-3 rounded-md ">
      <Search size={16} onClick={handleClick} />
      <Input
         onChange={onChange}
         value={value}
        placeholder="Search..."
        className={cn(
            "h-7 focus-visible:ring-0 border-0 w-[200px] xl:w-[379px] outline-none rounded-none hidden sm:block",
          style
        )}
      />
    </div>
  );
};