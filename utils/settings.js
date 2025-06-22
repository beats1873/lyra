import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/settings.db');

let db;

export async function initSettingsDB() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      guildId TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
  `);
}

export async function getSettings(guildId) {
  const row = await db.get('SELECT data FROM settings WHERE guildId = ?', guildId);
  return row ? JSON.parse(row.data) : {};
}

export async function updateSettings(guildId, newSettings) {
  const current = await getSettings(guildId);
  const merged = { ...current, ...newSettings };
  await db.run(`
    INSERT INTO settings (guildId, data)
    VALUES (?, ?)
    ON CONFLICT(guildId) DO UPDATE SET data = excluded.data
  `, guildId, JSON.stringify(merged));
  return merged;
}
