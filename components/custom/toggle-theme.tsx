"use client";

import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoLogoGithub } from "react-icons/io"

export function ToggleThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button isDisabled aria-label="Toggle theme" />;
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <div className="flex gap-1">
      <Button variant="secondary" isIconOnly size="lg" onClick={()=> window.open('https://github.com/quddus-larik/tiny-ground')}>
        <IoLogoGithub className="size-6" />
      </Button>
      <Button
        variant="primary"
        size="lg"
        aria-label="Toggle theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        isIconOnly
      >
        {isDark ? <SunIcon weight="fill" /> : <MoonIcon weight="fill" />}
      </Button>
    </div>
  );
}
