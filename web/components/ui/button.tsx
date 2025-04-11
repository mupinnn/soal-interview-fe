import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors rounded border-2 text-slate-50 disabled:opacity-70 disabled:cursor-not-allowed",
  variants: {
    size: {
      default: "h-10 px-4 py-2",
      icon: "size-10",
    },
    variant: {
      primary:
        "bg-indigo-700 border-indigo-900 shadow-[4px_4px_0_0_var(--color-indigo-900)]",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "primary",
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
