import { openDB } from 'idb';

export const initdb = async () =>
  openDB('editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('editor')) {
        console.log('editorDb database already exists');
        return;
      }
      db.createObjectStore('editor', { keyPath: 'id', autoIncrement: true });
      console.log('editorDb created');
    },
  });

// add content to the database
export const putDb = async (content) => {

    // Create a connection to the database database and version we want to use.
    const contactDb = await openDB('editor', 1);
  
    // Create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('editor', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('editor');
  
    // Use the .add() method on the store and pass in the content.
    await store.clear();
    const request = await store.add({ content: content });
    console.log('🚀 - data saved to the database', request);
 
};

// get all the content from the database
export const getDb = async () => {

    // Create a connection to the database database and version we want to use.
    const contactDb = await openDB('editor', 1);
  
    // Create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('editor', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('editor');
  
    // Use the .getAll() method to get all data in the database.
    const request = await store.getAll();
    return request.content;
};

initdb();
