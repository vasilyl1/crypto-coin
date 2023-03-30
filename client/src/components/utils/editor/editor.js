// Import methods to save and get data from the indexedDB database in './database.js'
import { initdb, getDb, putDb } from './database';
import { header } from './header';

// eslint-disable-next-line import/no-anonymous-default-export
export default class {
  
  initialize(editor) {
    const localData = localStorage.getItem('content');
    initdb(); // open database or initialize it
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      editor.setValue(data || localData || header);
    });

    editor.on('change', () => {
      localStorage.setItem('content', editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
  
}
