import React, { ReactNode, useState, useRef, useEffect } from "react";

interface MenuItem {
  name: string;
  label: string;
  cb: () => void;
  icon?: string;
  disabled?: boolean;
}

interface DropdownProps {
  menus: MenuItem[];
  children: ReactNode;
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const DropdownContainer: React.FC<DropdownProps> = ({
  menus: items,
  children,
  variant = "default",
  size = "md",
  position = "bottom-right",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const getButtonStyles = () => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 backdrop-blur-sm";

    const sizeStyles = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
    };

    const variantStyles = {
      default:
        "bg-white/90 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-blue-500 shadow-sm hover:shadow-md",
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
      ghost:
        "bg-transparent text-gray-600 hover:bg-gray-100/80 focus:ring-gray-400",
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  };

  const getMenuPosition = () => {
    const positions = {
      "bottom-right": "origin-top-right top-full right-0",
      "bottom-left": "origin-top-left top-full left-0",
      "top-right": "origin-bottom-right bottom-full right-0 mb-2",
      "top-left": "origin-bottom-left bottom-full left-0 mb-2",
    };
    return positions[position];
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        className={`absolute top-2 right-2 z-10 ${getButtonStyles()}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open menu"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Dropdown menu */}
      <div
        className={`absolute z-20 mt-1 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black/5 border border-gray-100 transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        } ${getMenuPosition()}`}
        role="menu"
        aria-orientation="vertical"
        style={{
          filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))",
        }}
      >
        <div className="py-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  if (!item.disabled) {
                    item.cb();
                    setOpen(false);
                  }
                }}
                disabled={item.disabled}
                className={`group flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-150 ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-900"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === items.length - 1 ? "rounded-b-lg" : ""
                }`}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!item.disabled) {
                      item.cb();
                      setOpen(false);
                    }
                  }
                }}
              >
                {item.icon && (
                  <span className="mr-3 text-base">{item.icon}</span>
                )}
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
                {!item.disabled && (
                  <svg
                    className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center italic">
              No items available
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default DropdownContainer;
