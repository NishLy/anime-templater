import { MenuItem } from "@/components/extensions/dropdown-container";
import Input from "@/components/input";
import { VariantClass } from "./variant";
import { CSSProperties, useState } from "react";

export const useCustomizationMenus = (): [MenuItem[], CSSProperties] => {
  const [style, setStyle] = useState<CSSProperties>({});

  const updateStyle = (
    property: keyof CSSProperties,
    value: string | number
  ) => {
    setStyle((prev) => ({ ...prev, [property]: value }));
  };

  return [
    [
      {
        label: "Padding",
        name: "padding",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="16"
            onChange={(e) => updateStyle("padding", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Margin",
        name: "margin",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="8"
            onChange={(e) => updateStyle("margin", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Width",
        name: "width",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="100"
            onChange={(e) => updateStyle("width", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Height",
        name: "height",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="auto"
            onChange={(e) =>
              updateStyle(
                "height",
                e.target.value === "auto" ? "auto" : e.target.value + "px"
              )
            }
          />
        ),
      },
      {
        label: "Background Color",
        name: "backgroundColor",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="#ffffff"
            onChange={(e) => updateStyle("backgroundColor", e.target.value)}
          />
        ),
      },
      {
        label: "Text Color",
        name: "color",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="#000000"
            onChange={(e) => updateStyle("color", e.target.value)}
          />
        ),
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="4"
            onChange={(e) => updateStyle("borderRadius", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Border Width",
        name: "borderWidth",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="1"
            onChange={(e) => updateStyle("borderWidth", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Border Color",
        name: "borderColor",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="#cccccc"
            onChange={(e) => updateStyle("borderColor", e.target.value)}
          />
        ),
      },
      {
        label: "Border Style",
        name: "borderStyle",
        element: (
          <select
            onChange={(e) => updateStyle("borderStyle", e.target.value)}
            style={{ padding: "4px", fontSize: "12px", borderRadius: "4px" }}
          >
            <option value="">Select style</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="none">None</option>
          </select>
        ),
      },
      {
        label: "Font Size",
        name: "fontSize",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="14"
            onChange={(e) => updateStyle("fontSize", e.target.value + "px")}
          />
        ),
      },
      {
        label: "Font Weight",
        name: "fontWeight",
        element: (
          <select
            onChange={(e) => updateStyle("fontWeight", e.target.value)}
            style={{ padding: "4px", fontSize: "12px", borderRadius: "4px" }}
          >
            <option value="">Select weight</option>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
            <option value="bolder">Bolder</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        ),
      },
      {
        label: "Text Align",
        name: "textAlign",
        element: (
          <select
            onChange={(e) =>
              e.target.value
                ? updateStyle(
                    "textAlign",
                    e.target.value ?? ("0" as CSSProperties["textAlign"])
                  )
                : ""
            }
            style={{ padding: "4px", fontSize: "12px", borderRadius: "4px" }}
          >
            <option value="">Select alignment</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        ),
      },
      {
        label: "Display",
        name: "display",
        element: (
          <select
            onChange={(e) => updateStyle("display", e.target.value)}
            style={{ padding: "4px", fontSize: "12px", borderRadius: "4px" }}
          >
            <option value="">Select display</option>
            <option value="block">Block</option>
            <option value="inline">Inline</option>
            <option value="inline-block">Inline Block</option>
            <option value="flex">Flex</option>
            <option value="grid">Grid</option>
            <option value="none">None</option>
          </select>
        ),
      },
      {
        label: "Box Shadow",
        name: "boxShadow",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="0 2px 4px rgba(0,0,0,0.1)"
            onChange={(e) => updateStyle("boxShadow", e.target.value)}
          />
        ),
      },
      {
        label: "Opacity",
        name: "opacity",
        element: (
          <Input
            variant={VariantClass.sm}
            placeholder="1"
            type="number"
            min="0"
            max="1"
            step="0.1"
            onChange={(e) => updateStyle("opacity", parseFloat(e.target.value))}
          />
        ),
      },
    ],
    style,
  ];
};
