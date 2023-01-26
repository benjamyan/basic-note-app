import storageFactory from "../storage/StorageFactory";

const StorageFactory = storageFactory();
const _self: any = {};

export default {
    addNew(noteId: string, NoteToAdd: GNote.IStdNoteContent): boolean | Error {
        try {
            // console.log("Local Notes new()");
            _self.add(
                noteId, NoteToAdd
            );
            return true;
        } catch (err) {
            console.log(err)
            return err;
        };
    },
    update(noteId: string, NoteToUpdate: GNote.IStdNoteContent) {
        // console.log('LocalService Notes update');
        const localNoteId = `note_${noteId}`;
        const localNote = _self.exists(localNoteId);
        if (!!localNote) {
            const parsedNote = JSON.parse(localNote);
            for (const item in NoteToUpdate) {
                parsedNote[item] = NoteToUpdate[item];
            }
            _self.update(localNoteId, parsedNote);
        };
    },
    remove(noteId: string) {
        const localNoteId = `note_${noteId}`;
        const localNote = _self.exists(localNoteId);
        if (!!localNote) {
            _self.remove(localNoteId);
        };
    },
    get allLocal(): Array<GNote.IStdNoteContent> | unknown {
        const processNoteForReturn = (key: string): GNote.IStdNoteContent=> {
            let noteItem = JSON.parse(
                StorageFactory.getItem(key)
            );
            noteItem._nid = key.split('note_')[1];
            return noteItem
        };
        if (StorageFactory.length > 0) {
            return Object.keys(StorageFactory.active).map(
                StorageFactoryItem=> {
                    if (StorageFactoryItem.startsWith('note')) {
                        return processNoteForReturn(StorageFactoryItem);
                    } else return false;
                } 
            ).filter(Boolean);
        } else return null;
    }
}

// function getLocalNotes() {
// 	try {
// 		const localNotes = Local.Notes.all;
// 		return localNotes
// 	} catch (err) {
// 		console.log(err)
// 	}
// }
// async function syncAllNotes() {
// 	console.log("ActionsHandler syncNotes");
// 	//
// }
// async function addNote(note: GNote.IFulfilledNoteContent) {
// 	// console.log('ActionsHandler addNote')
//     /**
// 	 * @function addNote
// 	 * -- Adds a new note to the local storage, as well as remote backup
// 	 * 
// 	 * @param note
// 	 * -- @include _nid <String>
// 	 * -- @include title <String>
// 	 * -- @include priorty <Number>
// 	 * -- @include date_due <String || Date>
// 	 * 
// 	 * @returns <Boolean> || <Error>
// 	 * 
// 	 */
//     try {
// 		let ChangedNote = ContentFormatting.NoteForStorage(note),
// 			NoteToAdd = (
// 				!!_token ? JSON.parse(JSON.stringify(ChangedNote)) : null
// 			);
// 		Local.Notes.addNew(
// 			`note_${note._nid}`, ChangedNote
// 		);
// 		if (!!_token.access) {
// 			await Notes.post_NewNote(NoteToAdd)
// 		};
// 		return ChangedNote;
//     } catch (err) {
//         console.log(err);
//         return err;
//     };
// }
// async function updateNote(note={}) {
// 	// console.log("ActionsHandler updateNote");
// 	/**
// 	 * @param noteId <String>
// 	 * -- noteId specific to local storage
// 	 * @param noteProps <Object>
// 	 * -- Object with fields to update note with
// 	 * -- Only need to include what is being updated
// 	 * @returns Boolean || err
// 	 */
// 	try {
// 		const UpdatedNote = (
// 			new ContentFormatting.NoteForStorage(note)
// 		);
// 		Local.Notes.update(UpdatedNote._nid, UpdatedNote);
// 		if (!!_token.access) {
// 			// const NoteToUpdate = {
// 			// 	_uid: _token,
// 			// 	_nid: noteId,
// 			// 	...noteProps
// 			// };
// 			// await Notes.put_NewNote(NoteToUpdate);
// 		};
// 		return UpdatedNote;
// 	} catch (err) {
// 		console.log(err)
// 		return err;
// 	}
// }
// async function removeNote(noteId='') {
// 	// console.log("ActionsHandler removeNote");
// 	/**
// 	 * @param noteId
// 	 * -- The local note ID of note to be removed
// 	 * @returns Boolean || Error
// 	 */
// 	try {
// 		Local.Notes.remove(noteId);
// 		if (!!_token.access) {
// 			await Notes.delete_RemoveNote(noteId);
// 		};
// 	} catch (err) {
// 		console.log(err)
// 		return err;
// 	}
// }

// export default {};