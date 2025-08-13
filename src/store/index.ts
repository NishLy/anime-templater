// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import editorReducer from "./editor-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
