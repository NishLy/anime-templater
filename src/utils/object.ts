import { ElementNodes, ElementSchema } from "@/type/schema";

export function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function getNestedSchema(arr: ElementNodes, path: string) {
  const segments = path.split(".");
  if (segments.length === 0) return null;

  const [currentKey, ...rest] = segments;

  for (const obj of arr) {
    if (obj instanceof ElementSchema && obj.key === currentKey) {
      if (rest.length === 0) {
        // Found the target schema
        return obj;
      }
      if (obj.props?.children) {
        // Search deeper
        return getNestedSchema(obj.props.children, rest.join("."));
      }
      return null;
    }
  }

  return null; // Not found
}

export function setNestedSchema(
  arr: ElementNodes,
  path: string,
  updater: (node: ElementSchema) => void
): boolean {
  const segments = path.split(".");
  if (segments.length === 0) return false;

  const [currentKey, ...rest] = segments;

  for (const obj of arr) {
    if (obj instanceof ElementSchema && obj.key === currentKey) {
      if (rest.length === 0) {
        // Apply update to the found node
        updater(obj);
        return true;
      }
      if (obj.props?.children) {
        // Continue deeper
        return setNestedSchema(obj.props.children, rest.join("."), updater);
      }
      return false;
    }
  }

  return false; // Not found
}

export function createNested(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => {
    if (!(key in acc) || typeof acc[key] !== "object") {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
}

export function deleteNested(obj: any, path: string) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  if (!lastKey) return;
  const parent = keys.reduce((acc, key) => acc?.[key], obj);

  if (parent && lastKey in parent) {
    delete parent[lastKey];
    return true; // deleted successfully
  }
  return false; // nothing to delete
}

export function setNestedImmutable(
  arr: ElementNodes,
  path: string,
  updater: (node: ElementSchema, parentKey?: string) => ElementSchema,
  parentKey?: string
): ElementNodes {
  const segments = path.split(".");
  if (segments.length === 0) return arr;

  const [currentKey, ...rest] = segments;

  return arr.map((obj) => {
    if (obj instanceof ElementSchema) {
      const objSegments = (obj?.key ?? "").split(".");

      if (objSegments[objSegments.length - 1] === currentKey) {
        if (rest.length === 0) {
          return updater(obj, parentKey); // return updated node
        }
        if (obj.props?.children) {
          return new ElementSchema(obj.type, obj.key, {
            ...obj.props,
            children: setNestedImmutable(
              obj.props.children,
              rest.join("."),
              updater,
              currentKey
            ),
          });
        }
      }
    }
    return obj; // unchanged
  });
}
