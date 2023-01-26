// import ActionsHandler from '../';

// interface IFulfillmentContext {
//     notes: GNoteContext.Value,
//     setNotes: GNoteContext.SetValue,
//     setAction: GActionContext.SetValue
// };
// interface IFulfillmentInstance {
//     uuid: number;
//     Note: GNote.IWorkingTodoNote;
//     Context: IFulfillmentContext;
// }

// let fulfillmentsInAction: Array<IFulfillmentInstance> = [];

// class FulfillmentInstance implements IFulfillmentInstance {
//     uuid: number;
//     Note: GNote.IWorkingTodoNote;
//     Context: IFulfillmentContext;
//     constructor(props: IFulfillmentInstance) {
//         this.uuid = 0;
//         this.Note = props.Note;
//         this.Context = props.Context;
//     };
//     set globalNoteContextValue(Context) {
//         const clonedNoteContext = (
//             JSON.parse(JSON.stringify(Context.notes))
//         );
//         this.globalNoteContextValue = clonedNoteContext;
//     }
//     get globalNoteContextValue() {
//         return this.globalNoteContextValue;
//     }
//     get currentNoteGlobalIndex() {
//         const globalNoteByNid = this.globalNoteContextValue.findIndex(
//             (note: { _nid: any; })=> note._nid === this.Note._nid
//         );
//         return globalNoteByNid
//     }
//     set fulfillmentAction(Note) {
//         this.fulfillmentAction = Note.action;
//         delete this.Note.action;
//     }
//     get fulfillmentAction() {
//         return this.fulfillmentAction
//     }
// }

// const performFulfillmentAction = async (_FulfillmentInstance)=> {
//     const _self = _FulfillmentInstance;
//     const updateExistingNote: any = async (fieldsForUpdate: GNote.IStdNoteContent)=> {
//         let NoteToUpdate = _self.globalNoteContextValue[_self.currentNoteGlobalIndex];
//         for (const field in fieldsForUpdate) {
//             NoteToUpdate[field] = fieldsForUpdate[field];
//         };
//         _self.globalNoteContextValue.splice(
//             _self.currentNoteGlobalIndex, 1, NoteToUpdate
//         );
//         _self.Context.setNotes(_self.globalNoteContextValue);
//         try {
//             // await ActionsHandler.updateNote({
//             //     _nid: _self.Note._nid, 
//             //     ...fieldsForUpdate
//             // });
//             return true;
//         } catch (err) {
//             console.log(err)
//             return false;
//         }
//     }
//     switch (_self.fulfillmentAction) {
//         case 'ADD': { // Adds note to all storage and reflects it in client state
//             // await ActionsHandler.addNote(
//             //         _self.Note.fulfillNote()
//             //     )
//             //     .then( (noteData)=> {
//             //         _self.Context.setNotes([noteData, ..._self.Context.notes]);
//             //     })
//             //     .catch( (err)=>console.log(err) );
//             _self.Context.setAction(0);
//             break;
//         };
//         case 'UPDATE': { // Updates an already existing note
//             await updateExistingNote(
//                 _self.Note.fulfillNote()
//             );
//             _self.Context.setAction(0);
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
//             // ActionsHandler.removeNote(_self.Note._nid);
//             _self.Context.setNotes(_self.globalNoteContextValue);
//             break;
//         };
//         default: { // Makes changes to completed status in note object
//             _self.Note.content.completed = function() {
//                 switch (_self.fulfillmentAction) {
//                     case 'COMPLETE': return 1;
//                     case 'REMOVE':  return -1;
//                     default: return 0;
//                 }
//             }();
//             updateExistingNote(_self.Note.content);
//         };
//     };
//     return true;
// };

// export default async function() {
//     onmessage = function(event) {
//         const { uuid, Note, Context } = event.data;
//         const instanceExists = (instance: IFulfillmentInstance): boolean=> {
//             return instance.uuid === uuid;
//         }
//         if (!fulfillmentsInAction.some(instanceExists)) {
//             const NewFulfillment = new FulfillmentInstance({ uuid, Note, Context });
//             fulfillmentsInAction.push(NewFulfillment);
//             // return true;
//         }
//         // return false;
//     }
// };

export default {}
