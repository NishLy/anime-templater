import Draggable from "@/components/extensions/dragable";
import Droppable from "@/components/extensions/dropable";
import GridContainer from "@/components/extensions/grid-container";
import TextComponent from "@/components/extensions/text";
import { ElementType, Fragment } from "react";

const ComponentRegistry: Record<string, ElementType> = {
  grid: GridContainer,
  dropable: Droppable,
  dragable: Draggable,
  text: TextComponent,

  plain: Fragment,
};

export default ComponentRegistry;
