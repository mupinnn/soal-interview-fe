import type React from "react";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/utils";

const cardVariants = tv({
  slots: {
    base: "rounded border border-gray-950 shadow-accent-light bg-gray-100 dark:border-gray-100 dark:shadow-accent-dark dark:bg-gray-950",
    header: "flex flex-col space-y-1.5 p-6 pb-2",
    title: "text-xl font-semibold leading-none tracking-tight",
    description: "text-sm",
    content: "p-6",
    footer: "flex items-center p-6 pt-0",
  },
});

const { base, header, title, description, content, footer } = cardVariants();

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(base(), className)} {...props} />;
  },
);
Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(header(), className)} {...props} />;
  },
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return <h3 ref={ref} className={cn(title(), className)} {...props} />;
  },
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn(description(), className)} {...props} />;
  },
);
CardDescription.displayName = "CardDescription";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(content(), className)} {...props} />;
  },
);
CardContent.displayName = "CardContent";

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn(footer(), className)} {...props} />;
  },
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
