"use client";

import Render from "@/components/core/renderer";
import GridContainer from "@/components/extensions/grid-container";
import { RootState } from "@/store";
import { dragEnd } from "@/store/editor-slice";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Editor = () => {
  const { contents } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    dispatch(dragEnd({ activeId, overId }));
  }

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Render contents={contents} />
          {/* <DragOverlay>
            {activeId ? (
              <div className="bg-green-300 p-3 rounded-md shadow-lg rotate-3 opacity-80">
                <div className="text-sm font-medium text-green-800">
                  {activeId}
                </div>
              </div>
            ) : null}
          </DragOverlay> */}
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;
