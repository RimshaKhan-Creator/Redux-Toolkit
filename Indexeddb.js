import { openDB } from 'idb';

// Open or create a database with a version
export const initDb = async () => {
  const db = await openDB('myDatabase', 1, {
    upgrade(db) {
      // Create an object store with auto-incrementing key
      const store = db.createObjectStore('items', {
        keyPath: 'id', // 'id' will be the primary key
        autoIncrement: true,
      });
      store.createIndex('name', 'name'); // Create an index for 'name' field
    },
  });
  return db;
};
// Function to add an item to the database
export const addItem = async (db, item) => {
    const tx = db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    await store.add(item);
    await tx.done;
  };
  
  // Function to get all items from the database
  export const getAllItems = async (db) => {
    const tx = db.transaction('items', 'readonly');
    const store = tx.objectStore('items');
    const items = await store.getAll();
    return items;
  };