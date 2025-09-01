import { v4 as uuidv4 } from "uuid";
import { historyStore, type CallEntry } from "./history-store";

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

      const callEntry: CallEntry = {
        id,
        count,
        args,
        result,
        date,
        error: null,
      };

      historyStore.add(callEntry, functionName);
      count++;

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const callEntry: CallEntry = {
        id,
        count,
        args,
        result: null,
        date,
        error: errorMessage,
      };

      historyStore.add(callEntry, functionName);
      count++;

      return undefined;
    }
  };
}
