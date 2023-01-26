import * as React from 'react';
import { useNoteContext } from '../../providers';
import {
	NoteSelectionWrapper,
	CheckboxSelect,
    // MoveSelect,
	DeleteSelect
} from './__navigationStyles';

import { NoteContentRefs } from '../Lists/SingleListItem'
import { IStdNoteContent, NoteReducerAction } from '../../providers/NotesContext/types';

type NoteActionsNavigationProps = {
    noteItem: any;
    noteIsFocused: boolean;
    contentRefs: NoteContentRefs;
}

export const NoteActionsNavigation = ({ noteItem, noteIsFocused, contentRefs }: NoteActionsNavigationProps)=> {
    const { dispatchNoteContextEvent } = useNoteContext()
    // const { focusedNote } = useNoteContext().noteContext;
    // const { setAction } = useClientContext();
    const selectionOnClickHandler = (fulfillmentAction: NoteReducerAction['type'])=> {
        // dispatchNoteContextEvent({
        //     type: fulfillmentAction,
        //     payload: null
        // })
        // Note.action = fulfillmentAction;
        // noteFulfillmentEvent({
        //     Note: {
        //         ...Note,
        //         action: fulfillmentAction
        //     }, 
        //     Context: { 
        //         notes: useNoteContext().notes, 
        //         setNotes: useNoteContext().setNotes, 
        //         setAction
        //     }
        // });
    };

    const getRefValuesFromNote = (): IStdNoteContent=> ({
        _nid: noteItem === 'NEW' ? undefined : noteItem._nid,
        title: contentRefs.title.current.value,
        priority: parseInt(contentRefs.priority.current.value),
        date_due: Date.parse(contentRefs.dueDate.current.dataset.value as string)
    })

    const NoteActionNav: any = React.useCallback(
        ()=> {
            if (noteIsFocused) {    
                return (
                    <>
                        <CheckboxSelect // accept new note/changes
                            title='Accept'
                            className={ 'accept' }
                            onClick={()=> {
                                const titleRef = contentRefs.title.current;
                                if (titleRef.reportValidity()) {
                                    dispatchNoteContextEvent({
                                        type: 'ADD',
                                        payload: {...getRefValuesFromNote()}
                                    })
                                } else return null;
                            }} 
                        />
                        <DeleteSelect // cancel note add/edit
                            title='Cancel'
                            className={ 'cancel' }
                            onClick={ ()=> {
                                dispatchNoteContextEvent({
                                    type: 'UNFOCUS',
                                    payload: null
                                })
                            }}
                        />
                    </>
                )
            } else if (noteItem.view() === 'ACTIVE') {
                return (
                    <>
                        <CheckboxSelect // note completed
                            title='Complete'
                            className={ 'accept' }
                            onClick={ ()=> {
                                console.log(noteItem)
                                // dispatchNoteContextEvent({
                                //     type: 'UPDATE',
                                //     payload: {
                                //         _nid: noteId
                                //     }
                                // })
                            }}
                        />
                        {/* <MoveSelect // set note order
                            title='Move'
                        /> */}
                        <DeleteSelect // delete note
                            title='Remove'
                            className={ 'delete' }
                            onClick={ ()=> selectionOnClickHandler('REMOVE') } 
                        />
                    </>
                )
            } else {
                return (
                    <>
                        <CheckboxSelect // restore note
                            title='Restore'
                            className={ 'restore' }
                            onClick={ ()=> selectionOnClickHandler('RESTORE') } 
                        />
                        <DeleteSelect // delete note
                            title='Delete permanently'
                            className={ 'delete' }
                            onClick={ ()=> selectionOnClickHandler('DELETE') } 
                        />
                    </>
                )
            }
        }, [ noteIsFocused ]
    );

    // React.useEffect(()=>{
    //     console.log(noteItem)
    //     console.log(focusedNote)
    // }, [])

    return (
        <NoteSelectionWrapper>
            <NoteActionNav />
            {/* <NoteActionNav.Component { ...NoteActionNav.props } /> */}
            {/* <NoteActionComponent onClickHandler={selectionOnClickHandler} /> */}
        </NoteSelectionWrapper>
    );
}
export default NoteActionsNavigation
