import React from "react";
import { tsUtil } from "../../types";

interface IBaselineNoteContent {
    _nid?: string;
}
export interface IStdNoteContent extends IBaselineNoteContent {
    title: string;
    priority: number;
    date_due: number;
}
export interface IOptionalNoteContent {
    /** TODO change to bool - 0 is not completed */
    completed?: number;
    order?: number;
}
export interface IFulfilledNoteContent extends IOptionalNoteContent, IStdNoteContent {
    _uid?: string | unknown
}

export interface NoteContextState {
    focusedNote: 'NEW' | string | null;
    userNotes: IFulfilledNoteContent[];
}
export interface NoteReducerAction {
    type: 'NEW' | 'ADD' | 'FOCUS' | 'UNFOCUS' | 'UPDATE' | 'REMOVE' | 'DELETE',
    payload: any | null;
}
export type NoteReducerActions = 
    {
        type: 'NEW',
        payload: null
    } | {
        type: 'ADD',
        payload: IStdNoteContent
    } | {
        type: 'FOCUS',
        payload: IBaselineNoteContent
    } | {
        type: 'UNFOCUS',
        payload: null
    } | {
        type: 'UPDATE',
        payload: Required<IBaselineNoteContent> & Partial<IFulfilledNoteContent>;
    } | {
        type: 'REMOVE',
        payload: IBaselineNoteContent
    } | {
        type: 'DELETE',
        payload: IBaselineNoteContent
    };

export type NoteReducerActionIntermediary = {
    type: NoteReducerActions['type'];
    payload: NavigationActionResource<NoteReducerActions['type']>;
}
export type NavigationActionResource<T extends NoteReducerActions['type']> = (
    tsUtil.ExtractValueByPropKey<NoteReducerActions, T, 'payload'>
);

export type NoteReducerDispatchMediary = (
    args0: NoteReducerActionIntermediary
)=> void;
export type NoteContextReducer = (
    args0: NoteContextState,
    args1: NoteReducerActionIntermediary
)=>  NoteContextState;



/** Provider object/value */
// type TNoteContextHelper = ()=> INoteContextProvider['userNotes'];
export interface NoteContextValue {
    noteContext: NoteContextState;
    dispatchNoteContextEvent: NoteReducerDispatchMediary;
}
export interface INoteContextProvider {
    focusedNote?: string | undefined;
    setFocusedNote: any;
    userNotes: Array<IFulfilledNoteContent | any> | any;
    setUserNotes: React.Dispatch<React.SetStateAction<INoteContextProvider['userNotes']>>;
}

/** Utility functions */
export interface INoteContextUtils {
    [key: string]: (arg0: any)=> void | string | IFulfilledNoteContent | IFulfilledNoteContent[]
}

/** Provider/Consumer values */
export type NoteProvider = (
        { children }: 
        { children: JSX.Element | JSX.Element[] }
    )=> JSX.Element;
export type TNoteConsumer = ()=> React.Consumer<any>;
