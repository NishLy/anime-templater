import classNames from "classnames";
import DropdownContainer from "./dropdown-container";
import CustomizableContainer from "./customizable-container";
import { useCustomizationMenus } from "@/utils/customization-menus";
import { ReactNode } from "react";

interface IGridContainer {
  className?: string;
  children: ReactNode;
}
const GridContainer = (props: IGridContainer) => {
  const [menus, style] = useCustomizationMenus();
  return (
    <DropdownContainer menusMore={menus}>
      <CustomizableContainer
        className={classNames(
          props.className,
          "grid",
          "grid-cols-3",
          "bg-[repeating-linear-gradient(to_right,transparent,transparent_calc(100%/3-1px),rgba(0,0,0,0.3)_calc(100%/3-1px),rgba(0,0,0,0.3)_calc(100%/3))]"
        )}
        style={style}
      >
        {props.children}
      </CustomizableContainer>
    </DropdownContainer>
  );
};

export default GridContainer;
