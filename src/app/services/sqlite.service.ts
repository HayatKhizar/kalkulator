import { Injectable } from '@angular/core';
import { CapacitorSQLite, capConnectionOptions } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  static readonly DATABASE_NAME = 'calculator.db';
  private static db = CapacitorSQLite;
  private readonly DATABASE_NAME = SQLiteService.DATABASE_NAME;

  constructor() {
    console.log('Constructor called.');
    this.initializeDatabase();
  }
  async isDBOpen(): Promise<boolean> {
    try {
      const yourDatabaseConnectionCheck = true; // Gantilah dengan cara pengecekan koneksi yang sesuai
      return yourDatabaseConnectionCheck;
    } catch (error) {
      console.error('Error checking database connection:', error);
      return false;
    }
  }
  private async initializeDatabase(): Promise<void> {
    if (Capacitor.isNative) {
      const dbOptions: capConnectionOptions = {
        database: this.DATABASE_NAME,
        encrypted: false,
        mode: 'no-encryption',
        readonly: false
      };

      try {
        await SQLiteService.db.createConnection(dbOptions);
        await SQLiteService.db.open({ database: this.DATABASE_NAME, readonly: false });

        // Jangan lupa untuk memanggil createTable() di sini
        await this.createTable();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    } else {
      console.error('SQLite is not supported in the web platform.');
    }
  }

  private async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expression TEXT NOT NULL,
        result TEXT NOT NULL
      )`;

    try {
      await SQLiteService.db.run({ database: this.DATABASE_NAME, statement: query, values: [] });
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async addToHistory(expression: string, result: string): Promise<void> {
    const query = 'INSERT INTO history (expression, result) VALUES (?, ?)';
    try {
      await SQLiteService.db.run({ database: this.DATABASE_NAME, statement: query, values: [expression, result] });
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }

  async getHistory(): Promise<any[]> {
    const query = 'SELECT * FROM history';
    try {
      const result = await SQLiteService.db.query({ database: this.DATABASE_NAME, statement: query, values: [] });
      return result?.values || [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  }

  async clearHistory(): Promise<void> {
    const query = 'DELETE FROM history';
    try {
      await SQLiteService.db.run({ database: this.DATABASE_NAME, statement: query, values: [] });
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
}
