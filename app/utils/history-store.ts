export type HistoryEntry = {
  id: string;
  count: number;
  functionName: string;
  args: unknown[];
  result: unknown;
  date: Date;
  error: string | null;
};

function createHistoryStore() {
  let history: HistoryEntry[] = [];
  let listeners: Array<(entries: HistoryEntry[]) => void> = [];

  const notifyListeners = () => {
    listeners.forEach((listener) => listener([...history]));
  };

  return {
    get: () => [...history],

    add: (entry: HistoryEntry) => {
      history.push(entry);
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
