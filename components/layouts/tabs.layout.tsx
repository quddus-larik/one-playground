"use client";

import { useViewer } from "@/stores/tabs.state";
import { Chip } from "@heroui/react";
import { useResizable } from "@/hooks/useResizable";
import { CodeEditor } from "../custom/editor.minor";

import { useSelectedLanguage } from "@/stores/lang.state";
import { OutputViewer } from "../custom/output.minor";

export function ViewerLayout() {
  const { viewerState } = useViewer();
  const { containerRef, leftWidth, handleMouseDown } = useResizable(50);

  const { selectedLanguageState } = useSelectedLanguage();

  const isBoth = viewerState === "both";
  const isCode = viewerState === "code";
  const isOutput = viewerState === "output";

  const leftStyle = { width: `${leftWidth}%` };
  const rightStyle = { width: `${100 - leftWidth}%` };

  return (
    <div ref={containerRef} className="w-full h-full p-4">
      {isBoth ? (
        <div className="flex h-full w-full items-stretch gap-1">
          <div
            className="flex min-w-[220px] flex-col items-center justify-center rounded-xl border bg-muted"
            style={leftStyle}
          >
            <CodeEditor language={selectedLanguageState || "javascript"} />
          </div>

          <div
            className="w-2 cursor-col-resize rounded-full flex justify-center items-center"
            onMouseDown={handleMouseDown}
            aria-label="Resize panes"
            role="separator"
          >
            <div className="h-8 w-1 bg-muted/80 rounded-full hover:bg-muted" />
          </div>
          <div
            className="min-w-[220px] rounded-xl bg-foreground text-background"
            style={rightStyle}
          >
            <div className="flex items-center justify-between rounded-t-xl bg-muted py-1 pl-2 pr-1 font-mono">
              <span>Output</span>
              <Chip className="rounded-lg font-bold">
                {selectedLanguageState || "javascript"}
              </Chip>
            </div>
            <div className="h-[calc(100%-32px)]">
              <OutputViewer />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-full w-full gap-4">
          {(isCode || isBoth) && (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-muted">
              <CodeEditor language={selectedLanguageState || "javascript"} />
            </div>
          )}

          {(isOutput || isBoth) && (
            <div className="h-full rounded-xl bg-foreground text-background">
              <div className="flex items-center justify-between rounded-t-xl bg-muted py-1 pl-2 pr-1 font-mono">
                <span>Output</span>
                <Chip className="rounded-lg font-bold">
                  {selectedLanguageState || "javascript"}
                </Chip>
              </div>
              <div className="h-[calc(100%-32px)]">
                <OutputViewer />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
