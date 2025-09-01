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
  storeHistory,
  validateEmail,
} from "@/app/utils";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    add(5, 3);
    add(4, 3);
    add(3, 3);

    multiply(2, 7);
    multiply(3, 7);
    multiply(4, 7);

    divide(10, 0);
    divide(9, 0);
    divide(8, 0);

    // fibonacci(5);
    // validateEmail("test@example.com");
    // isPrime(17);
    // calculateDistance({ x: 1, y: 2 }, { x: 3, y: 4 });
    // daysBetween("2024-01-01", "2024-01-02");
  }, []);

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
