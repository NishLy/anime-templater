import { VariantClass } from "@/utils/variant";
import classNames from "classnames";
import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: VariantClass;
}

const Input: React.FC<IInputProps> = ({ variant, className, ...rest }) => {
  return (
    <input
      {...rest}
      className={classNames(
        variant,
        className,
        "w-full",
        "border-2 outline-blue-500 rounded-md"
      )}
    />
  );
};

export default Input;
