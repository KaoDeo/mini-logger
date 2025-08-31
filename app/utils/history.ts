import boxen from "boxen";
import chalk from "chalk";
import { format } from "date-fns";
import { createCliTable } from "./cli-table";
import { historyStore } from "./history-store";

export function storeHistory<T extends unknown[], R>(
  callback: (...args: T) => R,
  maxHistorySize: number = 100
) {
  const history = new Map();
  let count = 0;

  return function (...args: T) {
    const date = new Date().toISOString();
    const startTime = performance.now();
    const currentCount = count++;

    try {
      const result = callback(...args);
      const duration = Math.round(performance.now() - startTime);

      const entry = { args, result, date, error: null };
      history.set(currentCount, entry);

      historyStore.addEntry({
        count: currentCount,
        args,
        result,
        error: null,
        date,
        functionName: callback.name || "anonymous",
        duration,
      });

      return result;
    } catch (error) {
      const duration = Math.round(performance.now() - startTime);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const entry = { args, result: null, date, error: errorMessage };
      history.set(currentCount, entry);

      historyStore.addEntry({
        count: currentCount,
        args,
        result: null,
        error: errorMessage,
        date,
        functionName: callback.name || "anonymous",
        duration,
      });

      return error;
    } finally {
      if (history.size >= maxHistorySize) {
        const oldestKey = Math.min(...Array.from(history.keys()));
        history.delete(oldestKey);
      }

      createTable(history);
    }
  };
}

function createTable(
  history: Map<
    number,
    { args: unknown[]; result: unknown; date: string; error: unknown }
  >
) {
  const headers = ["Count", "Args", "Result", "Time"];

  const table = createCliTable(headers);

  Array.from(history.entries()).forEach(([id, entry]) => {
    table.push([
      chalk.blue(id.toString()),
      chalk.yellow(JSON.stringify(entry.args)),
      entry.error
        ? chalk.red(`ERROR: ${entry.error}`)
        : chalk.green(JSON.stringify(entry.result)),
      chalk.gray(format(entry.date, "pppp")),
    ]);
  });

  console.log(
    boxen(table.toString(), {
      title: chalk.bold.magenta("Function Call History"),
      padding: 1,
      borderColor: "blue",
    })
  );

  return table;
}
