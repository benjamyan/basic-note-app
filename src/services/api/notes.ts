/*
const Local = require('./local.service');
const local = {
	addNew(noteId, NoteToAdd) {
        try {
            // console.log("Local Notes new()");
            Local.add(
                noteId, NoteToAdd
            );
            return true;
        } catch (err) {
            console.log(err)
            return err;
        };
    },
    update(noteId, NoteToUpdate) {
        // console.log('LocalService Notes update');
        const localNoteId = `note_${noteId}`;
        const localNote = Local.exists(localNoteId);
        if (!!localNote) {
            const parsedNote = JSON.parse(localNote);
            for (const item in NoteToUpdate) {
                parsedNote[item] = NoteToUpdate[item];
            }
            Local.update(localNoteId, parsedNote);
        };
    },
    remove(noteId) {
        const localNoteId = `note_${noteId}`;
        const localNote = Local.exists(localNoteId);
        if (!!localNote) {
            Local.remove(localNoteId);
        };
    },
    get all() {
        const processNoteForReturn = (key)=> {
            let noteItem = JSON.parse(
                Local.exists(key)
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
};
*/

async function get_AllNotes(userId='') {
	const userNotes =
		await fetch(`/api/notes/${userId}`)
			.then(res => res.json())
			.catch(err => console.log(err));
	return userNotes;
}
async function set_SyncNotes(userId='') {
	/**
	 * syncs notes between LocalStorage and data dump
	 */
	console.log("Api set_SyncNotes")
}
async function post_NewNote(noteProps={}) {
	console.log("Api addNote()");
	/**
	 * Adds a new note with the provided _uid to db
	 * @param noteProps
	 * -- @include _uid <String>
	 * -- @include _nid <String>
	 * -- @include title <String>
	 * -- @include priorty <Number>
	 * -- @include date_due <String || Date>
	 * @returns api response containing note db instance
	 */
	try {
		const newNote = (
			await fetch('/api/notes', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(noteProps)
			})
			.then((res) => res.json())
			.catch(err => console.log(err))
		);
		return newNote;
	} catch (err) {
		console.log(err)
		return err;
	}
}
async function put_UpdateNote(noteProps={}) {
	console.log("Api put_UpdateNote");
	console.log(noteProps)
}
async function delete_RemoveNote(noteId='') {
	console.log("Api delete_RemoveNote");
	//
}

export default {
	// local,
	get_AllNotes,
	set_SyncNotes,
	post_NewNote,
	put_UpdateNote,
	delete_RemoveNote
}
