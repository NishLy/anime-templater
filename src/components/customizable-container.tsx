import classNames from "classnames";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

interface ICustomizableContainer {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export interface IStateCustomizable extends CSSProperties {
  [key: string]: unknown;
}

const CustomizableContainer = (props: ICustomizableContainer) => {
  return (
    <div className={classNames(props.className, "w-full")} style={props.style}>
      {props.children}
    </div>
  );
};

export default CustomizableContainer;
