import { v4 as uuidv4 } from "uuid";
import { historyStore, type HistoryEntry } from "./history-store";

export function storeHistory<T extends unknown[], R>(
  callback: (...args: T) => R
) {
  let count = 0;

  return function (...args: T) {
    const date = new Date();
    const id = uuidv4();
    const functionName = callback.name || "anonymous";

    try {
      const result = callback(...args);

      const entry: HistoryEntry = {
        id,
        count,
        functionName,
        args,
        result,
        date,
        error: null,
      };

      historyStore.add(entry);
      count++;

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const entry: HistoryEntry = {
        id,
        count,
        functionName,
        args,
        result: null,
        date,
        error: errorMessage,
      };

      historyStore.add(entry);
      count++;

      return undefined;
    }
  };
}
