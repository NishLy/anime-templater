import Draggable from "@/components/extensions/dragable";
import { MenuItem } from "@/components/extensions/dropdown-container";
import ImagePickerModal from "@/components/modal/image-picker";
import { closeModal, setModal } from "@/store/modal-slice";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { randomBase64 } from "./hash";
import GridContainer from "@/components/extensions/grid-container";

const useComponentMenus = (): [
  MenuItem[],
  { key?: string; node: ReactNode }
] => {
  const [currentNode, setCurrentNode] = useState<ReactNode>();
  const [key, setKey] = useState<string | undefined>();

  const keyMenu = useMemo(() => randomBase64(16), []);

  const dispatch = useDispatch();

  const handlePickImage = (src: string) => {
    dispatch(closeModal());
    return setCurrentNode(
      <img
        src={src}
        alt="picked-image"
        className="w-full h-full object-cover "
      />
    );
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
        cb: () =>
          setCurrentNode(
            <GridContainer>
              <></>
            </GridContainer>
          ),
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
      node: (
        <Draggable id={keyMenu} key={keyMenu}>
          {currentNode}
        </Draggable>
      ),
    },
  ];
};

export default useComponentMenus;
