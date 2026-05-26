import { Input } from "@heroui/react";
import type { Key } from "@heroui/react";
import { ListBox, Select } from "@heroui/react";
import { languages } from "@/config/site.config";
import { useMemo, useState } from "react";
import { useSelectedLanguage } from "@/stores/lang.state";
import { useUserCode } from "@/stores/code.state";

function normalizeSearch(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/c#/g, "csharp")
    .replace(/f#/g, "fsharp")
    .replace(/[^a-z0-9]/g, "");
}

function getFirstKey(keys: unknown): Key | null {
  if (!keys) return null;
  if (keys === "all") return null;
  if (Array.isArray(keys)) return keys[0] ?? null;
  if (keys instanceof Set) return keys.values().next().value ?? null;
  return keys as Key;
}

export function CodeLanguageSelector() {
  const [search, setSearch] = useState("");
  const { selectedLanguageState, setLanguageState } = useSelectedLanguage();
  const { userCode, setUserCode } = useUserCode();
  const SelectedVal = selectedLanguageState;
  const selectedKeys: Key[] = SelectedVal ? [SelectedVal] : [];

  const getDefaultCode = (id: string) =>
    languages.find((lang) => lang.id === id)?.defaultCode ?? "";

  const filteredLang = useMemo(() => {
    const needle = normalizeSearch(search);
    if (!needle) return languages;

    return languages.filter(({ id, label }) => {
      const idMatch = normalizeSearch(id).includes(needle);
      const labelMatch = normalizeSearch(label).includes(needle);
      return idMatch || labelMatch;
    });
  }, [search]);

  return (
    <Select
      aria-label="Code language"
      className={"w-[124px]"}
      placeholder="languages"
      variant="secondary"
      onChange={(keys) => {
        const nextKey = getFirstKey(keys);
        const nextLanguage = nextKey ? String(nextKey) : "";
        setLanguageState({ selectedLanguageState: nextLanguage });
        if (!nextLanguage) return;

        const nextDefault = getDefaultCode(nextLanguage);
        const prevDefault = SelectedVal ? getDefaultCode(SelectedVal) : "";
        const current = (userCode ?? "").trim();
        const shouldReplace = current.length === 0 || current === prevDefault.trim();

        if (shouldReplace) {
          setUserCode({ userCode: nextDefault });
        }
      }}
      value={selectedLanguageState}
      defaultValue={selectedLanguageState}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className={"p-1 rounded-2xl space-y-1"}>
        <Input
          aria-label="Filter languages"
          type="text"
          placeholder="e.g html"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="secondary"
        />
        <ListBox className="p-1 max-h-52 overflow-y-auto">
          {filteredLang.length ? (
            filteredLang.map(({ id, label }) => (
              <ListBox.Item
                className="rounded-xl"
                key={id}
                id={id}
                textValue={label}
                aria-label={label}
              >
                {label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))
          ) : (
            <ListBox.Item
              className="rounded-xl"
              id="no-results"
              textValue="No results"
              aria-label="No results"
              isDisabled
            >
              No results
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
