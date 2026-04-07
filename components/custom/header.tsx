import { Button } from "@heroui/react";
import { ToggleThemeButton } from "./toggle-theme";
import { PlayIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { CodeLanguageSelector } from "./selector.minor";
import { TabsView } from "./tabs.minor";
import { handleRunCode } from "@/lib/handlers/codeRunner";

export function Header() {
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between font-mono">
      <p className="text-sm uppercase tracking-[0.2em]">ONE PLAYGROUND</p>
      <div className="flex gap-2 items-center">
        <CodeLanguageSelector />
        <TabsView />
        <Button isIconOnly variant="primary" onPress={() => handleRunCode()}>
          <PlayIcon weight="fill" />
        </Button>
        <Button variant="secondary" className={"text-orange-500"} size="lg">
          <WarningCircleIcon />
          Beta Version
        </Button>
        </div>
      <ToggleThemeButton />
    </div>
  );
}
