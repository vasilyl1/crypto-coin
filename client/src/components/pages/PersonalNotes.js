import React, { useState, useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import { initdb, getDb, putDb } from '../utils/editor/database';
import { header } from '../utils/editor/header';

const PersonalNotes = ({ value = "", onUpdate = undefined }) => {
  const editor = useRef(null);
  const [code, setCode] = useState('');

  const handleLocalStorage = () => { // Save the content of the editor to local storage on key press
    localStorage.setItem('content', code.Text.toJSON());
  };

  const handleIndexedDb =  (e) => { // Save the content of the editor when the editor itself loses focus
    putDb(localStorage.getItem('content'));
    console.log(code);
  };

  useEffect(() => {
    const currentEditor = editor.current;
    const extensions = [basicSetup({
      foldGutter: false,
      dropCursor: false,
      allowMultipleSelections: false,
      indentOnInput: false,
    })];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));
      
    const state = EditorState.create({
      doc: value,
      extensions
    });
    const view = new EditorView({ state, parent: currentEditor });
    //const currText = view.state.Text.toJSON();
    setCode(state);
    initdb(); // open database or initialize it
    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const localData = localStorage.getItem('content');
      view.dispatch({
        changes: { from: 0, insert: (data || localData || header) }
      });
      handleLocalStorage();
      handleIndexedDb();
    });

    return () => view.destroy();
  }, [editor]);


  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('./src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }

  return (<>

    <div>
      <nav id="navbar">
        <div className="nav-btn">
          <a className="btn btn-sm btn-dark" id="buttonInstall" role="button">Install!</a>
        </div>
        <h1> Personal Notes</h1>
        <div ref={editor}
         // onChange={handleLocalStorage()}
         // onBlur={handleIndexedDb()}
         //onBlur={handleLocalStorage()}
        />

        <div className="navbar-brand" > <img src="./assets/icons/icon_96x96.png" /></div>
      </nav>

      <main id="main">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </main>

    </div>
  </>);

}

export default PersonalNotes;