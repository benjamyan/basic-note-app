import React, { forwardRef } from 'react';
import { randomStr } from '../../utils';
import content from '../../config/textContent';
import { SelectContainer } from './__fieldStyles';

const PrioritySelectionOptions = ({ priority })=> {
	return priority.map(
		(level, i) => (
			<option 
				value={i} 
				key={randomStr()}>
					{level}
			</option>
		)
	);
}
const PrioritySelection = (props, ref)=> {
	const { priority } = content.notes;
	return (
		<SelectContainer>
			<label htmlFor={'priority-select'}>Priority:</label>
			<select 
				id="priority-select" 
				ref={ ref } 
				defaultValue={ 
					!!props.value ? props.value : priority.length - 1
				}
				children={
					<PrioritySelectionOptions priority={priority} />
				}
			/>
		</SelectContainer>
	);
}
export default forwardRef(PrioritySelection);
