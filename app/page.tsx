"use client";

import { useEffect } from "react";
import HistoryDisplay from "@/app/components/HistoryDisplay";
import { storeHistory } from "@/app/utils";

export default function Home() {
  const add = storeHistory(function add(a: number, b: number) {
    return a + b;
  });

  const multiply = storeHistory(function multiply(x: number, y: number) {
    return x * y;
  });

  const divide = storeHistory(function divide(a: number, b: number) {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
  });

  const fibonacci = storeHistory(function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  });

  useEffect(() => {
    add(5, 3);
    multiply(4, 7);
    divide(10, 0);
    fibonacci(5);
  }, [add, multiply, divide, fibonacci]);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold notion-text mb-2 tracking-tight">
            Mini Logging Framework
          </h1>
          <p className="notion-text-secondary text-base">
            Simple function call tracking with real-time visualization
          </p>
        </div>

        <HistoryDisplay />
      </div>
    </div>
  );
}
