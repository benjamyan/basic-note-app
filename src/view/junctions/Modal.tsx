import React from 'react';
import { Modals } from '../../features';
import { SimpleButton } from '../../components';
import { ActionModal } from '../__appStyles';

const Modal = ({modal, setModal, setUser})=> {
    // console.log("- Modal")
	return (
		<ActionModal isActive={modal.length > 0 ? true : false}>
			<SimpleButton.Close 
				btnText={'x'}
				btnStyle={'naked'}
				btnOnClick={ setModal.bind(null, '') }
			/>
			{ modal === 'AUTH' && 
				<Modals.Auth
					setModal={setModal} 
					setUser={setUser} 
				/> 
			}
			{ modal === 'ACCOUNT' && 
				<>account edit area</>
			}
		</ActionModal>
	);
}
export default React.memo(Modal);
