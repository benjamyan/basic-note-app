import React from 'react';
import { useClientContext } from '../ClientContext/ClientContext';
import notesReducer, { notesContextInitializer } from './NotesContextReducer';
import noteContextUtils from './NotesContextUtils';
import {
    NoteProvider, 
    NoteContextValue,
    NoteReducerDispatchMediary
} from './types';

/** An array that holds all user notes and includes sorting methods as well as dispatches events */
const NotesContext: React.Context<NoteContextValue> = React.createContext<NoteContextValue>(null!);

/** Util/helper functions passed along seperately from context 
 * @see {@link noteContextUtils}
 */
let noteUtils: ReturnType<typeof noteContextUtils> = null!;

/** Baseline Context Provider for our notes context stack
 * @param focusedNote {String | `NEW` | null} The currently active note UUID (_nid)
 * @param userNotes {Array} An array holding all of our notes from local/remote sources
 */
const NotesContextProvider: NoteProvider = ({ children }) => {
    const { client, updateClient } = useClientContext();

    const [ noteContext, dispatchNoteContextEvent ] = React.useReducer(
        notesReducer, 
        {
            focusedNote: null,
            userNotes: []
        }, 
        notesContextInitializer 
    );
    noteUtils = noteContextUtils(noteContext);

    const interceptNoteDispatchEvent: NoteReducerDispatchMediary = (action)=> {
        switch (action.type) {
            case 'NEW':
            case 'ADD':
            case 'FOCUS':{
                if (client.action !== 'NOTE') {
                    updateClient('action', 'NOTE')
                }
                break;
            }
            case 'UPDATE':
            case 'UNFOCUS': {
                if (client.action === 'NOTE') {
                    updateClient('action', null)
                }
                break;
            }
            default: {
                // console.error(`Unhandled case value`)
            }
        }
        dispatchNoteContextEvent(action)
        return;
    }
    
    return (
        <NotesContext.Provider value={{ 
            noteContext, 
            dispatchNoteContextEvent: interceptNoteDispatchEvent 
        }}>
            { children }
        </NotesContext.Provider>
    );
};

/** Baseline function to provide context object within the provider 
 * @param value.focused The note were editing/adding
 * @param value.notes User notes. Includes helper functions ({@link noteContextUtils})
 * @param value.setNotes Dispatch functions for our reducer ({@link notesReducer})
 * 
 * @see {@link noteContextUtils}
 * @see {@link notesReducer}
 */
const useNoteContext = (): NoteContextValue => {
    const noteContext: NoteContextValue = React.useContext(NotesContext);
    return noteContext
};

export { 
    NotesContextProvider, 
    useNoteContext,
    noteUtils
}