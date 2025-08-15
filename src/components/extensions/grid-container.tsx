import classNames from "classnames";
import CustomizableContainer from "./customizable-container";
import { useCustomizationMenus } from "@/utils/customization-menus";
import { ReactNode, useEffect } from "react";
import useComponentMenus from "@/utils/component-menus";
import DropdownContainer from "./dropdown-container";
import { useDispatch } from "react-redux";
import { add } from "@/store/editor-slice";
import { randomBase64 } from "@/utils/hash";

interface IGridContainer {
  className?: string;
  children: ReactNode;
  id: string;
}
const GridContainer = (props: IGridContainer) => {
  const [menus, style] = useCustomizationMenus();

  const dispatch = useDispatch();

  const handleAddContainer = () => {
    dispatch(
      add({
        parentKey: props.id,
        key: randomBase64(16),
        node: "dropable",
        dragable: false,
      })
    );
  };

  return (
    <DropdownContainer
      menusMore={menus}
      menusAdd={[
        {
          label: "container",
          name: "container",
          cb: handleAddContainer,
        },
      ]}
    >
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
