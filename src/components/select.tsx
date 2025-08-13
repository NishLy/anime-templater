import { VariantClass } from "@/utils/variant";
import Input from "./input";
import { ChangeEvent, useEffect, useState } from "react";

interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ISelect {
  options: IOption[];
  variant: VariantClass;
  onValueChange: (value: string | null) => void;
}

const Select = (props: ISelect) => {
  const [open, setOpen] = useState();
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [filteredOptions, setFilteredOptions] = useState(props.options);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.value) return;
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredOptions(filteredOptions.filter((e) => e.label.includes(search)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    props.onValueChange?.(value);
  }, [props, value]);

  return (
    <div className="relative inline-block w-full">
      <Input variant={props.variant} onChange={handleSearch} />
      <div
        className={`absolute top-20 rounded-md w-72 shadow-2xl overflow-x-hidden max-h-[30rem] overflow-auto right-2 z-50 inline-flex bg-white border-gray-100 transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        } `}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="wrap-normal w-full">
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((item, index) => (
              <div
                key={item.value}
                onClick={() => {
                  setValue(item.value);
                }}
                className={`group flex items-center w-full gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-900"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === props.options.length - 1 ? "rounded-b-lg" : ""
                }`}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                  }
                }}
              >
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center italic">
              No items available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
