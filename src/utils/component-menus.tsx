import Draggable from "@/components/extensions/dragable";
import { MenuItem } from "@/components/extensions/dropdown-container";
import ImagePickerModal from "@/components/modal/image-picker";
import { closeModal, setModal } from "@/store/modal-slice";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { randomBase64 } from "./hash";
import ComponentRegistry from "@/registry/components";

const useComponentMenus = (): [
  MenuItem[],
  { key?: string; node: keyof typeof ComponentRegistry | undefined },
  reset: () => void,
  set: (arg: keyof typeof ComponentRegistry) => void
] => {
  const [currentNode, setCurrentNode] = useState<
    keyof typeof ComponentRegistry | undefined
  >();
  const [key, setKey] = useState<string | undefined>();

  const dispatch = useDispatch();

  const handlePickImage = (src: string) => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (currentNode) {
      setKey(randomBase64(16));
    }
  }, [currentNode]);

  return [
    [
      {
        label: "Grid",
        name: "grid",
        cb: () => setCurrentNode("grid"),
      },
      {
        label: "Text",
        name: "text",
        cb: () => setCurrentNode("text"),
      },
      {
        label: "Image",
        name: "image",
        cb: () => {
          dispatch(
            setModal({
              title: "Select Image",
              content: <ImagePickerModal onSelect={handlePickImage} />,
            })
          );
        },
      },
    ],
    {
      key,
      node: currentNode,
    },
    () => setCurrentNode(undefined),
    (arg) => setCurrentNode(arg),
  ];
};

export default useComponentMenus;
