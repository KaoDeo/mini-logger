import chalk from "chalk";
import Table from "cli-table3";

export function createCliTable(hearders: string[]) {
  return new Table({
    head: hearders.map((header) => chalk.cyan(header)),
    style: { head: [], border: [] },
  });
}
