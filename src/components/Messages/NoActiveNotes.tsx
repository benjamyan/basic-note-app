import React from 'react';
import content from '../../config/textContent';
import { 
	NoActiveNotesContainer
} from './__messageStyles';

export default function NoActiveNotes() {
    const { isEmpty } = content.views.list;
    return (
        <NoActiveNotesContainer>
            <h3>{ isEmpty.h3 }</h3>
            <p>{ isEmpty.p }</p>
        </NoActiveNotesContainer>
    )
}
