/** Lists */
import {
    HistoryNoteList,
    MainNoteList
} from './Lists/ListContainers';
import SingleListItem from './Lists/SingleListItem';
/** Forms */
import AuthenticationForm from './Forms/Authentication';
/** Modals */
import Settings from './Modals/AccountSettings';
import Auth from './Modals/UserAuthentication';
/** Navigation */
import HeaderNavigation from './Navigation/HeaderNavigation';
import NoteActions from './Navigation/NoteActions';
import ClientActions from './Navigation/ClientActions';


export const Navigation = {
    Header: HeaderNavigation,
    Note: NoteActions,
    Client: ClientActions
}
export const Modals = {
    Settings, 
    Auth
}
export const Lists = {
    Main: MainNoteList,
    History: HistoryNoteList,
    SingleListItem
}
export const Forms = {
    Auth: AuthenticationForm
}
