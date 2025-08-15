/* eslint-disable @typescript-eslint/no-explicit-any */
// store/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface IContainer {
  children?: Wrapper;
  name?: string;
  dropable?: boolean;
}

export interface Wrapper {
  [key: string]: IContainer;
}

interface EditorState {
  contents: Wrapper;
}

const initialState: EditorState = {
  contents: {
    new: {
      name: "dropable-1",
      dropable: true,
    },
  },
};

function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function createNested(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => {
    if (!(key in acc) || typeof acc[key] !== "object") {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
}

function deleteNested(obj: any, path: string) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  if (!lastKey) return;
  const parent = keys.reduce((acc, key) => acc?.[key], obj);

  if (parent && lastKey in parent) {
    delete parent[lastKey];
    return true; // deleted successfully
  }
  return false; // nothing to delete
}

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
      const key = actions.payload.key;
      const parentKey = actions.payload.parentKey;
      const node = actions.payload.node;
      createNested(state.contents, parentKey + ".children." + key);
      getNested(state.contents, parentKey + ".children." + key).node = node;
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
