import Link from "next/link";
import { ThemeSelector } from "./theme-selector";

export function Navbar() {
  return (
    <nav className="container mx-auto flex items-center justify-between gap-2 p-4">
      <Link href="/" title="Home" className="font-bold text-2xl">
        GetHub
      </Link>
      <ThemeSelector />
    </nav>
  );
}
