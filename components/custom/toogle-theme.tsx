"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Switch isDisabled>Theme: loading...</Switch>; // Or empty div/skeleton
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <Switch 
      isSelected={isDark} 
      onChange={(selected) => setTheme(selected ? "dark" : "light")}
    >
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      Theme: {resolvedTheme ?? theme ?? "system"}
    </Switch>
  );
}
