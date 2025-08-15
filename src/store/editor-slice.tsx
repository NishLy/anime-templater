/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modalSlice.ts
import { ElementNodes, ElementSchema } from "@/type/schema";
import { getNested, deleteNested, createNested } from "@/utils/object";
import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  contents: ElementNodes;
}

const initialState: EditorState = {
  contents: [
    new ElementSchema("dropable", "drop-a", {
      children: [
        new ElementSchema("text", "text-a", {
          children: ["Drop Here"],
        }),
      ],
    }),
  ],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    dragEnd: (state, actions) => {
      const activeId = actions.payload.activeId as string;
      const overId = actions.payload.overId;
      const key = activeId.split(".").pop();
      if (!key) return;
      // Find source container
      const sourceContainerEntry = getNested(state.contents, activeId);

      if (!sourceContainerEntry) return;

      const [sourceId] = sourceContainerEntry;
      const destId = overId;

      // Don't do anything if dropping in the same container
      if (sourceId === destId) return;

      // Check if destination container exists
      if (!state.contents[destId]) return;

      // Remove from source
      deleteNested(state.contents, sourceId);

      // Add to destination (avoid duplicates)
      createNested(state.contents, overId + "." + key);
    },
    add(state, actions) {
      const { key, parentKey, node } = actions.payload;

      createNested(state.contents, parentKey + ".children");

      const parentChildren = getNested(state.contents, parentKey + ".children");

      // Remove `key` from the node if it exists
      const { key: _, ...cleanNode } = node;

      parentChildren[key] = cleanNode;
    },
    remove(state, actions) {
      const key = actions.payload.key;
      const parentKey = actions.payload.parentKey;
      deleteNested(state.contents, parentKey + "." + key);
    },
  },
});

export const { dragEnd, add, remove } = editorSlice.actions;
export default editorSlice.reducer;
