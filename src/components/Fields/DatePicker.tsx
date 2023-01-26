// https://github.com/Hacker0x01/react-datepicker
// https://react-component.github.io/time-picker/

import React, {forwardRef, useRef, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
    PickerContainer,
    DateContainer,
	DateIcon,
	TimeIcon
} from './__fieldStyles';

const StyledDatePicker = styled(DatePicker)`
	width: 100%;
	padding: 2px 4px;
	border-radius: 3px;
	height: 20px;
	margin-top: 3px;
	border: none;
	cursor: pointer;
`;
const StyledTimePicker = styled(TimePicker)`
	width: calc(100% - 25px);
	display: inline-block;
	input {
		height: 20px;
		margin-top: 3px;
		padding: 2px 4px;
		cursor: pointer;
		border: none;
	}
`;

const DatePickerField = ({ date, setDate })=> {
	const pickerOptions = {
		dateFormat: "MM/dd/yyyy",
		dateFormatCalendar: " ",
		selected: date,
		placeholderText: 'Due date',
		minDate: new Date(),
		allowSameDay: true,
		showYearDropdown: true,
		showMonthDropdown: true,
		forceShowMonthNavigation: true
	};
	return (
		<DateContainer>
			<DateIcon />
			<StyledDatePicker
				{...pickerOptions}
				onChange={(date) => setDate(date)}
			/>
		</DateContainer>
	)
};
const TimePickerField = ({time, setTime}: any)=> {
	const timeInput: any = useRef();
	const disableSeconds = (h,m)=> {
		return [h + m % 60];
	};
	const setTimeValue = ()=> {
		return setTime(timeInput.current.picker.value)
	}
	return (
		<div>
			<TimeIcon />
			<StyledTimePicker
				ref={timeInput}
				defaultValue={ time }
				placeholder={'Time due...'}
				allowEmpty={false}
				showSecond={false}
				minuteStep={15}
				use12Hours={true}
				disabledSeconds={disableSeconds}
				onClose={setTimeValue}
			/>
		</div>
	)
};

const DatePickerJunior = (props, ref)=> {
	const { value } = props;
	const [date, setDate] = useState(
		value ? new Date(value) : new Date()
	);
	const [time, setTime] = useState(
		moment(value ? new Date(value) : '05:00 pm', 'hh:mm a')
	);
	return (
		<PickerContainer 
			ref={ref} 
			data-value={`${date.toDateString()} ${moment(time, 'hh:mm a').format('hh:mm a')}`}>
				<DatePickerField 
					date={ date } 
					setDate={ setDate }
				/>
				<TimePickerField
					time={ moment(time, 'hh:mm a') } 
					setTime={setTime}
				/>
		</PickerContainer>
	);
}
export default React.memo(forwardRef(DatePickerJunior))
