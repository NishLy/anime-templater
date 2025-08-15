import { VariantClass } from "@/utils/variant";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  variant: VariantClass;
  focus?: boolean;
}

const Textarea: React.FC<IInputProps> = ({
  variant,
  className,
  focus,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focus) inputRef.current?.focus();
  }, []);

  return (
    <textarea
      ref={inputRef}
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

export default Textarea;
