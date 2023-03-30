import React, { useState, useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import { initdb, getDb, putDb } from '../utils/editor/database';
import { header } from '../utils/editor/header';
import Editor from '../utils/editor/editor';

const PersonalNotes = ({ value = "", onUpdate = undefined }) => {
  const editor = useRef(null);

  useEffect(() => {
    const currentEditor = editor.current;
    const extensions = [basicSetup({
      foldGutter: false,
      dropCursor: false,
      allowMultipleSelections: false,
      indentOnInput: false,
    })];
    if (onUpdate) {
      extensions.push(EditorView.updateListener.of(onUpdate));
      //localStorage.setItem('content', view.state.doc);
    }

    const state = EditorState.create({
      doc: value,
      extensions
    });
    const view = new EditorView({ state, parent: currentEditor });

    initdb(); // open database or initialize it
    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const localData = localStorage.getItem('content');
      view.dispatch({
        changes: { from: 0, insert: (data || localData || header) }
      });
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
          <div ref={editor} />

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