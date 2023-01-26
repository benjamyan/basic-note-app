import { IDefaultWorkingNote, INewWorkingNoteItem } from '../../types';
import { randomStr } from '../../utils';

/** New note object */
export const make_NewNoteItem = (): INewWorkingNoteItem['content'] => ({
    // view: 'EDIT',
    // content: {
    //     _nid: randomStr() 
    // }
    _nid: randomStr() 
});

export const make_DefaultViewNoteItem = ({ note }: {note: IDefaultWorkingNote['content']}): IDefaultWorkingNote['content'] => ({
    
    
    
    ...note,
    // content: { ...note }
    /** The view of the note to the user - edit/view/new */
    // type: 'STD',
    // type: function() {
    //     // console.log(this)
    // },
    /** the type/location of the note - history/active */
    // view: 'VIEW',
    // view: function() {
    //     if (note.completed === 1) {
    //         return 'HISTORY'
    //     } else {
    //         return 'ACTIVE'
    //     }
    // }
});

export const make_NoteAsListItem = ()=> ({

})

// const noteItemFactory = ()=> ({
//     _nid: null,
//     _uid: null,
//     view: null,
//     // key: utils.randomStr(),
//     content: {
//         title: null,
//         priorty: null,
//         date_due: null,
//         completed: null,
//         order: null
//     }
// });
