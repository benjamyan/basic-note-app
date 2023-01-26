/**
 * All data formatting, whether in or out of the application, should be happening here
 */
import { notes } from '../../config/textContent';
import * as utils from '../../utils';
// const { notes } = require('../../content').default;
// const utils = require('../../utils');

const titleAsDisplayText = (givenTitle)=> {
    // console.log("NoteContentFormatting titleAsDisplayText");
    /**
     * @function
     * Formats the title as needed
     * 
     * @param givenTitle <String>
     * 
     * @returns String
     */
    return givenTitle
    // return ( // capitalizes first letter in string
    //     givenTitle.charAt(0).toUpperCase() + givenTitle.slice(1)
    // );
};
const priorityAsDisplayText = (givenPriority)=> {
    const priorityList = notes.priority;
    const priorityValue = parseInt(givenPriority)
    // if (givenPriority === priorityList.length - 1) {
    //     return null;
    // } else {
        return priorityList[priorityValue];
    // };
};
const dateAsDisplayText = (givenDate)=> {
    // console.log("NoteFormatting noteDateDisplayText");
    /**
     * @function noteDateDisplayText
     * Used to format the date to be displayed in a note
     * @if parsed date year == current year
     * -- Display in MM/DD
     * @if parsed date == current date 
     * -- Display the time due
     * -- @if no time, display 'today'
     * 
     * @param givenDate <String||Number>
     * If given a number, must be a unix timestamp
     * If given a string, must be a date string
     * 
     * @returns Date <String>
     */
    const isSameYear = (dateStr)=> {
        const dateYear = dateStr.toLocaleDateString('en-us').split('/').at(-1);
        const thisYear = new Date().toLocaleDateString('en-us').split('/').at(-1);
        return dateYear === thisYear;
    };
    const isSameDay = (dateStr)=> {
        return (
            new Date().toLocaleDateString('en-us') === dateStr.toLocaleDateString('en-us')
        );
    };
    const formatTime = (givenTime)=> {
        let finalTime;
        if (givenTime.split(' ')[0].endsWith('1')) {
            return notes.empty.time;
        } else {
            if (givenTime.startsWith('0')) {
                finalTime = givenTime.substring(1);
            } else {
                finalTime = givenTime;
            };
            return finalTime.split(' ').join('').toLowerCase()
        };
    };
    let initialDate = (
            typeof givenDate == 'number' ?
                new Date(givenDate) : 
                new Date(Date.parse(givenDate))
        ),
        dateOptions = {
            month: 'short',
            day: 'numeric'
        },
        timeOptions = {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        };
    try {
        if (isSameDay(initialDate)) {
            initialDate = formatTime(
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ hour12: boolean; hour: string;... Remove this comment to see the full error message
                initialDate.toLocaleTimeString('en-us', timeOptions)
            );
            return 'Today, ' + initialDate;
        } else {
            if (!isSameYear(initialDate)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'year' does not exist on type '{ month: s... Remove this comment to see the full error message
                dateOptions.year = 'numeric';
            };
            return (
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ month: string; day: string; }'... Remove this comment to see the full error message
                initialDate.toLocaleDateString('en-us', dateOptions) 
                + ', ' + 
                formatTime(
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ hour12: boolean; hour: string;... Remove this comment to see the full error message
                    initialDate.toLocaleTimeString('en-us', timeOptions)
                )
            );
        };
    } catch (err) {
        console.log(err)
        console.log(givenDate)
    }
};

function NoteForDisplay({...note}): null | { title: string, dueDate: string, priority: string } {
    // console.log("NoteContentFormatting formatNoteFieldsForDisplay");
    /**
     * @param note <Object>
     * Formats each individual field given that is relevant to a note
     * -- @requires title <String>
     * -- @requires date <Number> <String>
     * -- @requires priority <Number>
     * 
     * @returns Note <Object>
     */
    try {
        if (!!note.title && !!note.date_due && note.priority !== undefined) {
            const formattedNote = {
                title: titleAsDisplayText(note.title),
                dueDate: dateAsDisplayText(note.date_due),
                priority: priorityAsDisplayText(note.priority)
            };
            return formattedNote;
        } else {
            // console.log(note)
            return null;
        }
    } catch (err) {
        console.log(err)
        return null;
    }
}
function NoteForStorage({...note}): object {
    // if (!note._uid && !!userId) {
    //     note._uid = userId;
    // };
    if (!note._nid) {
        note._nid = utils.randomStr();
    };
    if (typeof note.date_due == 'string') {
        note.date_due = (
            Date.parse(new Date(note.date_due).toUTCString())
        );
    };
    if (typeof note.priority == 'string') {
        note.priority = parseInt(note.priority);
    };
    return { ...note };
}

/**
 * All formatting should be happening on the backend unless absolutely necessary
 * - Parsing JSON o frontend is expensive
 */
export {
    NoteForDisplay,
    NoteForStorage
}