import React from 'react';
import { GlobalStyles } from '../../config/GlobalStyles';
import { useClientContext } from '../../providers';
// import ActionsHandler from '../../../process/ActionsHandler';
import {
	InfoBanner,
    StyledHeader,
    HeaderNav,
    ChangeThemeButton
} from './__navigationStyles';

interface HeaderNavigationProps {
	// hasUser: boolean,
	// changeTheme: Function,
	// setUser: Function,
	// setModal: Function
}

// const StdUserNavigation = ({ setModal, setUser }: Pick<HeaderNavigationProps, 'setModal' | 'setUser'>)=> {
// 	// const editAccount = setModal.bind(null, 'ACCOUNT');
// 	const logoutCurrentUser = async ()=> {
// 		// await ActionsHandler.logoutCurrentUser();
// 		setUser({})
// 	}
// 	return (
// 		<>
// 			{/* <p onClick={ editAccount }>My account</p> */}
// 			<p onClick={ logoutCurrentUser }>Logout</p>
// 		</>
// 	)
// };
// const AnonymousUserNavigation = ({ setModal }: Pick<HeaderNavigationProps, 'setModal'>)=> {
// 	const initAuth = setModal.bind(null, 'AUTH');
// 	return (
// 		<p onClick={ initAuth }>Login/Register</p>
// 	)
// };

const HeaderNavigation = (props: HeaderNavigationProps)=> {
	const { client, updateClient } = useClientContext();

	return (
		<>
			<GlobalStyles theme={ client.theme.toLowerCase() as any } />
			<StyledHeader>
				<InfoBanner>
					<p>Another React Todo app...</p>
				</InfoBanner>
				<HeaderNav>
					{/* { hasUser 
						? <StdUserNavigation
							setModal={setModal} 
							setUser={setUser}
						/>
						: <AnonymousUserNavigation setModal={setModal} />
					} */}
				</HeaderNav>
				<ChangeThemeButton 
					btnOnClick={()=>{
						updateClient(
							'theme', 
							client.theme !== 'DARK' ? 'DARK' : 'LIGHT'
						);
					}}
					btnText={'Swap theme'}
				/>
			</StyledHeader>
		</>
	);
};
export default React.memo(HeaderNavigation)
