import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { IoMdMore } from "react-icons/io";

interface IDraggable {
  children: ReactNode;
  id: string;
}

function Draggable({ children, id }: IDraggable) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative h-full w-full min-h-20"
    >
      <button
        {...listeners} // attach drag events only to the button
        {...attributes}
        className="cursor-grab bottom-0 right-0"
      >
        <IoMdMore />
      </button>
      {/* Your normal content */}
      <div>{children}</div>

      {/* Drag handle button */}
    </div>
  );
}

export default Draggable;
