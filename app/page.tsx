"use client";

import HistoryDisplay from "@/app/components/HistoryDisplay";
import {
  add,
  calculateDistance,
  daysBetween,
  divide,
  fibonacci,
  isPrime,
  multiply,
  validateEmail,
} from "@/app/utils";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    add(5, 3);
    add(4, 3);
    add(3, 3);

    daysBetween("2024-01-01", "2024-01-02");
    daysBetween("2024-01-01", "");

    multiply(2, 7);
    multiply(3, 7);
    multiply(4, 7);

    divide(10, 0);
    divide(9, 1);
    divide(8, 0);

    fibonacci(5);
    validateEmail("test@example.com");
    validateEmail("testexample.com");

    isPrime(17);
    calculateDistance({ x: 1, y: 2 }, { x: 3, y: 4 });
    calculateDistance({ x: 1, y: 2 }, { x: 3, y: 4 });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold notion-text mb-2 tracking-tight">
                Mini Logging Framework
              </h1>
              <p className="notion-text-secondary text-base">
                Simple function call tracking with real-time visualization
              </p>
            </div>
            <a
              href="https://github.com/KaoDeo/mini-logger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 notion-text-secondary hover:notion-text transition-colors duration-150 border notion-border rounded-md hover:bg-opacity-50"
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
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="notion-text-secondary"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>

        <HistoryDisplay />
      </div>
    </div>
  );
}
