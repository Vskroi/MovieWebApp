import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const SearchInput = ({
  setIsActiveSearch,
  isActiveSearch
  ,onChange,
  value,
  onClick,
}: {
  isActiveSearch: boolean;
  setIsActiveSearch: (_isActiveSearch: boolean) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value:string
}) => {
  const [style, setStyle] = useState(isActiveSearch ? "block" : "hidden");
  const handleClick = () => {
    setIsActiveSearch(true);
    setStyle("block");
    onClick
  };
  useEffect(() => {
    setStyle(isActiveSearch ? "block" : "hidden");
  }, [isActiveSearch]);
  return (
    <div className="flex w-full h-9 gap-[10px] items-center justify-end border px-3 rounded-md ">
      <Search size={16} onClick={handleClick} />
      <Input
         onChange={onChange}
         value={value}
        placeholder="Search..."
        className={cn(
            "h-7 focus-visible:ring-0 border-0 w-[200px] xl:w-[379px] outline-none rounded-none hidden lg:block",
          style
        )}
      />
    </div>
  );
};