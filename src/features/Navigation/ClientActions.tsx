import React from 'react';
import { useNoteContext } from '../../providers';
import {
	ButtonContainer,
	AddNoteButton
} from './__navigationStyles';

export const ClientActionsNav = ()=> {
    const { noteContext, dispatchNoteContextEvent } = useNoteContext();
    
    const addNoteBtnOnClickHandler = React.useCallback(
        ()=> {
            if (noteContext.focusedNote === null) {
                /** no current action - button is inactive */
                dispatchNoteContextEvent({
                    type: 'NEW',
                    payload: null
                })
            } else {
                dispatchNoteContextEvent({
                    type: 'UNFOCUS',
                    payload: null
                })
            }
        },
        [ noteContext.focusedNote ]
    );
    
    return (
        <ButtonContainer>
            <AddNoteButton 
                btnActive={ noteContext.focusedNote !== null }
                btnText={ noteContext.focusedNote === null ? 'Add note' : 'Cancel'  } 
                btnOnClick={ addNoteBtnOnClickHandler }
            />
        </ButtonContainer>
    );
}
export default ClientActionsNav
