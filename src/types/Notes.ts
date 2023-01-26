import * as React from 'react';

/**
 * 
 * Notes being edited/worked on in client view
 */
// type WorkingNoteFieldRefs = {
//     title: React.RefObject,
//     priority: React.RefObject,
//     date_due: React.RefObject
// }
export interface IBaselineWorkingNote {
    // key: string,
    view: string
}
export interface INewWorkingNoteItem extends IBaselineWorkingNote {
    content: INewNoteContent;
}
export interface IDefaultWorkingNote extends IBaselineWorkingNote {
    content: IStdNoteContent | IFulfilledNoteContent;
}
export interface IWorkingTodoNote extends IDefaultWorkingNote {
    _nid: string,
    type: string,
    refs: any; // WorkingNoteFieldRefs,
    action: string,
    // fields: WorkingNoteFieldRefs,
    // fulfillNote: ()=> IFulfilledNoteContent
}
/**
 * 
 * Note content...
 */
export interface INewNoteContent {
    _nid?: string
}
export interface IOptionalNoteContent {
    completed?: number,
    order?: number
}
export interface IStdNoteContent extends INewNoteContent {
    title: string,
    priority: number,
    date_due: number
}
export interface IFulfilledNoteContent extends IOptionalNoteContent, IStdNoteContent {
    _uid?: string | unknown
}