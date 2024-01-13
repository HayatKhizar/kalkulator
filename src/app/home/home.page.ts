// home.page.ts

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { SQLiteService } from '../services/sqlite.service';
import { HistoryModalPage } from '../history-modal/history-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  display = '';
  buttons: string[] = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'AC', 'History'];
  historyEntries: string[] = [];

  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private sqliteService: SQLiteService
  ) {}

  onButtonClick(button: string): void {
    if (button === '=') {
      this.calculateResult();
    } else if (button === 'AC') {
      this.clearDisplay();
    } else if (button === 'History') {
      this.showHistory();
    } else {
      this.display += button;
    }
  }

  calculateResult(): void {
    try {
      const result = eval(this.display).toString();
      const expression = `${this.display} = ${result}`;
      this.display = result;

      // Add to Local Storage
      this.localStorageService.addToHistory(expression);

      // Add to SQLite history
      this.sqliteService.addToHistory(expression, result);
    } catch (error) {
      this.display = 'Error';
    }
  }

  clearDisplay(): void {
    this.display = '';
  }


  async showHistory(): Promise<void> {
    const localStorageHistory = this.localStorageService.getHistory();
    const sqliteHistory = await this.sqliteService.getHistory();
  
    const combinedHistory = [...localStorageHistory, ...sqliteHistory];
  
    if (combinedHistory.length > 0) {
      const modal = await this.modalController.create({
        component: HistoryModalPage,
        componentProps: {
          historyEntries: combinedHistory,
        },
      });
      await modal.present();
    } else {
      alert('No history available.');
    }
  }

  async addToHistory(expression: string, result: string): Promise<void> {
    try {
      // Pastikan Anda memanggil metode isDBOpen() dari instance SQLiteService
      if (await this.sqliteService.isDBOpen()) {
        const query = 'INSERT INTO history (expression, result) VALUES (?, ?)';
        await this.sqliteService.addToHistory(expression, result);
        console.log('Insert success');
      } else {
        console.error('Database connection is not open.');
      }
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }
  
}
