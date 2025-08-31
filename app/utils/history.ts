import boxen from "boxen";
import chalk from "chalk";
import { format } from "date-fns";
import { createCliTable } from "./cli-table";

export function storeHistory<T extends unknown[], R>(
  callback: (...args: T) => R
) {
  const history = new Map();
  let count = 0;

  return function (...args: T) {
    const date = new Date().toISOString();
    try {
      const result = callback(...args);
      history.set(count, { args, result, date, error: null });

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      history.set(count, { args, result: null, date, error: errorMessage });

      return error;
    } finally {
      count++;
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
