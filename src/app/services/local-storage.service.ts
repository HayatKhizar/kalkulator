// src/app/services/local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private historyKey = 'calculatorHistory';

  addToHistory(entry: string): void {
    const history = this.getHistory();
    history.push(entry);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  getHistory(): string[] {
    const storedHistory = localStorage.getItem(this.historyKey);
    return storedHistory ? JSON.parse(storedHistory) : [];
  }

  clearHistory(): void {
    localStorage.removeItem(this.historyKey);
  }
}
