import ComponentRegistry from "@/registry/components";
import { ElementNodes, ElementSchema } from "@/type/schema";
import { cloneElement, Fragment, isValidElement, useMemo } from "react";

interface IRender {
  contents: ElementNodes;
}

const renderRecursive = (arr: ElementNodes): React.ReactNode[] => {
  return arr.map((e, i) => {
    if (isValidElement(e)) {
      return cloneElement(e, { key: e.key || i });
    }

    if (!(e instanceof ElementSchema)) {
      // Wrap primitive types like string/number into a span or fragment
      return <Fragment key={i}>{e}</Fragment>;
    }

    const Component = ComponentRegistry[e.type];
    // Always render children — even if it's a string or number
    const children = e.props?.children
      ? Array.isArray(e.props.children)
        ? renderRecursive(e.props.children)
        : e.props.children
      : null;

    return <Component key={e.key || i}>{children}</Component>;
  });
};

const Render = (props: IRender) => {
  const memoizedContents = useMemo(
    () => renderRecursive(props.contents),
    [props.contents]
  );

  return <>{memoizedContents}</>;
};

export default Render;
