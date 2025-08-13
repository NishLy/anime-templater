import Droppable from "@/components/dropable";
import { MenuItem } from "@/components/dropdown-container";
import GridContainer from "@/components/grid-container";
import { ReactNode, useState } from "react";

const useComponentMenus = (): [MenuItem[], ReactNode?] => {
  const [currentNode, setCurrentNode] = useState<ReactNode>();
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
    ],
    currentNode,
  ];
};

export default useComponentMenus;
