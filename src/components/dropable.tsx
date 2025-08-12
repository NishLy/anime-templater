import { useDroppable } from "@dnd-kit/core";

interface IDroppable<T> {
  children: (items: T[]) => React.ReactNode;
  id: string;
  items: T[];
}

function Droppable<T>(props: IDroppable<T>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children(props.items)}
    </div>
  );
}

export default Droppable;
