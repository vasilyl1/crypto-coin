import React, { useState, useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import { initdb, getDb, putDb } from '../utils/editor/database';
import { header } from '../utils/editor/header';

const Transactions = ({ value = "", onUpdate = undefined }) => {
  const editor = useRef(null); // defines the reference to the editor. This variable is excluded from REACT

  const handleLocalStorage = (doc) => { // Save the content of the editor to local storage on document change
    doc.forEach((el, index) => (localStorage.setItem(`content${index}`, el)));
    localStorage.setItem('content-1', doc.length);
  };
  const readLocalStorage = () => {
    const array = [];
    for (let i = 0; i < parseInt(localStorage.getItem('content-1')); i++) {
      array.push(localStorage.getItem(`content${i}`));
    }
    return array;

  }

  const handleIndexedDb = () => { // Save the content of the editor when the editor itself loses focus
    putDb(JSON.parse(localStorage.getItem("content")));
  };

  useEffect(() => {
    const currentEditor = editor.current; // initialize the editor with basic setup parameters
    const extensions = [
      basicSetup({
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
      }),
      EditorView.updateListener.of((v: ViewUpdate) => { // set up the listener on view instance update
        if (v.docChanged) { // check the flag if the document has been changed
          // Document changed
          handleLocalStorage(v.state.doc.text); // initialize local storage update
        }
      })
    ];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    const state = EditorState.create({ // initialize editor state
      doc: value,
      extensions
    });
    const view = new EditorView({ state, parent: currentEditor }); // initialize editor view instance
    initdb(); // open database or initialize it
    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      const localData = readLocalStorage(); // read localstorage
      let localDataString = ''; // concatenate strings for the editor
      if (localData) for (let i = 0; i < localData.length; i++) {
        localDataString = localDataString + localData[i];
        if (i < localData.length - 1) localDataString = localDataString + `\n`;
      } else localDataString = null;
      const insert = localDataString || header;
      view.dispatch({ // dispatch the changes to the editor
        changes: { from: 0, insert: insert }
      });
    });

    return () => view.destroy();
  }, [editor]);

  /*
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      // register workbox service worker
      const workboxSW = new Workbox('./src-sw.js');
      workboxSW.register();
    } else {
      console.error('Service workers are not supported in this browser.');
    }
  */
  return (<>

    <div>
      <nav id="navbar">
        <div className="nav-btn">
          <a className="btn btn-sm btn-dark" id="buttonInstall" role="button" href="#">Install!</a>
        </div>

        <h1> Personal Notes</h1>
        <div ref={editor}
        />

        <div className="navbar-brand" > <img src="./assets/icons/icon_96x96.png" /></div>


        <div className="navbar-brand" > <img src="./assets/icons/icon_96x96.png" /></div>
      </nav >

      <main id="main">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </main>

    </div >
  </>);

}

export default Transactions;