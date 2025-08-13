"use client";
// components/GlobalModal.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeModal } from "@/store/modal-slice";
import { IoClose } from "react-icons/io5";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, content, footer } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch(closeModal())}
      ></div>

      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-lg w-full p-6 z-10 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <IoClose />
          </button>
        </div>

        <div className="mb-4">{content}</div>

        {footer && <div className="pt-4 border-t">{footer}</div>}
      </div>
    </div>
  );
};

export default GlobalModal;
