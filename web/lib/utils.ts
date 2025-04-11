import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(new Date(date));
};

export const getLanguageColor = (language: string | null) => {
  const colors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C#": "bg-purple-500",
    PHP: "bg-indigo-400",
    Ruby: "bg-red-600",
    Go: "bg-blue-400",
    Rust: "bg-orange-600",
    Swift: "bg-orange-500",
    Kotlin: "bg-purple-400",
    Dart: "bg-blue-300",
  };

  return colors[language || ""] || "bg-gray-400";
};
