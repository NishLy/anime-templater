import ComponentRegistry from "@/registry/components";

export interface ElementSchema {
  key: string;
  props?: {
    children: ElementNodes;
    [key: string]: unknown;
  };
  type: keyof typeof ComponentRegistry;
}

export interface ElementNodes {
  [key: string]: ElementSchema;
}
