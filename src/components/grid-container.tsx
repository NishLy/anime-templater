import classNames from "classnames";
import { ReactNode } from "react";
import DropdownContainer from "./dropdown-container";

interface IGridContainer {
  className?: string;
  children: ReactNode;
}
const GridContainer = (props: IGridContainer) => {
  return (
    <DropdownContainer menus={[]}>
      <div className={classNames(props.className, "grid", "grid-cols-3")}>
        {props.children}{" "}
      </div>
    </DropdownContainer>
  );
};

export default GridContainer;
