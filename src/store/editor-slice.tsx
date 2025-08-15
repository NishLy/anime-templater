/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modalSlice.ts
import { ElementNodes, ElementSchema } from "@/type/schema";
import {
  getNested,
  deleteNested,
  createNested,
  setNestedImmutable,
} from "@/utils/object";
import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  contents: ElementNodes;
}

const initialState: EditorState = {
  contents: [
    new ElementSchema("grid", "main-container", {
      id: "base-container",
      children: [
        new ElementSchema("dropable", "drop-a", {
          children: [],
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
      const { key, parentKey, node, dragable = true } = actions.payload;

      const dragableSchema = dragable
        ? new ElementSchema("dragable", key, {
            children: [new ElementSchema(node, key)],
          })
        : new ElementSchema(node, key);

      const newState = setNestedImmutable(state.contents, parentKey, (node) => {
        if (!node.props) {
          node.props = {
            children: [],
          };
        }

        if (!node.props?.children) {
          node.props.children = [];
        }

        node.props!.children = [...node.props!.children, dragableSchema];

        return node;
      });

      state.contents = newState;
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
