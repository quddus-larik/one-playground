import { Button, Input, Label, Modal, Tooltip } from "@heroui/react";
import { ToggleThemeButton } from "./toggle-theme";
import {
  PencilLineIcon,
  PlayIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { CodeLanguageSelector } from "./selector.minor";
import { TabsView } from "./tabs.minor";
import { handleRunCode } from "@/lib/handlers/codeRunner";
import { TinyIcon } from "../assets/logo";
import { useStdinState } from "@/stores/stdin.state";

export function Header() {
  const { hasStdin, inputRequests } = useStdinState();

  return (
    <div className="w-full py-2 px-4 flex items-center justify-between font-mono">
      <TinyIcon className="size-10" />
      <div className="flex gap-2 items-center">
        <CodeLanguageSelector />
        <TabsView />
        {hasStdin ? (
          <Modal>
            <Modal.Trigger>
              <Button variant="primary">
                Run <PlayIcon weight="fill" />
              </Button>
            </Modal.Trigger>
            <Modal.Backdrop>
              <Modal.Container>
                <Modal.Dialog>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <PencilLineIcon weight="duotone" />
                    </Modal.Icon>
                    <Modal.Heading>Submin Inputs</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="w-full flex flex-col gap-3 p-1">
                      {inputRequests.map((itm,idx) => (
                        <div className="flex flex-col gap-1">
                          <Label htmlFor={itm.title.replaceAll(" ","-").toLocaleLowerCase()}>{itm.title}</Label>
                          <Input
                            id={itm.title.replaceAll(" ","-").toLocaleLowerCase()}
                            placeholder="xyz"
                            type="email"
                          />
                        </div>
                      ))}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Discard
                    </Button>
                    <Button slot="close" onPress={() => handleRunCode()}>
                      Run
                      <PlayIcon weight="duotone" />
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        ) : (
          <Button variant="primary" onPress={() => handleRunCode()}>
            Run <PlayIcon weight="fill" />
          </Button>
        )}

        <Button
          variant="secondary"
          className={"text-orange-500 cursor-default"}
          size="lg"
        >
          <WarningCircleIcon />
          beta version
        </Button>
      </div>
      <ToggleThemeButton />
    </div>
  );
}
