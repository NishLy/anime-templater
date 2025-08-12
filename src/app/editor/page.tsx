"use client";

import Draggable from "@/components/dragable";
import Droppable from "@/components/dropable";
import GridContainer from "@/components/grid-container";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";

interface IContainer {
  children: string[];
  name: string;
}

interface Wrapper {
  [key: string]: IContainer;
}

const Editor = () => {
  const [containers, setContainers] = useState<Wrapper>({
    "1": {
      children: ["item-1", "item-2"],
      name: "A",
    },
    "2": {
      children: ["item-3"],
      name: "B",
    },
    "3": {
      children: [],
      name: "C",
    },
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [nextItemId, setNextItemId] = useState(4);
  const [nextContainerId, setNextContainerId] = useState(4);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Find source container
    const sourceContainerEntry = Object.entries(containers).find(
      ([_, container]) => container.children.includes(activeId)
    );

    if (!sourceContainerEntry) return;

    const [sourceId] = sourceContainerEntry;
    const destId = overId;

    // Don't do anything if dropping in the same container
    if (sourceId === destId) return;

    // Check if destination container exists
    if (!containers[destId]) return;

    setContainers((prev) => {
      const next = { ...prev };

      // Remove from source
      next[sourceId] = {
        ...next[sourceId],
        children: next[sourceId].children.filter((item) => item !== activeId),
      };

      // Add to destination (avoid duplicates)
      if (!next[destId].children.includes(activeId)) {
        next[destId] = {
          ...next[destId],
          children: [...next[destId].children, activeId],
        };
      }

      return next;
    });
  }

  const addNewContainer = () => {
    const newId = nextContainerId.toString();
    setContainers((prev) => ({
      ...prev,
      [newId]: {
        children: [],
        name: String.fromCharCode(65 + (nextContainerId - 1)), // A, B, C, D, etc.
      },
    }));
    setNextContainerId((prev) => prev + 1);
  };

  const addNewItem = () => {
    const newItemId = `item-${nextItemId}`;
    const firstContainerId = Object.keys(containers)[0];

    if (firstContainerId) {
      setContainers((prev) => ({
        ...prev,
        [firstContainerId]: {
          ...prev[firstContainerId],
          children: [...prev[firstContainerId].children, newItemId],
        },
      }));
      setNextItemId((prev) => prev + 1);
    }
  };

  const removeContainer = (containerId: string) => {
    if (Object.keys(containers).length <= 1) return; // Keep at least one container

    setContainers((prev) => {
      const next = { ...prev };
      delete next[containerId];
      return next;
    });
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <GridContainer className="w-full">
            {Object.entries(containers).map(([id, container]) => (
              <Droppable key={id} id={id} items={container.children}>
                {(items) => (
                  <>
                    {items.map((itemId) => (
                      <Draggable key={itemId} id={itemId}>
                        <div className="bg-green-300 hover:bg-green-400 p-3 rounded-md shadow-sm cursor-grab active:cursor-grabbing transition-colors">
                          <div className="text-sm font-medium text-green-800">
                            {itemId}
                          </div>
                        </div>
                      </Draggable>
                    ))}
                  </>
                )}
              </Droppable>
            ))}
          </GridContainer>
          <DragOverlay>
            {activeId ? (
              <div className="bg-green-300 p-3 rounded-md shadow-lg rotate-3 opacity-80">
                <div className="text-sm font-medium text-green-800">
                  {activeId}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;
