import classNames from "classnames";
import { CSSProperties, ReactNode, useState } from "react";
import DropdownContainer from "./dropdown-container";
import CustomizableContainer from "./customizable-container";
import { useCustomizationMenus } from "@/utils/customization-menus";

interface IGridContainer {
  className?: string;
  children: ReactNode;
}
const GridContainer = (props: IGridContainer) => {
  const [menus, style] = useCustomizationMenus();
  return (
    <DropdownContainer menus={menus}>
      <CustomizableContainer
        className={classNames(props.className, "grid", "grid-cols-3")}
        style={style}
      >
        {props.children}{" "}
      </CustomizableContainer>
    </DropdownContainer>
  );
};

export default GridContainer;
