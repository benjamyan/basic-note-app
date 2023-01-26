// import { ActionsHandler } from '../../catalog';

// interface IFulfillmentContext {
//     notes: GNoteContext.Value,
//     setNotes: GNoteContext.SetValue,
//     setAction: GActionContext.SetValue
// };
// let _Note: GNote.IWorkingTodoNote = null,
//     _Context: IFulfillmentContext = null,
//     _self: {
//         fulfillmentAction: string,
//         globalNoteContextValue: GNoteContext.Value;
//         currentNoteGlobalIndex: number
//     } = this;

// const instanciateModuleVars = ()=> {
//     _self.globalNoteContextValue = JSON.parse(JSON.stringify(_Context.notes));
//     _self.currentNoteGlobalIndex = (
//         _self.globalNoteContextValue.findIndex(
//             note=> note._nid === _Note._nid
//         )
//     );
//     _self.fulfillmentAction = _Note.action;
//     delete _Note.action;
// };
// const updateExistingNote = async (fieldsForUpdate: GNote.IStdNoteContent)=> {
//     let NoteToUpdate = _self.globalNoteContextValue[_self.currentNoteGlobalIndex];
//     for (const field in fieldsForUpdate) {
//         NoteToUpdate[field] = fieldsForUpdate[field];
//     };
//     _self.globalNoteContextValue.splice(
//         _self.currentNoteGlobalIndex, 1, NoteToUpdate
//     );
//     _Context.setNotes(_self.globalNoteContextValue);
//     await ActionsHandler.updateNote({
//         _nid: _Note._nid, 
//         ...fieldsForUpdate
//     });
// };
// const performFulfillmentAction = async ()=> {
//     switch (_self.fulfillmentAction) {
//         case 'ADD': { // Adds note to all storage and reflects it in client state
//             await ActionsHandler.addNote(
//                     _Note.fulfillNote()
//                 )
//                 .then( (noteData)=> {
//                     _Context.setNotes([noteData, ..._Context.notes]);
//                 })
//                 .catch( (err)=>console.log(err) );
//             _Context.setAction(0);
//             break;
//         };
//         case 'UPDATE': { // Updates an already existing note
//             await updateExistingNote(
//                 _Note.fulfillNote()
//             );
//             _Context.setAction(0);
//             break;
//         };
//         case 'MOVE': { // Changes the order of a specific note
//             /**
//              * After user completes a note move, the note just after 
//              * it (well call this note B) will determine its placement.
//              * Get note B's index, and negate one from it - then append
//              * that value to this notes 'order' field
//              */
//             break;
//         };
//         case 'DELETE': { // Deletes a note permanently from all storage
//             _self.globalNoteContextValue.splice( 
//                 _self.currentNoteGlobalIndex, 1 
//             );
//             ActionsHandler.removeNote(_Note._nid);
//             _Context.setNotes(_self.globalNoteContextValue);
//             break;
//         };
//         default: { // Makes changes to completed status in note object
//             _Note.content.completed = function() {
//                 switch (_self.fulfillmentAction) {
//                     case 'COMPLETE': return 1;
//                     case 'REMOVE':  return -1;
//                     default: return 0;
//                 }
//             }();
//             updateExistingNote(_Note.content);
//         };
//     };
//     return true;
// };

// export default async function noteFulfillmentEvent({ Note, Context }: { 
//         Note: GNote.IWorkingTodoNote, 
//         Context: IFulfillmentContext 
//     }) {
//         try {
//             _Context = Context;
//             _Note = Note;
//             instanciateModuleVars();
//             performFulfillmentAction();
//         } catch (err) {
//             console.log(err)
//         }
// };


export default {}




// const noteFulfillmentHandler = async (context, Note)=> {
    // const {notes, setNotes, setAction } = context;
    // const { _nid, action } = Note;
    // const globalNoteContextValue = JSON.parse(JSON.stringify(notes));
    // const currentNoteGlobalIndex = (
    //     globalNoteContextValue.findIndex(
    //         note=> note._nid === _nid
    //     )
    // );
    // const updateExistingNote = (fieldsForUpdate={})=> {
    //     let NoteToUpdate = globalNoteContextValue[currentNoteGlobalIndex];
    //     for (const field in fieldsForUpdate) {
    //         NoteToUpdate[field] = fieldsForUpdate[field];
    //     };
    //     globalNoteContextValue.splice(
    //         currentNoteGlobalIndex, 1, NoteToUpdate
    //     );
    //     setNotes(globalNoteContextValue);
    //     ActionsHandler.updateNote({
    //         _nid, ...fieldsForUpdate
    //     });
    // };
    /* eslint-disable no-lone-blocks */
    // switch (action) {
    //     case 'ADD': { // Adds note to all storage and reflects it in client state 
    //         await ActionsHandler.addNote(
    //                 new FulfilledNote({ ...Note })
    //             )
    //             .then( (noteData)=> {
    //                 setNotes([noteData, ...notes]);
    //                 setAction(0);
    //             })
    //             .catch( (err)=>console.log(err) );
    //         break;
    //     };
    //     case 'UPDATE': { // Updates an already existing note
    //         updateExistingNote(
    //             new FulfilledNote({ ...Note })
    //         );
    //         setAction(0);
    //         break;
    //     };
    //     case 'MOVE': { // Changes the order of a specific note
    //         /**
    //          * After user completes a note move, the note just after 
    //          * it (well call this note B) will determine its placement.
    //          * Get note B's index, and negate one from it - then append
    //          * that value to this notes 'order' field
    //          */
    //         break;
    //     };
    //     case 'DELETE': { // Deletes a note permanently from all storage
    //         globalNoteContextValue.splice( 
    //             currentNoteGlobalIndex, 1 
    //         );
    //         ActionsHandler.removeNote(_nid);
    //         setNotes(globalNoteContextValue);
    //         break;
    //     };
    //     default: { // Makes changes to completed status in note object
    //         const completionStatus = function() {
    //             switch (action) {
    //                 case 'COMPLETE': return 1;
    //                 case 'REMOVE':  return -1;
    //                 default: return 0;
    //             }
    //         }();
    //         delete Note.content.completed;
    //         updateExistingNote({
    //             ...Note.content,
    //             completed: completionStatus
    //         });
    //     };
    // };
    /* eslint-enable no-lone-blocks */
// }