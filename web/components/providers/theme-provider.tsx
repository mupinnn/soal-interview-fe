"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
