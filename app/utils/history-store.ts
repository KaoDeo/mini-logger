import { v4 as uuidv4 } from "uuid";

interface HistoryEntry {
  id?: string;
  count: number;
  args: unknown[];
  result: unknown;
  error: string | null;
  date: string;
  functionName: string;
  duration?: number;
}

class HistoryStore {
  private entries: HistoryEntry[] = [];
  private listeners: Set<(entries: HistoryEntry[]) => void> = new Set();

  addEntry(entry: HistoryEntry) {
    this.entries.push({ ...entry, id: uuidv4() });

    if (this.entries.length > 50) {
      this.entries = this.entries.slice(-50);
    }
    this.notifyListeners();
  }

  subscribe(listener: (entries: HistoryEntry[]) => void) {
    this.listeners.add(listener);

    listener(this.entries);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.entries]));
  }

  clear() {
    this.entries = [];
    this.notifyListeners();
  }

  getEntries(): HistoryEntry[] {
    return [...this.entries];
  }
}

export const historyStore = new HistoryStore();
export type { HistoryEntry };
