import React, { ReactNode, useState, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

interface IDraggable {
  children: ReactNode;
  id: string;
  holdDelay?: number; // ms
}

function Draggable({ children, id, holdDelay = 200 }: IDraggable) {
  const [canDrag, setCanDrag] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const startHold = () => {
    holdTimer.current = setTimeout(() => {
      setCanDrag(true);
    }, holdDelay);
  };

  const cancelHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    setCanDrag(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Start hold timer on pointer down
      onPointerDown={startHold}
      // Cancel if released or moved before delay
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      // Only attach drag listeners if hold delay passed
      {...(canDrag ? listeners : {})}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Draggable;
