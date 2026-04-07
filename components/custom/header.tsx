

import { Button } from "@heroui/react";
import { ToggleThemeButton } from "./toggle-theme";
import { PlayIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { CodeLanguageSelector } from "./selector.minor";
import { TabsView } from "./tabs.minor";
import { handleRunCode } from "@/lib/handlers/codeRunner";
import { TinyIcon } from "../assets/logo";

export function Header() {
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between font-mono">
      <TinyIcon className="size-10" />
      <div className="flex gap-2 items-center">
        <CodeLanguageSelector />
        <TabsView />
        <Button isIconOnly variant="primary" onPress={() => handleRunCode()}>
          <PlayIcon weight="fill" />
        </Button>
        <Button variant="secondary" className={"text-orange-500 cursor-default"} size="lg">
          <WarningCircleIcon />
          beta bersion
        </Button>
        </div>
      <ToggleThemeButton />
    </div>
  );
}
