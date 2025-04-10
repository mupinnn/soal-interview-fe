"use client";

import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuRadioGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.RadioGroup>
));
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "inline-flex cursor-pointer items-center gap-2 rounded p-1 data-[highlighted]:bg-gray-300 data-[state=checked]:bg-gray-300 data-[state=checked]:font-semibold dark:data-[highlighted]:bg-gray-800 dark:data-[state=checked]:bg-gray-800",
      className,
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, align = "end", ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "min-w-[8rem] overflow-hidden rounded border border-gray-950 bg-gray-100 p-2 text-sm shadow-accent-light dark:shadow-accent-dark dark:bg-gray-950 dark:border-gray-100",
        className,
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuRadioItem,
};
