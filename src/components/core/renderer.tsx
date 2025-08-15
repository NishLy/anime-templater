import ComponentRegistry from "@/registry/components";
import { ElementNodes, ElementSchema } from "@/type/schema";
import { isValidElement } from "react";

interface IRender {
  contents: ElementNodes;
}

const Render = (props: IRender) => {
  return (
    <>
      {props.contents.map((e, i) => {
        if (isValidElement(e)) return e;
        if (!(e instanceof ElementSchema)) return e;

        const Component = ComponentRegistry[e.type];

        return (
          <Component key={e.key}>
            {e.props?.children && <Render contents={e.props.children} />}
          </Component>
        );
      })}
    </>
  );
};

export default Render;
