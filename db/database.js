import * as SQLite from "expo-sqlite";
import questions from "../app/data/questions.json";

let db;

export const initDb = async () => {
  try {
    db = await SQLite.openDatabaseAsync("quiz");
    console.log("Base de données ouverte", db);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS GAME (
        id INTEGER PRIMARY KEY NOT NULL,
        category TEXT,
        level INTEGER,
        domain TEXT,
        question TEXT,
        answers TEXT,
        trueAnswer TEXT
      );
    `);

    for (const q of questions) {
      await db.runAsync(
        `INSERT OR REPLACE INTO GAME 
          (id, category, level, domain, question, answers, trueanswer) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          q.id,
          q.category,
          q.level,
          q.domain || q.category, // Fallback to category if domain missing
          q.question,
          JSON.stringify(q.options || q.answers),
          q.trueAnswer || q.trueanswer,
        ]
      );
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error; // Re-throw to handle in calling code
  }
};

export const getElement = async (id, cat) => {
  if (!db) await initDb(); // Ensure db is initialized

  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM GAME WHERE id = ? AND category = ?",
      [id, cat]
    );
    if (result && typeof result.answers === "string") {
      result.options = JSON.parse(result.answers);
    }
    return result;
  } catch (error) {
    console.error("Error fetching element:", error);
    throw error;
  }
};
