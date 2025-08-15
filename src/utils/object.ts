export function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
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
