"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const DarkModeButton = () => {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button
      className={`w-9 h-9 ${isDark ? "bg-black" : "bg-white" } border-2 .border-black`}
      onClick={toggleTheme}

    >
      {isDark ? <Sun stroke="white" /> : <Moon stroke="black" />}
    </Button>
  );
};