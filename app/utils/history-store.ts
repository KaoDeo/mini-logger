export type CallEntry = {
  id: string;
  count: number;
  args: unknown[];
  result: unknown;
  date: Date;
  error: string | null;
};

export type HistoryEntry = {
  errors: number;
  successful: number;
  functionName: string;
  calls: CallEntry[];
};

function createHistoryStore() {
  let history: HistoryEntry[] = [];
  let listeners: Array<(entries: HistoryEntry[]) => void> = [];

  const notifyListeners = () => {
    listeners.forEach((listener) => listener([...history]));
  };

  return {
    get: () => [...history],

    add: (callEntry: CallEntry, functionName: string) => {
      const existingFunction = history.find(
        (h) => h.functionName === functionName
      );

      if (existingFunction) {
        existingFunction.calls.push(callEntry);
        if (callEntry.error) {
          existingFunction.errors++;
        } else {
          existingFunction.successful++;
        }
      } else {
        const newHistoryEntry: HistoryEntry = {
          functionName,
          errors: callEntry.error ? 1 : 0,
          successful: callEntry.error ? 0 : 1,
          calls: [callEntry],
        };
        history.push(newHistoryEntry);
      }

      notifyListeners();
    },

    clear: () => {
      history = [];
      notifyListeners();
    },

    subscribe: (listener: (entries: HistoryEntry[]) => void) => {
      listeners.push(listener);
      listener([...history]);

      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}

export const historyStore = createHistoryStore();
