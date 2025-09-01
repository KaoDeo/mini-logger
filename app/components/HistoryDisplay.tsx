"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  historyRegistry,
  type FunctionHistory,
  type CallEntry,
} from "../utils/history-store";

export default function HistoryDisplay() {
  const [functionHistories, setFunctionHistories] = useState<FunctionHistory[]>(
    []
  );
  const [expandedFunctions, setExpandedFunctions] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const unsubscribe = historyRegistry.subscribe(setFunctionHistories);
    return unsubscribe;
  }, []);

  const toggleFunction = (functionName: string) => {
    setExpandedFunctions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(functionName)) {
        newSet.delete(functionName);
      } else {
        newSet.add(functionName);
      }
      return newSet;
    });
  };

  const formatResult = (call: CallEntry) => {
    if (call.error) {
      return { text: call.error, type: "error" as const };
    }
    try {
      return {
        text: JSON.stringify(call.result, null, 2),
        type: "success" as const,
      };
    } catch {
      return { text: String(call.result), type: "success" as const };
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
            {functionHistories.length} functions
          </span>
        </div>
        <button
          onClick={() => historyRegistry.clear()}
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
        {functionHistories.length === 0 ? (
          <div
            className="text-center py-12"
            style={{ background: "var(--background)" }}
          >
            <p className="notion-text-secondary text-sm">
              No functions tracked yet
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
                <div className="col-span-4">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Function
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Total Calls
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Successful
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Errors
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium notion-text-secondary uppercase tracking-wide">
                    Success Rate
                  </span>
                </div>
              </div>
            </div>

            {functionHistories.map((functionEntry) => {
              const totalCalls = functionEntry.calls.length;
              const successRate =
                totalCalls > 0
                  ? ((functionEntry.successful / totalCalls) * 100).toFixed(1)
                  : "0.0";

              return (
                <div key={functionEntry.functionName}>
                  {/* Function Summary Row */}
                  <div
                    className="notion-table-row px-4 py-3 transition-colors duration-150 cursor-pointer"
                    onClick={() => toggleFunction(functionEntry.functionName)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--hover-bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">
                            {expandedFunctions.has(functionEntry.functionName)
                              ? "▼"
                              : "▶"}
                          </span>
                          <div className="font-medium notion-text text-sm">
                            {functionEntry.functionName}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="text-sm notion-text font-medium">
                          {totalCalls}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm notion-text">
                            {functionEntry.successful}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-sm notion-text">
                            {functionEntry.errors}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="text-sm notion-text-secondary">
                          {successRate}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Call Details */}
                  {expandedFunctions.has(functionEntry.functionName) && (
                    <div
                      style={{
                        background: "var(--code-bg)",
                        borderLeft: "3px solid var(--border-color)",
                        marginLeft: "16px",
                      }}
                    >
                      {/* Call Details Header */}
                      <div
                        className="px-4 py-2"
                        style={{
                          background: "var(--hover-bg)",
                          borderBottom: "1px solid var(--border-color)",
                        }}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
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
                          <div className="col-span-6">
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

                      {functionEntry.calls
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .map((call) => {
                          const result = formatResult(call);
                          return (
                            <div
                              key={call.id}
                              className="px-4 py-2"
                              style={{
                                borderBottom: "1px solid var(--border-color)",
                              }}
                            >
                              <div className="grid grid-cols-12 gap-4 items-start">
                                <div className="col-span-2">
                                  <div className="text-xs notion-text-secondary">
                                    {format(call.date, "MMM d")}
                                  </div>
                                  <div className="text-xs notion-text-secondary">
                                    {format(call.date, "h:mm:ss a")}
                                  </div>
                                </div>

                                <div className="col-span-3">
                                  <div
                                    className="text-xs font-mono notion-text"
                                    style={{
                                      background: "var(--background)",
                                      padding: "2px 4px",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {JSON.stringify(call.args)}
                                  </div>
                                </div>

                                <div className="col-span-6">
                                  <div
                                    className="text-xs font-mono max-h-16 overflow-y-auto"
                                    style={{
                                      background:
                                        result.type === "error"
                                          ? "var(--error-bg)"
                                          : "var(--background)",
                                      padding: "2px 4px",
                                      borderRadius: "2px",
                                      color:
                                        result.type === "error"
                                          ? "var(--error-text)"
                                          : "var(--foreground)",
                                    }}
                                  >
                                    <pre className="whitespace-pre-wrap">
                                      {result.text}
                                    </pre>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
