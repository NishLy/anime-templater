import { useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import CustomizableContainer from "./customizable-container";
import { useCustomizationMenus } from "@/utils/customization-menus";
import DropdownContainer from "./dropdown-container";
import { ReactNode, useState } from "react";
import useComponentMenus from "@/utils/component-menus";

interface IDroppable<T> {
  children: ReactNode;
  id: string;
}

function Droppable<T>(props: IDroppable<T>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const [menus, style] = useCustomizationMenus();
  const [components, node] = useComponentMenus();

  const [colspan, setColspan] = useState("cols-span-1");

  return (
    <DropdownContainer
      menusMore={[
        {
          label: "Cols Span",
          name: "borderStyle",
          element: (
            <select
              onChange={(e) => setColspan(e.target.value)}
              style={{ padding: "4px", fontSize: "12px", borderRadius: "4px" }}
            >
              <option value="">Select style</option>
              <option value="col-span-1">1</option>
              <option value="col-span-2">2</option>
              <option value="col-span-3">3</option>
            </select>
          ),
        },
        ...menus,
      ]}
      menusAdd={components}
      className={colspan}
    >
      <div
        style={style}
        ref={setNodeRef}
        className={classNames(
          " text-black shadow-md flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-32 hover:border-gray-400 transition-colors"
        )}
      >
        <CustomizableContainer>
          {!props.children && !node && (
            <div className="w-full h-full text-center">dropable</div>
          )}
          {node}
        </CustomizableContainer>
      </div>
    </DropdownContainer>
  );
}

export default Droppable;
