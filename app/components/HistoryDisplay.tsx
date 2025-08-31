"use client";

import { useState, useEffect } from "react";
import { historyStore, type HistoryEntry } from "@/app/utils/history-store";
import { format } from "date-fns";

export default function HistoryDisplay() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const unsubscribe = historyStore.subscribe(setEntries);
    return unsubscribe;
  }, []);

  const formatResult = (entry: HistoryEntry) => {
    if (entry.error) {
      return { text: entry.error, type: "error" as const };
    }
    try {
      return {
        text: JSON.stringify(entry.result, null, 2),
        type: "success" as const,
      };
    } catch {
      return { text: String(entry.result), type: "success" as const };
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold notion-text">
            Function Call History
          </h2>
          <span className="notion-text-secondary text-sm">
            {entries.length} calls
          </span>
        </div>
        <button
          onClick={() => historyStore.clear()}
          className="cursor-pointer px-3 py-1.5 text-sm notion-text-secondary hover:notion-text transition-colors duration-150 border notion-border rounded-sm hover:bg-opacity-50"
          style={{
            borderColor: "var(--border-color)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Clear History
        </button>
      </div>

      <div className="notion-table">
        {entries.length === 0 ? (
          <div
            className="text-center py-12"
            style={{ background: "var(--background)" }}
          >
            <p className="notion-text-secondary text-sm">
              No function calls yet
            </p>
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div
              className="notion-table-row px-4 py-3"
              style={{
                background: "var(--hover-bg)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Function
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Time
                  </span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Arguments
                  </span>
                </div>
                <div className="col-span-4">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Result
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Status
                  </span>
                </div>
              </div>
            </div>

            {entries.map((entry) => {
              const result = formatResult(entry);
              return (
                <div
                  key={entry.id}
                  className="notion-table-row px-4 py-3 transition-colors duration-150"
                >
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-2">
                      <div className="font-medium notion-text text-sm">
                        {entry.functionName}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-sm notion-text-secondary">
                        {format(entry.date, "MMM d, yyyy")}
                      </div>
                      <div className="text-xs notion-text-secondary">
                        {format(entry.date, "h:mm:ss a")}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div
                        className="text-sm font-mono notion-text"
                        style={{
                          background: "var(--code-bg)",
                          padding: "4px 6px",
                          borderRadius: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {JSON.stringify(entry.args)}
                      </div>
                    </div>

                    <div className="col-span-4">
                      <div
                        className="text-sm font-mono max-h-20 overflow-y-auto"
                        style={{
                          background:
                            result.type === "error"
                              ? "var(--error-bg)"
                              : "var(--code-bg)",
                          padding: "4px 6px",
                          borderRadius: "3px",
                          fontSize: "12px",
                          color:
                            result.type === "error"
                              ? "var(--error-text)"
                              : "var(--foreground)",
                        }}
                      >
                        <pre className="whitespace-pre-wrap">{result.text}</pre>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center self-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          result.type === "error"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
