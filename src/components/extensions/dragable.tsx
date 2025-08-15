import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { IoMdMore } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import classNames from "classnames";

interface IDraggable {
  children: ReactNode;
  id: string;
  disabled?: boolean;
  showHandle?: boolean;
  handlePosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
  className?: string;
}

function Draggable({
  children,
  id,
  disabled = false,
  showHandle = true,
  handlePosition = "bottom-right",
  className = "",
}: IDraggable) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000, // Ensure dragging item is on top
      }
    : undefined;

  const getHandlePositionClasses = () => {
    switch (handlePosition) {
      case "top-left":
        return "top-1 left-1";
      case "top-right":
        return "top-1 right-1";
      case "bottom-left":
        return "bottom-1 left-1";
      case "bottom-right":
        return "bottom-1 right-1";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      default:
        return "top-1 right-1";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        "relative group transition-all duration-200 ease-in-out",
        "hover:shadow-lg hover:scale-[1.01]",
        isDragging && [
          "shadow-2xl scale-105 rotate-1",
          "ring-2 ring-blue-400/50",
          "bg-white/95 backdrop-blur-sm",
        ],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Content */}
      <div
        className={classNames(
          "h-full w-full transition-all duration-200",
          isDragging && "pointer-events-none"
        )}
      >
        {children}
      </div>

      {/* Drag handle */}
      {showHandle && !disabled && (
        <button
          {...listeners}
          {...attributes}
          className={classNames(
            "absolute flex items-center justify-center",
            "w-7 h-7 rounded-full",
            "bg-gray-100 hover:bg-gray-200 active:bg-gray-300",
            "border border-gray-300 hover:border-gray-400",
            "transition-all duration-200 ease-in-out",
            "cursor-grab active:cursor-grabbing",
            "shadow-sm hover:shadow-md",
            "opacity-0 group-hover:opacity-100",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
            isDragging &&
              "opacity-100 bg-blue-100 border-blue-400 cursor-grabbing",
            getHandlePositionClasses()
          )}
          title="Drag to move"
          aria-label="Drag handle"
        >
          <MdDragIndicator
            className={classNames(
              "w-4 h-4 text-gray-600 transition-colors",
              isDragging && "text-blue-600"
            )}
          />
        </button>
      )}

      {/* Visual feedback overlay for dragging */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-50/20 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}

export default Draggable;
