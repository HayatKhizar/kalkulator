// history-modal.page.ts

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { SQLiteService } from '../services/sqlite.service'; // Import service SQLite

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.page.html',
  styleUrls: ['./history-modal.page.scss'],
})
export class HistoryModalPage {
  @Input() historyEntries: string[] = [];

  constructor(
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private sqliteService: SQLiteService
  ) {}

  closeModal(): void {
    this.modalController.dismiss();
  }

  async clearHistory(): Promise<void> {
    // Clear history from local storage
    this.historyEntries = [];
    this.localStorageService.clearHistory();

    // Clear history from SQLite
    await this.sqliteService.clearHistory();
  }
}
