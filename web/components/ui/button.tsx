import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors bg-gray-100 rounded border border-gray-950 shadow-accent-light dark:shadow-accent-dark dark:border-gray-100 dark:bg-gray-950",
  variants: {
    size: {
      default: "h-10 px-4 py-2",
      icon: "size-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
