import React from "react";

type AllowedTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";

type AsProp<T extends AllowedTags> = {
  as?: T;
};

type PropsTo<T extends AllowedTags> = AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProp<T>>;

function TextComponent<T extends AllowedTags = "span">({
  as,
  children,
  ...rest
}: PropsTo<T>) {
  const Component: React.ElementType = as || "span";
  return <Component {...rest}>{children}</Component>;
}

export default TextComponent;
