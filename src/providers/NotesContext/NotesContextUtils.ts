import { make_NewNoteItem } from "./NoteFactory";
import { IFulfilledNoteContent } from "./types";


export interface NoteContextUtilProps {
    userNotes: Array</*GNote.IStdNoteContent |*/ IFulfilledNoteContent>;
}

const noteContextUtils2 = ({ userNotes }: NoteContextUtilProps)=> ({
    spawnNewNote() {
        return make_NewNoteItem();
    },
    getNoteById(noteId: string) {
        const noteById = (
            userNotes.find( note=> note._nid === noteId )
        )
        if (!!noteById) {
            return noteById
        } 
        return undefined
    },
    get filterByActive() {
        const activeNotes = (
            userNotes
                .filter( (Note)=> Note.completed === 0 )
                .sort( (a, b)=> a.priority - b.priority )
                .map( (note)=> note._nid )
                .filter(Boolean)
        );
        if (!!activeNotes) {
            return activeNotes as string[]
        } else return []
    },
    get filterByCompleted() {
        const completedNotes = (
            userNotes
                .filter( (note)=> note.completed !== 0 )
                .map( (note)=> note._nid )
                .filter(Boolean)
        );
        if (!!completedNotes) {
            return completedNotes as string[]
        } else return []
    }
})
export default noteContextUtils2
/** Helper functions for our note context
 * All helpers operate on a single depth
 * Not possible to mutate the notes context from a helper function
 */
export function noteContextUtils(noteContextUtilProps: NoteContextUtilProps) {
    const { userNotes } = noteContextUtilProps;
    const noteUtils: any = {};
    
    /** Returns a new note item with a fresh _nid  */
    noteUtils.spawnNewNote = ()=> {
        return make_NewNoteItem();
    };

    /** Filter only notes that are active ( note.completed != 0 )
     * @returns {array} of note._nid
     */
     noteUtils.filterByActive = ()=> {
        const activeNotes = (
            userNotes
                .filter( (Note)=> Note.completed === 0 )
                .sort( (a, b)=> a.priority - b.priority )
                .map( (note)=> note._nid )
        );
        if (!!activeNotes) {
            return activeNotes
        } else return []
    };

    /** Filter for notes which are completed ( note.completed == 0 ) 
     * @property noteUtils.filterByCompleted
     * @returns note._nid 
     */
    noteUtils.filterByCompleted = function() {
        const completedNotes: any[] | undefined = (
            userNotes
                .filter( (note)=> note.completed !== 0 )
                .map( (note)=> note._nid )
        );
        if (!!completedNotes) {
            return completedNotes
        } else return []
    };

    /** Returns the whole note object that matches the _nid provided */
    noteUtils.getNoteById = function(noteId: string) {
        const noteById = (
            userNotes.find( note=> note._nid === noteId )
        )
        if (!!noteById) {
            return noteById
        } 
        return undefined
    }

    return noteUtils
}
