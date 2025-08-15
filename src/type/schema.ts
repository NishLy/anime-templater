import ComponentRegistry from "@/registry/components";

export class ElementSchema {
  constructor(
    public type: keyof typeof ComponentRegistry,
    public key?: string,
    public props?: {
      children?: ElementNodes;
      [key: string]: unknown;
    }
  ) {}
}

export type ElementNodes = (
  | ElementSchema
  | string
  | number
  | null
  | undefined
  | boolean
)[];
