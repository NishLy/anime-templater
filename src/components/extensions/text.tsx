import React from "react";

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextComponentProps extends React.HTMLAttributes<HTMLElement> {
  tag?: TextTag;
  children?: React.ReactNode;
}

function TextComponent({ tag, children, ...rest }: TextComponentProps) {
  switch (tag) {
    case "h1":
      return <h1 {...rest}>{children}</h1>;
    case "h2":
      return <h2 {...rest}>{children}</h2>;
    case "h3":
      return <h3 {...rest}>{children}</h3>;
    case "h4":
      return <h4 {...rest}>{children}</h4>;
    case "h5":
      return <h5 {...rest}>{children}</h5>;
    case "h6":
      return <h6 {...rest}>{children}</h6>;
    case "p":
      return <p {...rest}>{children}</p>;
    case "span":
    default:
      return <span {...rest}>{children}</span>;
  }
}

export default TextComponent;
