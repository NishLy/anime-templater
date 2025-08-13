// store/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: ReactNode;
  footer?: ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (
      state,
      action: PayloadAction<{
        title?: string;
        content: ReactNode;
        footer?: ReactNode;
      }>
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.footer = action.payload.footer;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = undefined;
      state.content = undefined;
      state.footer = undefined;
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
