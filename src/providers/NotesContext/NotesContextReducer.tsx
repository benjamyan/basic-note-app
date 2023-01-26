import * as services from '../../services';
import * as Utils from '../../utils';
import { IFulfilledNoteContent, NavigationActionResource, NoteContextReducer, NoteContextState, NoteReducerAction, NoteReducerActionIntermediary, NoteReducerActions } from './types'
import { make_DefaultViewNoteItem } from './NoteFactory';
// import noteContextHelpers from './NotesContextHelpers';

/** Initialization function passes payload to reducer and gets baseline context value */
export const notesContextInitializer = (notesContext: NoteContextState): NoteContextState => {
    let userNotesStateContext: any[] = [];

    /** Get our remote/local items and append them conditionally */
    const locallyStoredNotes = Utils.storage.localNotes;
    if (!!locallyStoredNotes) {
        userNotesStateContext = userNotesStateContext.concat(locallyStoredNotes)
    }

    notesContext.userNotes = userNotesStateContext.map(
        (note)=> make_DefaultViewNoteItem({ note })
    );
    
    return notesContext
};

/** Reducer function for our note context.
 * @NEW Adds a new note object to the context 
 * @ADD Add new note to the context
 * @FOCUS Add the current `note._nid` or `NEW` to our state
 * @UNFOCUS Set our focus state back to `null`
 * @UPDATE Updates an already existing note in the context 
 * @REMOVE Removes a note from the context
 */
export default function notesReducer(state: NoteContextState, action: NoteReducerActionIntermediary): NoteContextState {
    const { type, payload } = action;
    const _state = { ...state };

    console.log({...action})

    switch (type) {
        case 'NEW': {
            _state.focusedNote = 'NEW';
            break;
        }
        case 'ADD': {
            /** Action to add a note */
            console.log("Note reducer action: ADD");

            const _payload = payload as NavigationActionResource<'ADD'>;
            if (_payload
                && _payload._nid === undefined
                && !!_payload.title) {
                    const newNote = Utils.storage.new(JSON.stringify(_payload));
                    if (typeof newNote === 'object') {
                        _state.userNotes = [
                            ..._state.userNotes,
                            newNote as IFulfilledNoteContent
                        ];
                    }
            }
            // Unshift on our state array and add a new note
            break;
            // return state
        }
        case 'FOCUS': {
            if (!!_state.focusedNote) {
                throw new Error('Cannot dispatch FOCUS event while focusedNote in context stack is already set. Unset this state before dispatching a FOCUS event.')
            }
            if (payload?._nid) {
                _state.focusedNote = payload._nid;
            }
            break;
        } 
        case 'UNFOCUS': {
            _state.focusedNote = null;
            break;
        }
        case 'UPDATE': {
            /** 
             * Dspatch an update to an existng note
             * - Change user data
             * - Change order/completion status
             */
            console.log("Note reduced action: UPDATE");
            //
            break;
            // return state
        }
        case 'REMOVE': {
            /** Action to remove/delete a note */
            console.log("Note reducer action: REMOVE");
            //
            break;
            // return state
        }
        case 'DELETE': {
            console.log("Note reducer action: DELETE");
            break;
        }
        default: {
            throw new Error(`Unhandled action type in NotesContext Reducer function: ${type}`);
        }
    }
    return _state
}
