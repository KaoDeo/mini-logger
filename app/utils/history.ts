import { v4 as uuidv4 } from "uuid";
import {
  historyRegistry,
  type CallEntry,
  type FunctionHistory,
} from "./history-store";

export function storeHistory<T extends unknown[], R>(
  callback: (...args: T) => R
) {
  const functionName = callback.name || "anonymous";
  let count = 0;

  const functionHistory: FunctionHistory = {
    errors: 0,
    successful: 0,
    functionName,
    calls: [],
  };

  historyRegistry.register(functionHistory);

  return function (...args: T) {
    const date = new Date();
    const id = uuidv4();

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

      functionHistory.calls.push(callEntry);
      functionHistory.successful++;
      count++;

      historyRegistry.notifyChange();

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

      functionHistory.calls.push(callEntry);
      functionHistory.errors++;
      count++;

      historyRegistry.notifyChange();

      return undefined;
    }
  };
}
