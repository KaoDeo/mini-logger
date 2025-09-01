export type CallEntry = {
  id: string;
  count: number;
  args: unknown[];
  result: unknown;
  date: Date;
  error: string | null;
};

export type FunctionHistory = {
  errors: number;
  successful: number;
  functionName: string;
  calls: CallEntry[];
};

function createHistoryRegistry() {
  const functionHistories: FunctionHistory[] = [];
  let listeners: Array<(histories: FunctionHistory[]) => void> = [];

  const notifyListeners = () => {
    listeners.forEach((listener) => listener([...functionHistories]));
  };

  return {
    register: (history: FunctionHistory) => {
      const existing = functionHistories.find(
        (h) => h.functionName === history.functionName
      );
      if (!existing) {
        functionHistories.push(history);
      }
    },

    getAllHistories: () => [...functionHistories],

    clear: () => {
      functionHistories.forEach((h) => {
        h.errors = 0;
        h.successful = 0;
        h.calls = [];
      });
      notifyListeners();
    },

    subscribe: (listener: (histories: FunctionHistory[]) => void) => {
      listeners.push(listener);
      listener([...functionHistories]);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },

    notifyChange: () => {
      notifyListeners();
    },
  };
}

export const historyRegistry = createHistoryRegistry();
