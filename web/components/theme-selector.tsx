"use client";

import { useState, useEffect } from "react";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const themeIconMap = {
  light: HiOutlineSun,
  dark: HiOutlineMoon,
  system: HiOutlineComputerDesktop,
};

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, themes, setTheme } = useTheme();
  const CurrentThemeIcon = themeIconMap[theme as keyof typeof themeIconMap];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Select a theme" size="icon">
          {mounted ? (
            <CurrentThemeIcon className="size-5" />
          ) : (
            <HiOutlineEllipsisHorizontal className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={mounted ? theme : "dark"}
          onValueChange={setTheme}
        >
          {themes.map((theme) => {
            const ThemeIcon = themeIconMap[theme as keyof typeof themeIconMap];
            return (
              <DropdownMenuRadioItem
                key={theme}
                value={theme}
                className="capitalize"
              >
                <ThemeIcon className="size-5" />
                {theme}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
