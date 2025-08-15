import Draggable from "@/components/extensions/dragable";
import Droppable from "@/components/extensions/dropable";
import GridContainer from "@/components/extensions/grid-container";

const ComponentRegistry = {
  grid: GridContainer,
  dropable: Droppable,
  dragable: Draggable,
};

export default ComponentRegistry;
