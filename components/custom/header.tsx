import { Button, Input, SelectTrigger, SelectValue, Tabs } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";
import { ToggleThemeButton } from "./toogle-theme";
import { PlayIcon, SquareSplitHorizontalIcon } from "@phosphor-icons/react";
import { useViewer } from "@/stores/tabs.state";

function TabsView() {
  const { setViewerState } = useViewer();
  return (
    <Tabs className="text-muted">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab
            id="code"
            onClick={() => setViewerState({ viewerState: "code" })}
          >
            Code
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            id="output"
            onClick={() => setViewerState({ viewerState: "output" })}
          >
            Output
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab
            id="both"
            onClick={() => setViewerState({ viewerState: "both" })}
          >
            <Tabs.Separator />
            <SquareSplitHorizontalIcon size={20} weight="duotone" />
            Split
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}

const languages = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "php", label: "PHP" },
  { id: "csharp", label: "C#" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
];

export function SelectLanguage() {
  return (
    <Select className={"w-[124px]"} placeholder="Select language" variant="secondary">
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className={"p-1 rounded-2xl"}>
        <Input type="text" placeholder="e.g swift" variant="secondary" />
        <ListBox>
          {languages.map(({ id, label }) => (
            <ListBox.Item key={id} id={id} textValue={label} aria-label={label}>
              {label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export function Header() {
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between font-mono">
      <p className="text-sm uppercase tracking-[0.2em]">ONE PLAYGROUND</p>
      <div className="flex gap-2 items-center">
        <SelectLanguage />
        <TabsView />
        <Button isIconOnly>
          <PlayIcon weight="fill" />
        </Button>
      </div>
      <ToggleThemeButton />
    </div>
  );
}
