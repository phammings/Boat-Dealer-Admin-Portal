import { openDB } from "idb"

const DB_NAME = "vehicle-lookups"
const DB_VERSION = 1

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("categories")) {
      db.createObjectStore("categories")
    }
    if (!db.objectStoreNames.contains("classes")) {
      db.createObjectStore("classes")
    }
  },
})

export async function getCachedCategories() {
  const db = await dbPromise
  return db.get("categories", "boats")
}

export async function setCachedCategories(data: any) {
  const db = await dbPromise
  return db.put("categories", data, "boats")
}

export async function getCachedClasses(categoryId: number) {
  const db = await dbPromise
  return db.get("classes", categoryId)
}

export async function setCachedClasses(categoryId: number, data: any) {
  const db = await dbPromise
  return db.put("classes", data, categoryId)
}
