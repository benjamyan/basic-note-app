import * as React from 'react';

// import * as utils from '../utils';
import { InitialContentProps } from '../';
// import { GlobalStyles } from '../config/GlobalStyles';
// import { changeTheme } from '../services';
import { Navigation } from '../features';
import { 
	ClientProvider,
	NotesContextProvider,
	// useClientContext
} from '../providers';
import {
    AppWrapper,
    MainContainer
} from'./__appStyles';
// import Modal from './junctions/Modal';
import TodoList from './junctions/TodoList';

// const refreshUserAccount = async ({ setUser })=> {
// 	try {
// 		// const currentUser = await ActionsHandler.getCurrentUser();
// 		const currentUser = {};
// 		if (typeof currentUser !== 'object') {
// 			throw utils.err('An unknown error occured while validating user.');
// 		};
// 		setUser(currentUser);
// 	} catch (err) {
// 		console.log(err);
// 		setUser({});
// 	};
// };
// const changeThemeAction = (appTheme, setAppTheme)=> {
// 	let newTheme = 'dark';
// 	if (!!appTheme) {
// 		switch (appTheme) {
// 			case 'dark':
// 				newTheme = 'light';
// 				break;
// 			default:
// 				newTheme = 'dark';
// 		};
// 	};
// 	setAppTheme(newTheme);
// 	changeTheme(newTheme);
// };

export default function App(appProps: InitialContentProps) {
	// const { client, updateClient } = useClientContext();

	// const [theme, setTheme] = React.useState<InitialContentProps['theme']>(appProps.theme);
	// const [user, setUser] = React.useState(appProps.user);
	// const [modal, setModal] = React.useState<string>('');

	// React.useEffect( ()=>{
	// 	if (!!user.refresh) {
	// 		(async function() {
	// 			await refreshUserAccount({ setUser })
	// 		})();
	// 	};
	// }, [ user ]);

	return (
		<>
			{/* <GlobalStyles theme={ client.theme } /> */}
			<ClientProvider>
				<AppWrapper>
					{/* <Modal 
						modal={ modal } 
						setUser={ setUser } 
						setModal={ setModal } 
					/> */}
					<Navigation.Header 
						// changeTheme={ changeThemeAction.bind(null, theme, setTheme) } 
						// hasUser={ Object.keys(user).length > 0 }
						// setModal={ setModal }
						// setUser={ setUser }
					/>
					<MainContainer>
						<NotesContextProvider>
							<TodoList />
							<Navigation.Client />
						</NotesContextProvider>
					</MainContainer>
				</AppWrapper>
			</ClientProvider>
		</>
	);
}
