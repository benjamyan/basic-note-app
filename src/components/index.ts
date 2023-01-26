/** Buttons */
import * as SimpleButton from './Buttons/SimpleButton';
/** Notes */
import EditNoteItem from './Notes/EditNoteView';
import StdNoteView from './Notes/StdNoteView';
/** Messages */
import NoActiveNotes from './Messages/NoActiveNotes';
/** Forms Fields */
import DatePicker from './Fields/DatePicker';
import EmailField from './Fields/EmailInput';
import PasswordField from './Fields/PasswordInput';
import PrioritySelection from './Fields/PrioritySelection';

export {
    SimpleButton
}
export const Note = {
    Standard: StdNoteView,
    Edit: EditNoteItem
}
export const Messages = {
    NoActiveNotes
}
export const Fields = {
    DatePicker,
    Email: EmailField,
    Password: PasswordField,
    Priority: PrioritySelection
}
