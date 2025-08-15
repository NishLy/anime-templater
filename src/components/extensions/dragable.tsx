import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface IDraggable {
  children: ReactNode;
  id: string;
}

function Draggable(props: IDraggable) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

export default Draggable;
