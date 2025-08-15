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
      const activeSegments = activeId.split(".");
      const overId = actions.payload.overId;
      const overSegment = overId.split(".");

      let movingNode: ElementSchema;

      const oldParentState = setNestedImmutable(
        state.contents,
        activeSegments.slice(0, -1).join("."),
        (node, parentKey) => {
          node.props!.children = node.props?.children?.filter((e) => {
            if (e instanceof ElementSchema) {
              if (e.key === activeSegments[activeSegments.length - 1]) {
                movingNode = e;
                return false;
              }
            }

            return true;
          });

          return node;
        }
      );

      const newParentState = setNestedImmutable(
        oldParentState,
        overId,
        (node, parentKey) => {
          if (!node.props) {
            node.props = {
              children: [],
            };
          }

          if (!node.props?.children) {
            node.props.children = [];
          }

          node.props!.children = [...node.props?.children, movingNode];

          return node;
        }
      );

      state.contents = newParentState;
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
