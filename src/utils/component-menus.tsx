import Draggable from "@/components/dragable";
import { MenuItem } from "@/components/dropdown-container";
import GridContainer from "@/components/grid-container";
import ImagePickerModal from "@/components/modal/image-picker";
import { closeModal, setModal } from "@/store/modal-slice";
import { ReactNode, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { randomBase64 } from "./hash";

const useComponentMenus = (): [MenuItem[], ReactNode?] => {
  const [currentNode, setCurrentNode] = useState<ReactNode>();

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
    <Draggable id={keyMenu} key={keyMenu}>
      {currentNode}
    </Draggable>,
  ];
};

export default useComponentMenus;
