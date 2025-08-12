"use client";

import Draggable from "@/components/dragable";
import Droppable from "@/components/dropable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

interface IContainer {
  children: string[];
  name: string;
}

interface Wrapper {
  [key: number | string]: IContainer;
}

const Editor = () => {
  const [containers, setContainers] = useState<Wrapper>({
    1: {
      children: ["first"],
      name: "A",
    },
    2: {
      children: [],
      name: "b",
    },
    3: {
      children: [],
      name: "c",
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const sourceId = Object.keys(containers).find((key) =>
      containers[parseInt(key)].children.includes(active.id.toString())
    );

    if (!sourceId) return;

    const destId = over.id;

    if (sourceId && destId && sourceId !== destId) {
      setContainers((prev) => {
        const next = { ...prev };
        next[sourceId].children = Array.from(
          new Set(next[sourceId].children.filter((item) => item !== active.id))
        );
        next[destId].children = Array.from(
          new Set([...next[destId].children, active.id.toString()])
        );
        return next;
      });
    }
  }
  return (
    <div className="w-screen">
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {Object.entries(containers).map(([id, items]) => (
            <Droppable<string> key={id} id={id} items={items.children}>
              {(item) => (
                <div className="w-24 h-24 bg-white">
                  {item.map((e) => (
                    <Draggable key={e} id={e}>
                      <button className="bg-green-300">Drop me</button>
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Editor;
