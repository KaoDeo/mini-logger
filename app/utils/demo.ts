import { storeHistory } from "./history";

export const add = storeHistory(function add(a: number, b: number) {
  return a + b;
});

export const multiply = storeHistory(function multiply(x: number, y: number) {
  return x * y;
});

export const divide = storeHistory(function divide(a: number, b: number) {
  if (b === 0) throw new Error("Division by zero!");
  return a / b;
});

export const fibonacci = storeHistory(function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

export const validateEmail = storeHistory(function validateEmail(
  email: string
) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
});

export const isPrime = storeHistory(function isPrime(num: number) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
});

export const sortBy = storeHistory(function sortBy(
  array: Array<{ name: string; score: number }>,
  key: "name" | "score"
) {
  return [...array].sort((a, b) => {
    if (key === "name") return a.name.localeCompare(b.name);
    return b.score - a.score;
  });
});

export const calculateDistance = storeHistory(function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
});

export const daysBetween = storeHistory(function daysBetween(
  date1: string,
  date2: string
) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
